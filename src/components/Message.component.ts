import { createElement as e, FC } from 'react'
import { Message as MessageData } from '../stores/messages.store'

interface MessageProps {
  message: MessageData
}

export const Message: FC<MessageProps> = (props) => e('div', null, ':)')