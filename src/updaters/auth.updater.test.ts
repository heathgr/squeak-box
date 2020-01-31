import { User } from 'firebase'

import { listenForAuthStateChanges, handleOnAuthStateChanged } from './auth.updater'
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
    const testUser = {} as User

    handleOnAuthStateChanged(null)

    expect(updateSpy).toHaveBeenCalledWith({ user: null })

    handleOnAuthStateChanged(testUser)

    expect(updateSpy).toHaveBeenCalledWith({ user: testUser })
  })
})