import { User } from 'firebase'
import { auth } from '../firebase'
import authStore from '../stores/auth.store'

export const onAuthStateChangedHandler = (user: User | null) => {
  authStore.update({ user })
}

export const updateOnAuthChange = () => {
  auth.onAuthStateChanged(onAuthStateChangedHandler)
}
