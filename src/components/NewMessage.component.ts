import { createElement as e, useState } from 'react'
import { createMessage } from '../updaters/messages.updater'

export const NewMessage = () => {
  const [inputValue, setInputValue] = useState('')

  return e(
    'div',
    null,
    e(
      'input',
      {
        ['data-test-id']: 'message-input',
        onChange: (evt) => {
          setInputValue(evt.target.value.substring(0, 80))
        },
        type: 'text',
        value: inputValue,
      },
      null,
    ),
    e(
      'button',
      {
        onClick: () => {
          createMessage(inputValue)
        }
      },
      'Send'
    )
  )
}