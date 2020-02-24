import * as createMessageFormUpdater from './createMessageForm.updater'
import createMessageFormStore, { initialState } from '../stores/createMessageForm.store'
import * as messagesUpdater from './messages.updater'
import resolveOnNextLoop from '../testHelpers/resolveOnNextLoop'

const { current, update } = createMessageFormStore

describe('Create Message Form Updater', () => {
  jest.useFakeTimers()

  beforeEach(() => {
    update(initialState)
  })

  it('It updates the form input', () => {
    const expected = 'This is the new message!!!'

    createMessageFormUpdater.setInput(expected)

    expect(current().input).toEqual(expected)
  })

  it('Validates form input when setInput is invoked', () => {
    const validateInputSpy = jest.spyOn(createMessageFormUpdater, 'validateInput')

    createMessageFormUpdater.setInput('This text shold be validated')

    expect(validateInputSpy).toHaveBeenCalledTimes(1)
  })

  it('Invalidates inputs that are too short.', () => {
    update({
      input: 'tooshort',
    })

    createMessageFormUpdater.validateInput()

    expect(current()).toEqual({
      input: 'tooshort',
      isPending: false,
      isValid: false,
      validationError: 'Message must be at least 10 characters long.',
    })
  })

  it('Invalidates inputs that are too long.', () => {
    update({
      input: 'This message is going to be very long.  So long that it will be invalid.  Because this app does not like very very very very long messages.',
    })

    createMessageFormUpdater.validateInput()

    expect(current()).toEqual({
      input: 'This message is going to be very long.  So long that it will be invalid.  Because this app does not like very very very very long messages.',
      isPending: false,
      isValid: false,
      validationError: 'Message must not be longer than 80 characters.',
    })
  })

  it('Validates inputs that are the correct length.', () => {
    update({
      input: 'This message is going to be a valid length.',
    })

    createMessageFormUpdater.validateInput()

    expect(current()).toEqual({
      input: 'This message is going to be a valid length.',
      isPending: false,
      isValid: true,
      validationError: '',
    })
  })

  it('Sets isPending based off of the status of adding a message to the database.', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const testImplementation = (message: string): Promise<undefined> => new Promise((resolve) => {
      setTimeout(() => resolve(undefined), 100)
    })
    const addMessageSpy = jest
      .spyOn(messagesUpdater, 'addMessage')
      .mockImplementation(testImplementation)
    const testMessage = 'Just a test message.'

    createMessageFormUpdater.createMessage(testMessage)

    expect(current().isPending).toBe(true)
    expect(addMessageSpy).toHaveBeenCalledTimes(1)
    expect(addMessageSpy).toHaveBeenCalledWith(testMessage)

    jest.advanceTimersByTime(200)
    await resolveOnNextLoop()

    expect(current().isPending).toBe(false)
  })
})
