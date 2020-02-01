import { createElement as e, FC } from 'react'
import { Message as MessageData } from '../stores/messages.store'

const Message: FC<MessageData> = (props) => e('div', null, props.text)

export default Message