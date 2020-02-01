import { createElement as e, FC } from 'react'
import { signIn } from '../services'

const Unauthenticated: FC = () => e(
  'div',
  null,
  e(
    'button',
    {
      'data-test-id': 'sign-in-button',
      onClick: signIn,
    },
    'Sign In',
  ),
)

export default Unauthenticated
