import { User } from 'firebase/app'
import { auth } from '../services'
import authStore from '../stores/auth.store'

export const handleOnAuthStateChanged = (user: User | null): void => {
  authStore.update({ user })
}

export const listenForAuthStateChanges = (): void => {
  auth.onAuthStateChanged(handleOnAuthStateChanged)
}
