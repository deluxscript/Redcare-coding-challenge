import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import { RepositoryItem } from '../RepositoryItem'
import { mockRepo } from '../../../../test/mocks'
import { renderWithProviders } from '../../../../test/renderWithProvider'
import { setupStore } from '../../../store'

const repositoriesInitialStore = setupStore().getState().repositories

describe('RepositoryView component renders correctly', () => {

  it('renders basic repository information', () => {
    renderWithProviders(<MemoryRouter><RepositoryItem repo={mockRepo[0]} /></ MemoryRouter>, {
      preloadedState: {
        repositories: {
          ...repositoriesInitialStore
        }
      }
    })

    expect(screen.getByText('First Repo')).toBeInTheDocument()
    expect(screen.getByText('This is a test repository')).toBeInTheDocument()
    expect(screen.getByText('aero')).toBeInTheDocument()
    expect(screen.getByText('typescript')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('Updated Today')).toBeInTheDocument()
  })
})
