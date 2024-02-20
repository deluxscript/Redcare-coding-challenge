import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { RepositoryItem } from '../../../components/RepositoryItem/RepositoryItem'
import { mockRepo } from '../../../../test/mocks'
import {renderWithProviders} from "../../../../test/renderWithProvider";


describe('RepositoryView component renders correctly', () => {
  it('renders basic repository information', () => {
    renderWithProviders(<RepositoryItem repo={mockRepo} />, {
      preloadedState: {
      }
    })

    expect(screen.getByText('Test Repo')).toBeInTheDocument();
    expect(screen.getByText('This is a test repository')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('...1 more')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('Updated Today')).toBeInTheDocument()
  })
})
