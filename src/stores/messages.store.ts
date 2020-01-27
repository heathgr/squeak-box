import { createStore } from 's-is-for-store'

export interface Message {
  message: string
}

export interface Messages {
  messages: Message[]
}

export const initialState: Messages = {
  messages: [],
}

const messagesStore = createStore(initialState)

export default messagesStore