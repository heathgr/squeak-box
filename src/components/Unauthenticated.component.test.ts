import { shallow } from 'enzyme'
import { createElement as e } from 'react'

import * as services from '../services'
import Unauthenticated from './Unauthenticated.component'

describe('Unauthorized Component', () => {
  it('Should have a button that calls signIn().', () => {
    const signInSpy = jest.spyOn(services, 'signIn').mockImplementation(() => null)

    const subject = shallow(e(Unauthenticated))
    const button = subject.find('[data-test-id="sign-in-button"]')

    button.simulate('click')

    expect(signInSpy).toHaveBeenCalledTimes(1)
  })
})
