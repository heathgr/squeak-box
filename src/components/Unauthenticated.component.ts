import {
  createElement as e,
  FC,
  Fragment,
} from 'react'
import { signIn } from '../updaters/auth.updater'

const Unauthenticated: FC = () => e(
  Fragment,
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
