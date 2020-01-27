import { createElement as e } from 'react'
import { useStore } from '@s-is-for-store/react'

import authStore from '../stores/auth.store'

import { Unauthenticated } from './Unauthenticated.component'
import { NewMessage } from './NewMessage.component'

export const Footer = () => {
  const authState = useStore(authStore)

  return authState.user ? e(NewMessage) : e(Unauthenticated)
}
