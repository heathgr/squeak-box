import { createStore } from 's-is-for-store'
import { Timestamp } from '@google-cloud/firestore'

export interface Message {
  text: string,
  createdAt: Timestamp,
}

export interface Messages {
  messages: Message[]
}

export const initialState: Messages = {
  messages: [],
}

const messagesStore = createStore(initialState)

export default messagesStore