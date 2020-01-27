import { shallow } from 'enzyme'
import { createElement as e } from 'react'

import authStore, { initialState } from '../stores/auth.store'
import { Footer } from '../components/Footer.component'
import { Unauthenticated } from '../components/Unauthenticated.component'
import { User } from 'firebase'
import { NewMessage } from './NewMessage.component'

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