import { createElement as e, FC, ReactNode } from 'react'
import { useStore } from '@s-is-for-store/react'
import { createUseStyles } from 'react-jss'

import authStore, { UserValue } from '../stores/auth.store'
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
import Loader from './Loader.component'


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

const footerChild = (isPending: boolean, user: UserValue): ReactNode => {
  if (user) {
    return e(NewMessage)
  }

  if (!user && !isPending) {
    return e(Unauthenticated)
  }

  return e(Loader)
}

const Footer: FC = () => {
  const authState = useStore(authStore)
  const footerStyles = useFooterStyles()
  const user = authState.user.value
  const { isPending } = authState.user

  return e(
    'footer',
    {
      className: footerStyles.container,
    },
    footerChild(isPending, user),
  )
}

export default Footer
