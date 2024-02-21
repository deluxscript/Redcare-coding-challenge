import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './constants/routes'

import { RepositoryView } from './views/RepositoryView/RepositoryView'
import { useRepositories } from './hooks/useRepositories'

let appInitialise = false

export const AppRoutes: FC = () => {
  const repositories = useRepositories()
  const isReposPending = repositories.loadingGettingTrendingRepositories === 'pending'

  useEffect(() => {
    if (!appInitialise) {
      appInitialise = true
      repositories.getTrendingRepositories()
        .finally(() =>
          repositories.loadStarredRepositories())
    }
  }, [])
  return (
    <>
      <Routes>
        <Route path={routes.home} element={<RepositoryView trendingRepos={repositories.trendingRepositories} isReposPending={isReposPending}  />} />
      </Routes>
    </>
  )
}
