import { createElement as e, FC } from 'react'
import { useStore } from '@s-is-for-store/react'
import { createUseStyles } from 'react-jss'

import messagesStore from '../stores/messages.store'
import Message from './Message.component'
import { flexGrow } from '../styles/common'

const useMessageListStyles = createUseStyles({
  container: {
    ...flexGrow(),
  },
})

const MessageList: FC = () => {
  const store = useStore(messagesStore)
  const { messages } = store
  const messageListStyles = useMessageListStyles()

  return e(
    'div',
    {
      className: messageListStyles.container,
    },
    messages.map((message) => e(Message, { ...message, key: message.id })),
  )
}

export default MessageList
