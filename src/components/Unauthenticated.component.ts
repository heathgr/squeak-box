import { createElement as e } from 'react'
import { signIn } from '../services'

export const Unauthenticated = () => {
  return e(
    'div',
    null,
    e(
      'button',
      {
        ['data-test-id']: 'sign-in-button',
        onClick: signIn,
      },
      'Sign In',
    )
  )
}