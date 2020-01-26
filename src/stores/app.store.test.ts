import Store from 's-is-for-store'
import { appStore } from './app.store'
describe('App store', () => {
  it('Creaates a store.', () => {
    const subject = appStore

    expect(appStore).toBeInstanceOf(Store)
  })
})