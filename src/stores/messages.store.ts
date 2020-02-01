import { createStore } from 's-is-for-store'
import { firestore } from 'firebase'
import 'firebase/firestore'


export interface Message {
  text: string,
  createdAt: firestore.Timestamp,
}

export interface Messages {
  messages: Message[],
}

export const initialState: Messages = {
  messages: [],
}

const messagesStore = createStore(initialState)

export default messagesStore
