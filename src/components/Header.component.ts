import { createElement as e, FC } from 'react'
import { createUseStyles } from 'react-jss'
import {
  displayFlex,
  flexAlign,
  FlexAlign,
  flexJustify,
  FlexJustify,
  flexStatic,
} from '../styles/common'

const useHeaderStyles = createUseStyles({
  container: {
    ...displayFlex(),
    ...flexStatic(),
    ...flexJustify(FlexJustify.CENTER),
    ...flexAlign(FlexAlign.CENTER),
    width: '100%',
    margin: '1em',
  },
})

const Header: FC = () => {
  const headerStyles = useHeaderStyles()

  return e(
    'header',
    {
      className: headerStyles.container,
    },
    e(
      'h1',
      null,
      'Squeak Box',
    ),
  )
}

export default Header
