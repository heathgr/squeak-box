import { createStore } from 's-is-for-store'
import { firestore } from 'firebase'
import 'firebase/firestore'


export interface MessageState {
  message: string,
  createdAt: firestore.Timestamp,
}

export interface MessagesState {
  messages: MessageState[],
}

export const initialState: MessagesState = {
  messages: [],
}

const messagesStore = createStore(initialState)

export default messagesStore
