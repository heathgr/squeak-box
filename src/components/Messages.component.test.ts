import { createElement as e } from 'react'
import { shallow } from 'enzyme'
import { firestore } from 'firebase'
import 'firebase/firestore'

const { Timestamp } = firestore

import * as useStoreHook from '@s-is-for-store/react'
import Messages from './Messages.component'
import { Message } from './Message.component'

describe('Messages Component', () => {
  it('Displays a list of messages', () => {
    const messages = [
      { message: 'test message 1', createdAt: Timestamp.now() },
      { message: 'test message 2', createdAt: Timestamp.now() },
      { message: 'test message 3', createdAt: Timestamp.now() },
    ]

    const useStoreSpy = jest.spyOn(useStoreHook, 'useStore').mockReturnValue({
      messages,
    })

    const subject = shallow(e(Messages))

    const messageWrappers = subject.find(Message)
    const messageCount = messageWrappers.length

    expect(messageCount).toEqual(messages.length)

    messages.forEach((message, i) => {
      expect(subject.find(Message).at(i).prop('message')).toEqual(message)
    })
  })
})