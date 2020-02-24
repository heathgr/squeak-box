import {
  createElement as e,
  FC,
  Fragment,
} from 'react'
import { useStore } from '@s-is-for-store/react'

import { signOut } from '../updaters/auth.updater'
import { createMessage, setInput } from '../updaters/createMessageForm.updater'
import createMessageFormStore from '../stores/createMessageForm.store'

const NewMessage: FC = () => {
  const store = useStore(createMessageFormStore)
  const {
    input,
    isPending,
    isValid,
    validationError,
  } = store
  const onSubmit = () => {
    if (isValid) createMessage(input)
  }

  return e(
    Fragment,
    null,
    e(
      'input',
      {
        'data-test-id': 'message-input',
        disabled: isPending,
        type: 'text',
        value: input,
        onChange: (evt) => {
          setInput(evt.target.value)
        },
        onKeyDown: (evt) => {
          if (evt.key === 'Enter') onSubmit()
        },
      },
      null,
    ),
    e(
      'button',
      {
        'data-test-id': 'submit-button',
        disabled: isPending || !isValid,
        onClick: onSubmit,
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
    !isValid && e(
      'p',
      {
        'data-test-id': 'validation-error-message',
      },
      validationError,
    ),
  )
}

export default NewMessage
