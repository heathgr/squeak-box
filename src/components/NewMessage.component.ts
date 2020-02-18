import {
  createElement as e,
  FC,
  Fragment,
  useState,
} from 'react'
import { createMessage } from '../updaters/messages.updater'
import { signOut } from '../updaters/auth.updater'

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
    Fragment,
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
    e(
      'button',
      {
        'data-test-id': 'sign-out-button',
        onClick: () => signOut(),
      },
      'Sign Out',
    ),
  )
}

export default NewMessage
