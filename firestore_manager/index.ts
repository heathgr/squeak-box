/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import bodyParser from 'body-parser'
import express from 'express'
import HttpStatus from 'http-status-codes'

import dateParser from './dateParser'
import {
  addDocument,
  deleteAll,
  deleteCollectionPath,
  deleteDocumentPath,
  getDocuments,
  getDocument,
  setDocument,
  mintToken,
} from './services'
import { auth } from '../src/services'

const app = express()
const port = 5555
const extractDocumentPath = (url: string) => url.replace(/\/document/, '')
const extractCollectionPath = (url: string) => url.replace(/\/collection/, '')

app.use(bodyParser.json())
app.use(dateParser)

app.get('/document/*', async (req, res) => {
  const docPath = extractDocumentPath(req.url)

  try {
    const document = await getDocument(docPath)

    res.status(HttpStatus.OK).send(document.data())
  } catch (e) {
    console.log('Could not retrieve document: ', e)
    res.status(HttpStatus.BAD_REQUEST).send()
  }
})

app.post('/document/*', async (req, res) => {
  const docPath = extractDocumentPath(req.url)

  try {
    await setDocument(docPath, req.body)

    res.status(HttpStatus.OK).send()
  } catch (e) {
    console.log('Could not write document: ', e)
    res.status(HttpStatus.BAD_REQUEST).send()
  }
})

app.delete('/document/*', async (req, res) => {
  const docPath = extractDocumentPath(req.url)

  try {
    await deleteDocumentPath(docPath)
    res.status(HttpStatus.OK).send()
  } catch (e) {
    console.log('Could not delete document: ', e)
    res.status(HttpStatus.BAD_REQUEST).send()
  }
})

app.get('/collection/*', async (req, res) => {
  const collectionPath = extractCollectionPath(req.url)

  try {
    const documents = await getDocuments(collectionPath)
    res.status(HttpStatus.OK).send(documents.map((document) => document.id))
  } catch (e) {
    console.log('Could not retrieve documents: ', e)
    res.status(HttpStatus.BAD_REQUEST).send()
  }
})

app.post('/collection/*', async (req, res) => {
  const collectionPath = extractCollectionPath(req.url)

  try {
    const newDoc = await addDocument(collectionPath, req.body)
    res.status(HttpStatus.OK).send(newDoc.id)
  } catch (e) {
    console.log('Could not add document: ', e)
    res.status(HttpStatus.BAD_REQUEST).send()
  }
})

app.delete('/collection/*', async (req, res) => {
  const collectionPath = extractCollectionPath(req.url)

  try {
    await deleteCollectionPath(collectionPath)
    res.status(HttpStatus.OK).send()
  } catch (e) {
    console.log('Could not delete collection: ', e)
    res.status(HttpStatus.BAD_REQUEST).send()
  }
})

app.delete('/db', async (req, res) => {
  try {
    await deleteAll()
    res.status(HttpStatus.OK).send()
  } catch (e) {
    console.log('Could not delete all documents: ', e)
    res.status(HttpStatus.BAD_REQUEST).send()
  }
})

app.get('/mint-token', async (req, res) => {
  try {
    const token = await mintToken(req.body.uid)
    res.status(HttpStatus.OK).send({
      token,
    })
  } catch (e) {
    console.log('Could not mint token: ', e)
    res.status(HttpStatus.BAD_REQUEST).send()
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`))
