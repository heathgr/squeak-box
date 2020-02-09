import * as firebase from 'firebase/app'
import { auth } from '../services'
import authStore, { UserValue } from '../stores/auth.store'

export const updateUser = (userValue: UserValue, isPending = false) => {
  const currentState = authStore.current()

  authStore.update({
    ...currentState,
    user: {
      value: userValue,
      isPending,
    },
  })
}

export const handleOnAuthStateChanged = (user: UserValue): void => {
  // authStore.update({ user })
  updateUser(user, false)
}

export const listenForAuthStateChanges = (): void => {
  auth.onAuthStateChanged(handleOnAuthStateChanged)
}

export const signIn = (): void => {
  const provider = new firebase.auth.GoogleAuthProvider()

  provider.addScope('profile')
  provider.addScope('email')
  auth.signInWithRedirect(provider)
}
