import * as firebase from 'firebase/app'

import { listenForAuthStateChanges, handleOnAuthStateChanged, signIn } from './auth.updater'
import authStore from '../stores/auth.store'
import { auth } from '../services'

describe('Auth Updater', () => {
  it('Subscribes to the onAuthStateChanged observable.', () => {
    const authStateChangedSpy = jest.spyOn(auth, 'onAuthStateChanged')

    listenForAuthStateChanges()

    expect(authStateChangedSpy).toHaveBeenCalledWith(handleOnAuthStateChanged)
  })

  it('Updates the auth store based on onAuthStateChanged events.', () => {
    const updateSpy = jest.spyOn(authStore, 'update')
    const testUser = {} as firebase.User

    handleOnAuthStateChanged(null)

    expect(updateSpy).toHaveBeenCalledWith({ user: null })

    handleOnAuthStateChanged(testUser)

    expect(updateSpy).toHaveBeenCalledWith({ user: testUser })
  })

  it('Triggers a sign in redirect when signIn is invoked.', () => {
    const signInSpy = jest
      .spyOn(auth, 'signInWithRedirect')
      .mockImplementation((provider: firebase.auth.AuthProvider) => {
        if (!provider) {
          throw new Error('Something is wrong.')
        }

        return Promise.resolve(undefined)
      })

    const provider = new firebase.auth.GoogleAuthProvider()

    provider.addScope('profile')
    provider.addScope('email')

    signIn()

    expect(signInSpy).toHaveBeenCalledTimes(1)
    expect(signInSpy).toHaveBeenCalledWith(provider)
  })
})
