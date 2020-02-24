import * as firebase from 'firebase/app'
import 'firebase/firestore'

import messagesStore, { MessageDocument, MessageState } from '../stores/messages.store'
import { db } from '../services'

const { firestore } = firebase
const { Timestamp } = firestore

type MessagesCollection = firebase.firestore.CollectionReference<MessageDocument>
type MessagesSnapshot = firebase.firestore.QuerySnapshot<MessageDocument>
export type AddMessagePromise = Promise<firebase.firestore.DocumentReference<MessageDocument>>

export const messagesCollection = db.collection('messages') as MessagesCollection
export const messagesQuery = messagesCollection.orderBy('createdAt', 'desc')
export const messageQuerySnapshotHandler = (snapshot: MessagesSnapshot) => {
  const messages: MessageState[] = []

  snapshot.forEach((doc) => {
    messages.push({
      ...doc.data(),
      id: doc.id,
    })
  })

  messagesStore.update({
    messages,
  })
}

export const listenForMessageUpdates = () => {
  messagesQuery.onSnapshot(messageQuerySnapshotHandler)
}

export const addMessage = (message: string) => messagesCollection.add({
  message,
  createdAt: Timestamp.now(),
}).then(() => undefined)
