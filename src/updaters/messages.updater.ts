import { firestore } from 'firebase'
import 'firebase/firestore'

const { Timestamp } = firestore

import messagesStore, { Message } from '../stores/messages.store'
import { db } from '../services'

export const messagesCollection = db.collection('messages')
export const messagesQuery = messagesCollection.orderBy('createdAt', 'desc')
export const messageQuerySnapshotHandler = (snapshot: any) => {
  const snapshotDocuments = snapshot
  const messages: Message[] = []

  snapshotDocuments.forEach((doc: any) => {
    messages.push(doc.data() as Message)
  })

  messagesStore.update({
    messages,
  })
}

export const listenForMessageUpdates = () => {
  messagesQuery.onSnapshot(messageQuerySnapshotHandler)
}

export const createMessage = (message: string) => {
  messagesCollection.add({
    message,
    createdAt: Timestamp.now(),
  })
}