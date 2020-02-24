import Store from 's-is-for-store'
import createMessageFormStore from './createMessageForm.store'

describe('Create Message Store', () => {
  it('Creaates a store.', () => {
    expect(createMessageFormStore).toBeInstanceOf(Store)
  })
})
