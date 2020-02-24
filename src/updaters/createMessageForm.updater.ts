import createMessageFormStore from '../stores/createMessageForm.store'
import { addMessage } from './messages.updater'

const { current, update } = createMessageFormStore

export const createMessage = async (message: string) => {
  update({ isPending: true })
  await addMessage(message)
  update({ isPending: false })
}

export const validateInput = () => {
  const { input } = current()

  if (input.length < 10) {
    update({
      isValid: false,
      validationError: 'Message must be at least 10 characters long.',
    })
    return
  }

  if (input.length > 80) {
    update({
      isValid: false,
      validationError: 'Message must not be longer than 80 characters.',
    })
    return
  }

  update({
    isValid: true,
    validationError: '',
  })
}

export const setInput = (input: string) => {
  update({ input })
  validateInput()
}
