import { shallow } from 'enzyme'
import { createElement as e } from 'react'

import App from './App.component'
import { Footer } from './Footer.component'
import Messages from './Messages.component'

describe('App Component', () => {
  it('Displays a header.', () => {
    const subject = shallow(e(App))

    expect(subject.find('h1').text()).toEqual('Squeak Box')
  })

  it('Displays a Footer component.', () => {
    const subject = shallow(e(App))

    expect(subject.find(Footer).exists()).toEqual(true)
  })

  it('Displays a MessageList component.', () => {
    const subject = shallow(e(App))

    expect(subject.find(Messages).exists()).toEqual(true)
  })
})