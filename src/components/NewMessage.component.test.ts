import { mount } from 'enzyme'
import { createElement as e } from 'react'
import NewMessage from './NewMessage.component'
import createMessageFormStore, { initialState } from '../stores/createMessageForm.store'
import createTestStateUpdate from '../testHelpers/createTestUpdate'
import * as createMessageFormUpdater from '../updaters/createMessageForm.updater'
import * as authUpdater from '../updaters/auth.updater'

describe('New Message Component', () => {
  let subject = mount(e('div'))
  let updateState = createTestStateUpdate(createMessageFormStore, subject)

  beforeEach(() => {
    createMessageFormStore.update(initialState)
    subject = mount(e(NewMessage))
    updateState = createTestStateUpdate(createMessageFormStore, subject)
  })

  afterEach(() => {
    subject.unmount()
    jest.resetAllMocks()
  })

  const messageInputSelector = '[data-test-id="message-input"]'
  const submitButtonSelector = '[data-test-id="submit-button"]'
  const signOutButtonSelector = '[data-test-id="sign-out-button"]'
  const validationErrorMessageSelector = '[data-test-id="validation-error-message"]'
  const useCreateMessageSpy = () => jest
    .spyOn(createMessageFormUpdater, 'createMessage')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .mockImplementation((message: string) => Promise.resolve(undefined))
  const useSignOutSpy = () => jest
    .spyOn(authUpdater, 'signOut')
    .mockImplementation(() => undefined)

  it('Has a text input field with a value that is determied by the input state value.', () => {
    const expected = 'This is a test message!!'

    updateState({ input: expected })

    expect(subject.find(messageInputSelector).exists()).toBe(true)
    expect(subject.find(messageInputSelector).prop('value')).toBe(expected)
  })

  it('Updates the input state when the user inputs new message text.', () => {
    const expected = 'Mochi is delicious.'

    subject.find(messageInputSelector).simulate('change', { target: { value: expected } })

    expect(createMessageFormStore.current().input).toEqual(expected)
  })

  it('Invokes the createMessage updater function when enter is pressed and the message input is focused', () => {
    const createMessageSpy = useCreateMessageSpy()
    const testInput = 'Waffles are great with sryup.'

    subject.find(messageInputSelector).simulate('change', { target: { value: testInput } })
    subject.find(messageInputSelector).simulate('keyDown', { key: 'Enter' })
    expect(createMessageSpy).toHaveBeenCalledTimes(1)
    expect(createMessageSpy).toHaveBeenCalledWith(testInput)
  })

  it('Does not inoke the createMessage updater function if enter is not pressed and the message input is focused', () => {
    const createMessageSpy = useCreateMessageSpy()

    subject.find(messageInputSelector).simulate('change', { target: { value: 'Just some random text.' } })
    subject.find(messageInputSelector).simulate('keyDown', { key: 'LeftArrow' })
    expect(createMessageSpy).toHaveBeenCalledTimes(0)
  })

  it('Does not invoke the createMessage updater if the input state value is invalid.', () => {
    const createMessageSpy = useCreateMessageSpy()

    subject.find(messageInputSelector).simulate('change', { target: { value: 'tooshort' } })
    subject.find(messageInputSelector).simulate('keyDown', { key: 'Enter' })
    expect(createMessageSpy).toHaveBeenCalledTimes(0)
  })

  it('Has a submit button that invokes the createMessage updater function when clicked.', () => {
    const createMessageSpy = useCreateMessageSpy()
    const testInput = 'Avenue 5 is a funny show'

    subject.find(messageInputSelector).simulate('change', { target: { value: testInput } })
    subject.find(submitButtonSelector).simulate('click')
    expect(createMessageSpy).toHaveBeenCalledTimes(1)
    expect(createMessageSpy).toHaveBeenCalledWith(testInput)
  })

  it('It disables the submit button if the input state value is not valid.', () => {
    updateState({ input: '', isValid: false })

    expect(subject.find(submitButtonSelector).prop('disabled')).toBe(true)
  })

  it('Enables or disables the text input and submit button based on the isPending state value.', () => {
    updateState({ isPending: true, isValid: true })

    expect(subject.find(messageInputSelector).prop('disabled')).toEqual(true)
    expect(subject.find(submitButtonSelector).prop('disabled')).toEqual(true)

    updateState({ isPending: false, isValid: true })

    expect(subject.find(messageInputSelector).prop('disabled')).toEqual(false)
    expect(subject.find(submitButtonSelector).prop('disabled')).toEqual(false)
  })

  it('Has a sign out button that invokes the signOut updater function when clicked.', () => {
    const signOutSpy = useSignOutSpy()

    subject.find(signOutButtonSelector).simulate('click')

    expect(signOutSpy).toHaveBeenCalledTimes(1)
  })

  it('Displays a validation error message if the input is invalid.', () => {
    const validationError = 'Oooops something is wrong!!'

    updateState({
      isValid: false,
      input: '',
      validationError,
    })

    expect(subject.find(validationErrorMessageSelector).text()).toBe(validationError)
  })

  it('Does not display a validation error message if the input is valid.', () => {
    const validationError = 'Oooops something is wrong!!'

    updateState({
      isValid: true,
      input: '',
      validationError,
    })

    expect(subject.find(validationErrorMessageSelector).exists()).toBe(false)
  })
})
