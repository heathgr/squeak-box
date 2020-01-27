import { createElement as e } from 'react'
import { render } from 'react-dom'
import { onAuthStateChanged } from './updaters/auth.updater'
import { onMessagesUpdated } from './updaters/messages.updater'
import { App } from './components/App.component'

// initializes firebase
import './services'

// start update listeners
onAuthStateChanged()
onMessagesUpdated()

const appContainer = document.getElementById('app')

render(e(App), appContainer)