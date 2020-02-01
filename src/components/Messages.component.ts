import { createElement as e, FC } from 'react'
import { useStore } from '@s-is-for-store/react'

import messagesStore, { Message as MessageData } from '../stores/messages.store'
import { Message } from './Message.component'

interface MessageProps {
  messages: MessageData[]
}

const Messages: FC<MessageProps> = (props) => {
  const store = useStore(messagesStore)
  const { messages } = store

  return e(
    'div',
    null,
    messages.map((message, i) => e(Message, { message, key: i})),
  )
}

export default Messages