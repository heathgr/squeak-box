import Store from 's-is-for-store'
import { authStore } from './auth.store'

describe('App store', () => {
  it('Creaates a store.', () => {
    const subject = authStore

    expect(authStore).toBeInstanceOf(Store)
  })
})