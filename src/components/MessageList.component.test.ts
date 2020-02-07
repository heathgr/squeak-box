import { createElement as e } from 'react'
import { shallow } from 'enzyme'
import { firestore } from 'firebase/app'
import 'firebase/firestore'
import * as useStoreHook from '@s-is-for-store/react'

import MessageList from './MessageList.component'
import Message from './Message.component'
import { MessageState } from '../stores/messages.store'

const { Timestamp } = firestore

describe('Messages Component', () => {
  it('Displays a list of messages', () => {
    const messages: MessageState[] = [
      { id: '1', message: 'test message 1', createdAt: Timestamp.now() },
      { id: '2', message: 'test message 2', createdAt: Timestamp.now() },
      { id: '3', message: 'test message 3', createdAt: Timestamp.now() },
    ]

    jest.spyOn(useStoreHook, 'useStore').mockReturnValue({
      messages,
    })

    const subject = shallow(e(MessageList))

    const messageWrappers = subject.find(Message)
    const messageCount = messageWrappers.length

    expect(messageCount).toEqual(messages.length)

    messages.forEach((message, i) => {
      expect(subject.find(Message).at(i).prop('message')).toEqual(message.message)
      expect(subject.find(Message).at(i).prop('createdAt')).toEqual(message.createdAt)
    })
  })
})
