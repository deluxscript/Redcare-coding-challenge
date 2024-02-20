import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './AppRoutes'
import { Layout } from './components/Layout/Layout'

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  )
}
