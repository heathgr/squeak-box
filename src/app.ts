import { createElement as e } from 'react'
import { render } from 'react-dom'
import { updateOnAuthChange } from './updaters/auth.updater'
import { App } from './components/App.component'

// initializes firebase
import './services'

// start update listeners
updateOnAuthChange()

const appContainer = document.getElementById('app')

render(e(App), appContainer)