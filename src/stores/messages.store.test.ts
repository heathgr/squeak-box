import Store from 's-is-for-store'
import messagesStore from './messages.store'

describe('Messages Store', () => {
  it('Creaates a store.', () => {
    expect(messagesStore).toBeInstanceOf(Store)
  })
})