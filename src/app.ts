import { createElement as e } from 'react'
import { render } from 'react-dom'
import jss from 'jss'
import preset from 'jss-preset-default'

import { listenForAuthStateChanges } from './updaters/auth.updater'
import { listenForMessageUpdates } from './updaters/messages.updater'
import App from './components/App.component'
import { root } from './styles/common'

// initializes firebase
import './services'

// start listeners
listenForAuthStateChanges()
listenForMessageUpdates()

// create global styles
jss.setup(preset())
jss.createStyleSheet(root).attach()

const appContainer = document.getElementById('app')

render(e(App), appContainer)
