import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import config from '../firebase.config'

export const app = firebase.initializeApp(config)
export const db = firebase.firestore()
export const auth = firebase.auth()
export const signIn = (): void => {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('profile')
  provider.addScope('email')
  firebase.auth().signInWithRedirect(provider)
}
