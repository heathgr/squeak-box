import { act } from 'react-dom/test-utils'
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactWrapper } from 'enzyme'
import Store from 's-is-for-store'

// eslint-disable-next-line max-len
const createTestStateUpdate = <T>(store: Store<T>, subject: ReactWrapper) => (newState: Partial<T>) => {
  act(() => {
    store.update(newState)
  })
  subject.update()
}

export default createTestStateUpdate
