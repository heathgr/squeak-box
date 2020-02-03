import { createStore } from 's-is-for-store'
import { firestore } from 'firebase/app'
import 'firebase/firestore'


export interface MessageDocument {
  message: string,
  createdAt: firestore.Timestamp,
}

export interface MessageState extends MessageDocument {
  id: string,
}

export interface MessagesState {
  messages: MessageState[],
}

export const initialState: MessagesState = {
  messages: [],
}

const messagesStore = createStore(initialState)

export default messagesStore
