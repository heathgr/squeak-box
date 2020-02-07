import { shallow } from 'enzyme'
import { createElement as e } from 'react'

import App from './App.component'
import Footer from './Footer.component'
import MessageList from './MessageList.component'
import Header from './Header.component'

describe('App Component', () => {
  it('Displays a Header comonent.', () => {
    const subject = shallow(e(App))

    expect(subject.find(Header).exists()).toEqual(true)
  })

  it('Displays a Footer component.', () => {
    const subject = shallow(e(App))

    expect(subject.find(Footer).exists()).toEqual(true)
  })

  it('Displays a MessageList component.', () => {
    const subject = shallow(e(App))

    expect(subject.find(MessageList).exists()).toEqual(true)
  })
})
