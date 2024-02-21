import { FC } from 'react'
import { GoCodeSquare, GoGitBranch, GoStarFill } from 'react-icons/go'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { TrendingRepo } from '../../api'
import { getDateDifference } from '../../constants/helper'
import { useRepositories } from '../../hooks/useRepositories'

import './RepositoryItem.scss'

/**
 * Interface defining the props for a React component rendering a single repository item.
 */
type RepositoryItemProps = {
  /**
   * The data object representing the repository to be rendered.
   */
  repo: TrendingRepo
}

export const RepositoryItem: FC<RepositoryItemProps> = ({repo}) => {
  const remainingTopics = repo.topics.slice(3)
  const repository = useRepositories()

  return (
    <article data-testid='repository-item' className={classnames('Repository-item', {'Repository-item--starred': repo.starred})}>
      <div className='Repository-item__section'>
        <div className='Repository-item__section-media'>
          <img className='Repository-item__section-media--image' src={repo.avatar_url} alt='repo-icon' />
          {repo.starred && <FaStar className='Repository-item__section-media--star'/>}
        </div>
        <div className='Repository-item__section-info'>
          <h2 className='Repository-item__section-info--title'>
            <Link
              to={repo.link}
              target='_blank'
              className='Repository-item__section-info--title-link'
            >
              {repo.name}
            </Link>
          </h2>
          <p className='Repository-item__section-info--desc'>{repo.description}</p>
          <ul className='Repository-item__section-info--topics'>
            {renderLimitedTopics(repo.topics)}
            {remainingTopics.length > 0 &&
              <li className='Repository-item__section-info--topics-item'>
                ...{remainingTopics.length} more
              </li>
            }
          </ul>
        </div>
      </div>
      <div className='Repository-item__label'>
        <ul className='Repository-item__label-list'>
          <li className='Repository-item__label-list-item'>
            <button
              className='Repository-item__label-list-item--btn'
              onClick={() => repository.updateStarredRepoStatus(repo.id)}>
              {repo.starred ? 'UnStar' : 'Star'}
            </button>
          </li>
          <li className='Repository-item__label-list-item'>
            <GoCodeSquare />
            <span className='Repository-item__label-list-item--text'>{repo.language}</span>
          </li>
          <li className='Repository-item__label-list-item'>
            <GoStarFill />
            <span className='Repository-item__label-list-item--text'>{repo.stargazers_count}</span>
          </li>
          <li className='Repository-item__label-list-item'>
            <GoGitBranch />
            <span className='Repository-item__label-list-item--text'>{repo.forks_count}</span>
          </li>
          <li className='Repository-item__label-list-item'>Updated {getDateDifference(repo.updated_at)}</li>
        </ul>
      </div>
    </article>
  )
}

/**
 * Renders a limited number of topics from a list, truncated with an indicator.
 * @param topics - An array of topic strings.
 */
const renderLimitedTopics = (topics: string[]) => {
  return topics.slice(0, 3).map((topic, index) => (
    <li key={index} className='Repository-item__section-info--topics-item'>
      {topic}
    </li>
  ))
}
