import { User } from 'firebase'
import { auth } from '../services'
import authStore from '../stores/auth.store'

export const handleOnAuthStateChanged = (user: User | null) => {
  authStore.update({ user })
}

export const listenForAuthStateChanges = () => {
  auth.onAuthStateChanged(handleOnAuthStateChanged)
}
