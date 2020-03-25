import { createElement as e, FC } from 'react'
import { MessageState } from '../stores/messages.store'

const Message: FC<MessageState> = (props) => e(
  'div',
  {
    'data-test-id': 'message',
  },
  props.message,
)

export default Message
