import { User } from 'firebase'

import { updateOnAuthChange, onAuthStateChangedHandler } from './auth.updater'
import authStore from '../stores/auth.store'
import { auth } from '../services'

describe('Auth Updater', () => {
  it('Subscribes to the onAuthStateChanged observable.', () => {
    const authStateChangedSpy = jest.spyOn(auth, 'onAuthStateChanged')

    updateOnAuthChange()

    expect(authStateChangedSpy).toHaveBeenCalledWith(onAuthStateChangedHandler)
  })

  it('Updates the auth store based on onAuthStateChanged events.', () => {
    const updateSpy = jest.spyOn(authStore, 'update')
    const testUser = {} as User

    onAuthStateChangedHandler(null)

    expect(updateSpy).toHaveBeenCalledWith({ user: null })

    onAuthStateChangedHandler(testUser)

    expect(updateSpy).toHaveBeenCalledWith({ user: testUser })
  })
})