import { createElement as e } from 'react'
import { shallow } from 'enzyme'

import Loader from './Loader.component'

describe('Loader', () => {
  it('Dispalys a loader.', () => {
    const subject = shallow(e(Loader))

    expect(subject.exists()).toEqual(true)
  })
})
