import * as firebase from 'firebase/app'

import * as updater from './auth.updater'
import authStore, { initialState, AuthState } from '../stores/auth.store'
import { auth } from '../services'

const {
  listenForAuthStateChanges, handleOnAuthStateChanged, signIn, signOut, updateUser,
} = updater

describe('Auth Updater', () => {
  it('updates user values', () => {
    authStore.update(initialState)

    const testUser = {} as firebase.User
    const isPending = false

    updateUser(testUser, false)

    const expected: AuthState = {
      ...initialState,
      user: {
        value: testUser,
        isPending,
      },
    }

    expect(authStore.current()).toEqual(expected)
  })

  it('Subscribes to the onAuthStateChanged observable.', () => {
    const authStateChangedSpy = jest.spyOn(auth, 'onAuthStateChanged')

    listenForAuthStateChanges()

    expect(authStateChangedSpy).toHaveBeenCalledWith(handleOnAuthStateChanged)
  })

  it('Updates the auth store based on onAuthStateChanged events.', () => {
    const updateSpy = jest.spyOn(updater, 'updateUser')
    const testUser = {} as firebase.User

    handleOnAuthStateChanged(null)

    expect(updateSpy).toHaveBeenCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledWith(null, false)

    updateSpy.mockReset()
    handleOnAuthStateChanged(testUser)

    expect(updateSpy).toHaveBeenCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledWith(testUser, false)
  })

  it('Redirects to the sign page when signIn() is called.', () => {
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

  it('Signs out the user when signOut() is called.', () => {
    const signOutSpy = jest
      .spyOn(auth, 'signOut')
      .mockImplementation(() => Promise.resolve(undefined))

    signOut()

    expect(signOutSpy).toHaveBeenCalledTimes(1)
  })
})
