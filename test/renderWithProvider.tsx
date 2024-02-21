import React, {FC, PropsWithChildren} from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'

import { setupStore } from '../src/store'
import { AppStore } from '../src/store/types'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: any
  store?: AppStore
}

/**
 * Renders UI for tests with necessary wrappers
 * @param ui UI should be rendered
 * @param preloadedState Preloaded (mocked) state of the store
 * @param store Redux store
 * @param renderOptions Other options for rendering
 */
export function renderWithProviders (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => <Provider store={store}>{children}</Provider>

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
