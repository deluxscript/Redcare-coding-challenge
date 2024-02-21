import { FC, useState, memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { FiFilter, FiSearch } from 'react-icons/fi'
import classnames from 'classnames'

import { TrendingRepo } from '../../api'
import { repositoriesSelector } from '../../store/slices/repositoriesSlice'

import { TabButton } from '../../components/TabButton/TabButton'
import { RepositoryItem } from '../../components/RepositoryItem/RepositoryItem'
import { TabContent } from '../../components/TabContent/TabContent'
import { FilterLanguagePopup } from './FilterLanguagePopup'
import { Spinner } from '../../components/Spinner/Spinner'

import './RepositoryView.scss'

const tabCategory = ['Repositories', 'Starred']
const reposPerPage = 9

/**
 * Interface defining the props for the RepositoryView component.
 */
type RepositoryViewProps = {
  /**
   * An array of trending repository data objects.
   */
  trendingRepos: TrendingRepo[]
  /**
   * Flag to check if repositories are loaded
   */
  isReposPending: boolean
}

/**
 * Interface defining the props for a component receiving filtered repository data.
 */
type FilteredRepoProp = {
  /**
   * An array of trending repository data objects.
   */
  trendingRepos: TrendingRepo[]
  /**
   * The current page number for paginated display of repositories (starts at 1).
   */
  currentPage: number
}

/**
 * Retrieves a specific page of repository data from a larger list.
 *
 * @param repos - An array of repository data objects.
 * @param currentPage - The desired page number (starting from 1).
 * @returns - An array of repository data objects for the specified page.
 */
const getPagedRepos = (repos: TrendingRepo[], currentPage: number) => {
  const startIndex = (currentPage - 1) * reposPerPage
  const endIndex = startIndex + reposPerPage
  return repos.slice(startIndex, endIndex)
}

export const RepositoryView: FC<RepositoryViewProps> = props => {
  const [selectedTabByUser, setSelectedTabByUser] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const { languageFilterValues } = useSelector(repositoriesSelector)

  const [isActiveFilterLanguagePopup, setIsActiveFilterLanguagePopup] = useState(false)

  const openFilterLanguagePopup = () => setIsActiveFilterLanguagePopup(true)
  const closeFilterLanguagePopup = () => setIsActiveFilterLanguagePopup(false)

  // During the first render there is no selected tab by the user,
  // that's why I take the first element from the categories as the selected tab
  const activeTab = selectedTabByUser || tabCategory[0]

  const filteredRepos = useMemo(() => {
    return props.trendingRepos.filter((repo) => {
      // Apply starred filter if active tab is 'Starred'
      if (activeTab === 'Starred' && !repo.starred) return false

      // Apply search filter if search query is present
      if (searchQuery && !repo.name.toLowerCase().includes(searchQuery.toLowerCase())) return false

      // Apply language filter if language values are selected
      return !(languageFilterValues.length > 0 && !languageFilterValues.some((lang) => repo.language === lang))
    })
  }, [props.trendingRepos, activeTab, searchQuery, languageFilterValues])

  return (
    <section className='Repository-view'>
      <div className='Repository-view__header'>
        <h1 className='Repository-view__header-title'>Trending Repositories</h1>
        <div className='Repository-view__header-form'>
          <FiSearch className='Repository-view__header-form--search-icon'/>
          <input
            className='Repository-view__header-form--input'
            type='text'
            name='search'
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiFilter
            className='Repository-view__header-form--filter'
            onClick={openFilterLanguagePopup} title='Filter'
          />
        </div>
      </div>
      <div className='Repository-view__nav'>
        {tabCategory.map(category => (
          <TabButton
            key={category}
            isActive={activeTab === category}
            onClick={() => {
              setSelectedTabByUser(category)
              setCurrentPage(1)
            }}
          >
            {category}
          </TabButton>
        ))}
      </div>
      <TabContent>
        {props.isReposPending
          ? <Spinner />
          : <RepositoryList
              trendingRepos={filteredRepos}
              currentPage={currentPage} />
        }
        <div className='Repository-view__pagination'>
          {[...Array(Math.ceil(filteredRepos.length / reposPerPage)).keys()].map((page) => (
            <button
              className={classnames('Repository-view__pagination-btn',
                {'Repository-view__pagination-btn--active': page + 1 === currentPage})}
              key={page + 1}
              onClick={() => setCurrentPage(page + 1)}
              disabled={currentPage === page + 1}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </TabContent>
      {isActiveFilterLanguagePopup && <FilterLanguagePopup onClose={closeFilterLanguagePopup} />}
    </section>
  )
}

/**
 * A functional component rendering a list of paginated repository items.
 * @param props - The component's props.
 * @returns - The JSX element to render the repository list.
 */
const RepositoryList: FC<FilteredRepoProp> = memo(({trendingRepos, currentPage}) => {
  const pagedRepos = getPagedRepos(trendingRepos, currentPage)

  return (
    <div className='Repository-view__list'>
      {pagedRepos.map((repo) => (
        <RepositoryItem key={repo.id} repo={repo} />
      ))}
    </div>
  )
})
