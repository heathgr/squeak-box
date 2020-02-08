import * as firebase from 'firebase/app'
import { auth } from '../services'
import authStore from '../stores/auth.store'

export const handleOnAuthStateChanged = (user: firebase.User | null): void => {
  authStore.update({ user })
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
