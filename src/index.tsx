import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { setupStore } from './store'

import { App } from './App'

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <App/>
    </Provider>
  </React.StrictMode>,
)
