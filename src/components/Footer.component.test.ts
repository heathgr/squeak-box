import { shallow } from 'enzyme'
import { createElement as e } from 'react'
import { User } from 'firebase'

import authStore, { initialState } from '../stores/auth.store'
import Footer from './Footer.component'
import Unauthenticated from './Unauthenticated.component'
import NewMessage from './NewMessage.component'

describe('Footer Component', () => {
  beforeEach(() => {
    authStore.update(initialState)
  })

  it('Should display the Unauthenticated component if the user is not signed in.', () => {
    authStore.update({ user: null })

    const subject = shallow(e(Footer))

    expect(subject.find(Unauthenticated).exists()).toEqual(true)
  })

  it('Should display the NewMessage component if the user is signed in', () => {
    authStore.update({ user: {} as User })

    const subject = shallow(e(Footer))

    expect(subject.find(NewMessage).exists()).toEqual(true)
  })
})
