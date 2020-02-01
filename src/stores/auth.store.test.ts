import Store from 's-is-for-store'
import authStore from './auth.store'

describe('App store', () => {
  it('Creaates a store.', () => {
    expect(authStore).toBeInstanceOf(Store)
  })
})
