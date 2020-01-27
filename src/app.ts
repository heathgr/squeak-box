import { createElement as e } from 'react'
import { render } from 'react-dom'

import { App } from './components/App.component'

// initializes firebase
import './firebase'

const appContainer = document.getElementById('app')

render(e(App), appContainer)