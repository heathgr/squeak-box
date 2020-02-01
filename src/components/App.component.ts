import { createElement as e, FC } from 'react'
import Messages from './Messages.component'
import Footer from './Footer.component'

const App: FC = () => e(
  'main',
  null,
  e('h1', null, 'Squeak Box'),
  e(Messages),
  e(Footer),
)

export default App
