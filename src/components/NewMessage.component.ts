import { createElement as e, FC, useState } from 'react'
import { createMessage } from '../updaters/messages.updater'

const NewMessage: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const handleMessageCreation = async () => {
    setIsDisabled(true)
    if (inputValue.length < 1) {
      return
    }
    await createMessage(inputValue)
    setInputValue('')
    setIsDisabled(false)
  }

  return e(
    'div',
    null,
    e(
      'input',
      {
        'data-test-id': 'message-input',
        disabled: isDisabled,
        type: 'text',
        value: inputValue,
        onChange: (evt) => {
          setInputValue(evt.target.value.substring(0, 80))
        },
        onKeyDown: (evt) => {
          if (evt.key === 'Enter') handleMessageCreation()
        },
      },
      null,
    ),
    e(
      'button',
      {
        'data-test-id': 'submit-button',
        disabled: inputValue.length < 1 || isDisabled,
        onClick: handleMessageCreation,
      },
      'Send',
    ),
  )
}

export default NewMessage
