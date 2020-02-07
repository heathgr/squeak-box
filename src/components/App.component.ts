import { createElement as e, FC } from 'react'
import { createUseStyles } from 'react-jss'

import Messages from './Messages.component'
import Footer from './Footer.component'
import { flexColumn } from '../styles/common'

const useAppStyles = createUseStyles({
  app: {
    ...flexColumn,
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
    e(Messages),
    e(Footer),
  )
}

export default App
