import { createElement as e } from 'react'
import { Footer } from './Footer.component'

export const App = () => {
  return e(
    'main',
    null,
    e('h1', null, 'Squeak Box'),
    e(Footer),
  )
}