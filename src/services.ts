import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  databaseURL: env.FIRESTORE_URL,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_ID,
  appId: env.FIREBASE_APP_ID,
}

export const app = firebase.initializeApp(config)
export const db = firebase.firestore()
export const auth = firebase.auth()
