import { createElement as e, FC, useState } from 'react'
import { createMessage } from '../updaters/messages.updater'

const NewMessage: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const handleMessageCreation = (): void => {
    createMessage(inputValue)
  }

  return e(
    'div',
    null,
    e(
      'input',
      {
        'data-test-id': 'message-input',
        onChange: (evt) => {
          setInputValue(evt.target.value.substring(0, 80))
        },
        onKeyDown: (evt) => {
          if (evt.key === 'Enter') handleMessageCreation()
        },
        type: 'text',
        value: inputValue,
      },
      null,
    ),
    e(
      'button',
      {
        'data-test-id': 'submit-button',
        onClick: handleMessageCreation,
      },
      'Send',
    ),
  )
}

export default NewMessage
