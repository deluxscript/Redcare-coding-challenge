import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AsyncThunkLoading, RootState } from '../types'
import { getTrendingRepositories, TrendingRepo } from '../../api'

type InitialTeamState = {
  /**
   * An array of trending repository data objects
   */
  trendingRepositories: TrendingRepo[]
  /**
   * An array of strings representing the currently selected language filters
   */
  languageFilterValues: string[]
  /**
   * The loading state for fetching trending repositories data.
   */
  loadingGettingTrendingRepositories: AsyncThunkLoading
}

const initialState: InitialTeamState = {
  trendingRepositories: [],
  languageFilterValues: [],
  loadingGettingTrendingRepositories: 'idle',
}

/**
 * Get trending repositories thunk
 */
export const getTrendingRepositoriesThunk = createAsyncThunk<
  undefined | TrendingRepo[]
>('repositories/trending', () => {
  return getTrendingRepositories()
})

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    /**
     * Updates the state to reflect starred repositories based on an action payload.
     * @param state - The current state of the application.
     * @param action - The Redux action containing the starred repository IDs.
     */
    starRepo: (
      state,
      action: PayloadAction<{ starredRepos: {id: number}[] }>,
    ) => {
      const { starredRepos } = action.payload
      // Update the starred parameter in trendingRepositories based on ids in starredRepos
      const updatedTrendingRepos = state.trendingRepositories.map((repo) => {
        const starredRepo = starredRepos.find((starred) => starred.id === repo.id)
        return {
          ...repo,
          starred: !!starredRepo,
        }
      })
      return {
        ...state,
        trendingRepositories: updatedTrendingRepos,
      }
    },
    /**
     * Loads starred repository information from localStorage and updates the state accordingly.
     * @param state - The current state of the application.
     */
    loadStarredRepo: (
      state
    ) => {
      const starredRepos = localStorage.getItem('starredRepos')
      const isStarredRepos:{id: number}[] = starredRepos ? JSON.parse(starredRepos) : []
      // Update the starred parameter in trendingRepositories based on ids in starredRepos
      const updatedTrendingRepos = state.trendingRepositories.map((repo) => {
        const starredRepo = isStarredRepos.find((starred) => starred.id === repo.id)
        return {
          ...repo,
          starred: !!starredRepo,
        }
      })
      return {
        ...state,
        trendingRepositories: updatedTrendingRepos,
      }
    },
    /**
     * Filter repositories by language.
     * @param state - The current state.
     * @param action - The action containing the language filter option.
     */
    languageFilter: (
      state,
      action: PayloadAction<{languages: string[]}>
    ) => {
      const { languages } = action.payload
      state.languageFilterValues = languages
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingRepositoriesThunk.pending, state => {
        state.loadingGettingTrendingRepositories = 'pending'
      })
      .addCase(getTrendingRepositoriesThunk.fulfilled, (state, action) => {
        if (
          state.loadingGettingTrendingRepositories === 'pending'
        ) {
          state.loadingGettingTrendingRepositories = 'succeeded'
          if (action.payload) {
            state.trendingRepositories = action.payload
          }
        }
      })
      .addCase(getTrendingRepositoriesThunk.rejected, (state, action) => {
        if (
          state.loadingGettingTrendingRepositories === 'pending'
        ) {
          state.loadingGettingTrendingRepositories = 'failed'
          console.error('Error getting trending repositories', action.error)
        }
      })
  },
})

export const { starRepo, loadStarredRepo, languageFilter } = repositoriesSlice.actions

export const repositoriesSelector = (state: RootState) => state.repositories

export const repositoriesReducer = repositoriesSlice.reducer
