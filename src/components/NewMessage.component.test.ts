import { mount } from 'enzyme'
import { createElement as e } from 'react'
import { act } from 'react-dom/test-utils'

import NewMessage from './NewMessage.component'
import * as messageUpdater from '../updaters/messages.updater'
import * as authUpdater from '../updaters/auth.updater'

describe('New Message Component', () => {
  const newCreateMessageSpy = () => jest
    .spyOn(messageUpdater, 'createMessage')
    .mockImplementation(() => Promise.resolve(undefined))
  const newCreateMessageSpyUnresolved = () => jest
    .spyOn(messageUpdater, 'createMessage')
    .mockImplementation(() => new Promise(() => {}))
  const newSignOutSpy = () => jest
    .spyOn(authUpdater, 'signOut')
    .mockImplementation(() => Promise.resolve(undefined))

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Has a text input field that limits input to 80 characters.', () => {
    const subject = mount(e(NewMessage))
    const testId = '[data-test-id="message-input"]'

    expect(subject.find(testId).exists()).toEqual(true)

    const longInput = 'This is a very long test message.  It has more than 80 characters in it.  It is not a valid message!!!'
    const expected = longInput.substring(0, 80)
    subject.find(testId).simulate('change', { target: { value: longInput } })

    expect(subject.find(testId).prop('value')).toEqual(expected)
  })

  it('Has a button that invokes createMessage when clicked.', () => {
    const subject = mount(e(NewMessage))
    const buttonTestId = '[data-test-id="submit-button"]'
    const inputTestId = '[data-test-id="message-input"]'
    const testMessage = 'This is a test message.'
    const createMessageSpy = newCreateMessageSpy()

    subject.find(inputTestId).simulate('change', { target: { value: testMessage } })
    subject.find(buttonTestId).simulate('click')

    expect(createMessageSpy).toHaveBeenCalledTimes(1)
    expect(createMessageSpy).toHaveBeenCalledWith(testMessage)
  })

  it('Has an input field that invokes createMessage when enter is pressed.', () => {
    const subject = mount(e(NewMessage))
    const inputTestId = '[data-test-id="message-input"]'
    const testMessage = 'This is a test message.'
    const createMessageSpy = newCreateMessageSpy()

    subject.find(inputTestId).simulate('change', { target: { value: testMessage } })
    subject.find(inputTestId).simulate('keyDown', { key: 'Not Enter' })
    subject.find(inputTestId).simulate('keyDown', { key: 'Enter' })

    expect(createMessageSpy).toHaveBeenCalledTimes(1)
    expect(createMessageSpy).toHaveBeenCalledWith(testMessage)
  })

  it('Disables user input when createMessage has not resolved.', () => {
    const subject = mount(e(NewMessage))
    const buttonTestId = '[data-test-id="submit-button"]'
    const inputTestId = '[data-test-id="message-input"]'
    const testMessage = 'This is a test message.'
    newCreateMessageSpyUnresolved()

    expect(subject.find(inputTestId).prop('disabled')).toEqual(false)
    expect(subject.find(buttonTestId).prop('disabled')).toEqual(true)

    subject.find(inputTestId).simulate('change', { target: { value: testMessage } })
    subject.find(inputTestId).simulate('keyDown', { key: 'Enter' })

    expect(subject.find(inputTestId).prop('disabled')).toEqual(true)
    expect(subject.find(buttonTestId).prop('disabled')).toEqual(true)
  })

  it('Enables user input when createMessage has resolved', () => {
    const subject = mount(e(NewMessage))
    const buttonTestId = '[data-test-id="submit-button"]'
    const inputTestId = '[data-test-id="message-input"]'
    const testMessage = 'This is a test message.'
    newCreateMessageSpy()

    expect(subject.find(inputTestId).prop('disabled')).toEqual(false)
    expect(subject.find(buttonTestId).prop('disabled')).toEqual(true)

    act(() => {
      subject.find(inputTestId).simulate('change', { target: { value: testMessage } })
      subject.find(inputTestId).simulate('keyDown', { key: 'Enter' })
    })

    expect(subject.find(inputTestId).prop('disabled')).toEqual(false)
    expect(subject.find(buttonTestId).prop('disabled')).toEqual(true)
  })

  it('Has a sign out button', async () => {
    const subject = mount(e(NewMessage))
    const buttonTestId = '[data-test-id="sign-out-button"]'
    const signOutSpy = jest.spyOn(authUpdater, 'signOut')

    subject.find(buttonTestId).simulate('click')

    await new Promise((resolve) => setTimeout(() => resolve(), 4000))
    expect(signOutSpy).toHaveBeenCalledTimes(1)
  })
})
