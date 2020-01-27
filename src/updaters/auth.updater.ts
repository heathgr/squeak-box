import { User } from 'firebase'
import { auth } from '../services'
import authStore from '../stores/auth.store'

export const onAuthStateChangedHandler = (user: User | null) => {
  console.log('auth event!!!: ', user)
  authStore.update({ user })
}

export const updateOnAuthChange = () => {
  console.log('user: ', auth.currentUser)
  auth.onAuthStateChanged(onAuthStateChangedHandler)
}
