import { useSelector } from 'react-redux'
import {
  getTrendingRepositoriesThunk,
  loadStarredRepo,
  repositoriesSelector,
  starRepo
} from '../store/slices/repositoriesSlice'
import { useAppDispatch } from '../store/types'

/**
 * Hook to manage repositories.
 */
export const useRepositories = () => {
  const dispatch = useAppDispatch()
  const { trendingRepositories, loadingGettingTrendingRepositories } = useSelector(repositoriesSelector)

  const getTrendingRepositories = () => dispatch(getTrendingRepositoriesThunk())
  const loadStarredRepositories = () => dispatch(loadStarredRepo())

  /**
   * Updates the starred status of a repository in local storage and dispatches a Redux action.
   * @param repoId - The ID of the repository to be updated.
   */
  const updateStarredRepoStatus = (repoId: number) => {
    const storedStarredReposString = localStorage.getItem('starredRepos')
    const starredRepos:{id: number}[] = storedStarredReposString ? JSON.parse(storedStarredReposString) : []
    const index = starredRepos.findIndex((repo: {id: number}) => {
      return repo.id === repoId
    })

    if (index !== -1) {
      // Repository is already starred, so remove it
      starredRepos.splice(index, 1)
    } else {
      // Repository is not starred, so add it
      starredRepos.push({ id: repoId })
    }
    // Update local storage with the modified repoId
    localStorage.setItem('starredRepos', JSON.stringify(starredRepos))
    dispatch(starRepo({starredRepos}))
  }

  return {
    /**
     * Array of trending repositories
     */
    trendingRepositories,
    /**
     * Loads trending repositories
     */
    getTrendingRepositories,
    /**
     * Loads starred repositories
     */
    loadStarredRepositories,
    updateStarredRepoStatus,
    loadingGettingTrendingRepositories
  }
}
