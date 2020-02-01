import { createElement as e } from 'react'
import { shallow } from 'enzyme'
import { firestore } from 'firebase'
import 'firebase/firestore'

import Message from './Message.component'
import { Message as MessageData } from '../stores/messages.store'

const { Timestamp } = firestore

describe('Message', () => {
  it('Renders the message text.', () => {
    const testMessage: MessageData = {
      text: 'I like messages',
      createdAt: Timestamp.now(),
    }
    const subject = shallow(e(Message, { ...testMessage }))

    expect(subject.text()).toEqual(testMessage.text)
  })
})
