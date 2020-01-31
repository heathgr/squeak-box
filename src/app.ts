import { createElement as e } from 'react'
import { render } from 'react-dom'
import { listenForAuthStateChanges } from './updaters/auth.updater'
import { listenForMessageUpdates } from './updaters/messages.updater'
import { App } from './components/App.component'

// initializes firebase
import './services'

// call listeners
listenForAuthStateChanges()
listenForMessageUpdates()

const appContainer = document.getElementById('app')

render(e(App), appContainer)