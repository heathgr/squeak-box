import { shallow } from 'enzyme'
import { createElement as e } from 'react'

import Header from './Header.component'

describe('Header', () => {
  it('Should have a header element', () => {
    const subject = shallow(e(Header))

    expect(subject.find('header').exists()).toEqual(true)
  })

  it('Should have an h1 element', () => {
    const subject = shallow(e(Header))

    expect(subject.find('h1').exists()).toEqual(true)
  })
})
