import { createElement as e, FC } from 'react'
import { useStore } from '@s-is-for-store/react'
import { createUseStyles } from 'react-jss'

import authStore from '../stores/auth.store'
import Unauthenticated from './Unauthenticated.component'
import NewMessage from './NewMessage.component'
import {
  displayFlex,
  flexAlign,
  FlexAlign,
  flexJustify,
  FlexJustify,
  flexStatic,
} from '../styles/common'


const useFooterStyles = createUseStyles({
  container: {
    ...displayFlex(),
    ...flexStatic(),
    ...flexAlign(FlexAlign.CENTER),
    ...flexJustify(FlexJustify.CENTER),
    margin: '1em',
    width: '100%',
  },
})

const Footer: FC = () => {
  const authState = useStore(authStore)
  const footerStyles = useFooterStyles()

  return e(
    'footer',
    {
      className: footerStyles.container,
    },
    authState.user ? e(NewMessage) : e(Unauthenticated),
  )
}

export default Footer
