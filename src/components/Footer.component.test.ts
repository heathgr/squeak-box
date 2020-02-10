import { shallow } from 'enzyme'
import { createElement as e } from 'react'

import authStore, { initialState, UserValue } from '../stores/auth.store'
import { updateUser } from '../updaters/auth.updater'
import Footer from './Footer.component'
import Unauthenticated from './Unauthenticated.component'
import NewMessage from './NewMessage.component'
import Loader from './Loader.component'

describe('Footer Component', () => {
  beforeEach(() => {
    authStore.update(initialState)
  })

  it('Displays a Loader component it the authentication status is pending.', () => {
    updateUser(null, true)

    const subject = shallow(e(Footer))

    expect(subject.find(Loader).exists()).toEqual(true)
  })

  it('Should display the Unauthenticated component if the user is not signed in.', () => {
    updateUser(null)

    const subject = shallow(e(Footer))

    expect(subject.find(Unauthenticated).exists()).toEqual(true)
  })

  it('Should display the NewMessage component if the user is signed in', () => {
    const testUser = {} as UserValue
    updateUser(testUser)

    const subject = shallow(e(Footer))

    expect(subject.find(NewMessage).exists()).toEqual(true)
  })
})
