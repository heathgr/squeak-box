import { firestore } from 'firebase'
import 'firebase/firestore'

import messagesStore, { Message } from '../stores/messages.store'
import { db } from '../services'

const { Timestamp } = firestore

export const messagesCollection = db.collection('messages')
export const messagesQuery = messagesCollection.orderBy('createdAt', 'desc')
export const messageQuerySnapshotHandler = (snapshot: any): void => {
  const snapshotDocuments = snapshot
  const messages: Message[] = []

  snapshotDocuments.forEach((doc: any) => {
    messages.push(doc.data() as Message)
  })

  messagesStore.update({
    messages,
  })
}

export const listenForMessageUpdates = (): void => {
  messagesQuery.onSnapshot(messageQuerySnapshotHandler)
}

export const createMessage = (message: string): void => {
  messagesCollection.add({
    message,
    createdAt: Timestamp.now(),
  })
}
