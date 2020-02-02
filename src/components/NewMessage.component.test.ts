import { mount } from 'enzyme'
import { createElement as e } from 'react'

import NewMessage from './NewMessage.component'
import * as messageUpdater from '../updaters/messages.updater'

describe('New Message Component', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Has a text input field that limits input to 80 characters.', () => {
    const subject = mount(e(NewMessage))
    const testId = '[data-test-id="message-input"]'
    const textInput = subject.find(testId)

    expect(textInput.exists()).toEqual(true)

    const longInput = 'This is a very long test message.  It has more than 80 characters in it.  It is not a valid message!!!'
    const expected = longInput.substring(0, 80)
    textInput.simulate('change', { target: { value: longInput } })

    expect(subject.find(testId).prop('value')).toEqual(expected)
  })

  it('Has a button that invokes createMessage when clicked.', () => {
    const subject = mount(e(NewMessage))
    const buttonTestId = '[data-test-id="submit-button"]'
    const inputTestId = '[data-test-id="message-input"]'
    const textInput = subject.find(inputTestId)
    const submitButton = subject.find(buttonTestId)
    const createMessageSpy = jest
      .spyOn(messageUpdater, 'createMessage')
      .mockImplementation((): void => undefined)
    const testMessage = 'This is a test message.'

    textInput.simulate('change', { target: { value: testMessage } })
    submitButton.simulate('click')

    expect(createMessageSpy).toHaveBeenCalledTimes(1)
    expect(createMessageSpy).toHaveBeenCalledWith(testMessage)
  })

  it('Has an input field that invokes createMessage when enter is pressed.', () => {
    const subject = mount(e(NewMessage))
    const inputTestId = '[data-test-id="message-input"]'
    const textInput = subject.find(inputTestId)
    const createMessageSpy = jest
      .spyOn(messageUpdater, 'createMessage')
      .mockImplementation((): void => undefined)
    const testMessage = 'This is a test message.'

    textInput.simulate('change', { target: { value: testMessage } })
    textInput.simulate('keyDown', { key: 'Enter' })

    expect(createMessageSpy).toHaveBeenCalledTimes(1)
    expect(createMessageSpy).toHaveBeenCalledWith(testMessage)
  })
})
