import * as firebase from 'firebase/app'
import { auth } from '../services'
import authStore, { UserValue } from '../stores/auth.store'

export const updateUser = (userValue: UserValue, isPending = false) => {
  authStore.update({
    user: {
      value: userValue,
      isPending,
    },
  })
}

export const handleOnAuthStateChanged = (user: UserValue) => {
  updateUser(user, false)
}

export const listenForAuthStateChanges = () => {
  auth.onAuthStateChanged(handleOnAuthStateChanged)
}

export const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  provider.addScope('profile')
  provider.addScope('email')
  auth.signInWithRedirect(provider)
}

export const signOut = () => {
  auth.signOut()
}
