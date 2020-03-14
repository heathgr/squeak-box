/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
import * as admin from 'firebase-admin'
import { join } from 'path'

interface Document {
  [key: string]: string | number | boolean | Date,
}

// TODO make this configurable
const config = { databaseURL: 'https://squeakbox-development.firebaseio.com' }
const cert = admin.credential.cert(join(__dirname, '../serviceAccount.json'))

admin.initializeApp({
  credential: cert,
  databaseURL: config.databaseURL,
})

const db = admin.firestore()
const auth = admin.auth()

export const getDocument = (path: string) => {
  console.log('Retrieving document: ', path)
  return db.doc(path).get()
}

export const setDocument = (path: string, document: Document) => {
  console.log('Setting document: ', path)
  return db.doc(path).set(document)
}

export const deleteDocumentPath = (path: string) => {
  console.log('Delete document at path: ', path)
  return deleteDocument(db.doc(path))
}

export const getDocuments = (path: string) => {
  console.log('Listing all documents contained in the collectioin: ', path)
  return db.collection(path).listDocuments()
}

export const addDocument = (path: string, document: Document) => {
  console.log('Adding document to collection: ', path)
  return db.collection(path).add(document)
}

export const deleteCollectionPath = (path: string) => {
  console.log('Deleting collection: ', path)
  return deleteCollection(db.collection(path))
}

export const deleteCollection = async (collection: admin.firestore.CollectionReference) => {
  console.log('Deleting collection: ', collection.path)
  const documents = await collection.listDocuments()

  await Promise.all(documents.map((document) => deleteDocument(document)))

  await collection
}

export const deleteDocument = async (document: admin.firestore.DocumentReference) => {
  console.log('Deleting document: ', document.path)
  const subCollections = await document.listCollections()

  await Promise.all(subCollections.map((collection) => deleteCollection(collection)))

  await document.delete()
}

export const deleteAll = async () => {
  const rootCollections = await db.listCollections()

  console.log('Clearing the database.  Deleting all documents and collections.')
  await Promise.all(rootCollections.map((collection) => deleteCollection(collection)))
  console.log('The database is empty.')
}

export const mintToken = async (id: string) => {
  console.log('Minting token for: ', id)
  return auth.createCustomToken(id)
}
