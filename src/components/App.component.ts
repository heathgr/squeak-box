import { createElement as e, FC } from 'react'
import { createUseStyles } from 'react-jss'

import MessageList from './MessageList.component'
import Footer from './Footer.component'
import { displayFlex, FlexDirection } from '../styles/common'

const useAppStyles = createUseStyles({
  app: {
    ...displayFlex(FlexDirection.ROW),
    height: '100%',
    width: '100%',
  },
})

const App: FC = () => {
  const appStyles = useAppStyles()

  return e(
    'main',
    {
      className: appStyles.app,
    },
    e('h1', null, 'Squeak Box'),
    e(MessageList),
    e(Footer),
  )
}

export default App
