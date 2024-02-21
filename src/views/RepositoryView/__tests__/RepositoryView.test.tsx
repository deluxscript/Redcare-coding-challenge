import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import { mockRepo } from '../../../../test/mocks'
import { renderWithProviders } from '../../../../test/renderWithProvider'
import { setupStore } from '../../../store'
import { RepositoryView } from '../RepositoryView'

const repositoriesInitialStore = setupStore().getState().repositories

describe('RepositoryView component renders correctly', () => {

  it('renders the correct number of repositories on the page', () => {
    renderWithProviders(<MemoryRouter><RepositoryView trendingRepos={mockRepo} isReposPending={false}/></ MemoryRouter>, {
      preloadedState: {
        repositories: {
          ...repositoriesInitialStore
        }
      }
    })

    const renderedRepos = screen.getAllByTestId('repository-item')
    expect(renderedRepos.length).toBe(2)
  })

  it('renders filtered repositories based on search query', () => {
    renderWithProviders(<MemoryRouter><RepositoryView trendingRepos={mockRepo} isReposPending={false}/></ MemoryRouter>, {
      preloadedState: {
        repositories: {
          ...repositoriesInitialStore
        }
      }
    })

    // Input the search query
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'First' } })

    expect(screen.getByText('First Repo')).toBeInTheDocument()
    expect(screen.queryByText('Second Repo')).not.toBeInTheDocument()

  })

  it('renders filtered repositories based on language filter', () => {
    renderWithProviders(<MemoryRouter><RepositoryView trendingRepos={mockRepo} isReposPending={false}/></ MemoryRouter>, {
      preloadedState: {
        repositories: {
          ...repositoriesInitialStore,
          languageFilterValues: ['TypeScript']
        }
      }
    })

    expect(screen.getByText('Second Repo')).toBeInTheDocument()
    expect(screen.queryByText('First Repo')).not.toBeInTheDocument()

  })
})
