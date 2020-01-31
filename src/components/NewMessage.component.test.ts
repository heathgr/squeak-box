import { shallow } from 'enzyme'
import { createElement as e } from 'react'

import { NewMessage } from './NewMessage.component'

describe('New Message Component', () => {
  it('Has a text input field that limits input to 80 characters.', () => {
    const subject = shallow(e(NewMessage))
    const testId = '[data-test-id="message-input"]'
    const textInput = subject.find(testId)

    expect(textInput.exists()).toEqual(true)

    const testValue = 'Just a test'
    textInput.simulate('change', {target: { value: testValue}})

    subject.update()
    expect(subject.find(testId).prop('value')).toEqual(testValue)
  })
})