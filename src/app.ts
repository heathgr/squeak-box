import { createElement as e } from 'react'
import { render } from 'react-dom'

// initializes firebase
import './firebase'

const appContainer = document.getElementById('app')
const App = () => e('h1', null, 'Squeak Box')

render(e(App), appContainer)