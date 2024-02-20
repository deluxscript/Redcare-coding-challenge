import { ApiResponse } from '../constants/types'

const BASE_URL = 'https://api.github.com'

/**
 * Error class for API requests resulting in a 5xx status code.
 */
export class ApiError extends Error {
  constructor (url: string, status: number, public responseBody: string) {
    super(`Server Error: Erroneous request to endpoint ${url}, status ${status}, response body ${responseBody}`)
  }
}

/**
 * Error class for API requests resulting in a 4xx status code.
 */
export class ClientError extends Error {
  constructor (url: string, status: number, public responseBody: Record<string, unknown>) {
    super(`Client Error: Erroneous request to endpoint ${url}, status ${status}, code ${responseBody.code}`)
  }
}

/**
 * Converts responses with status codes > 399 to error objects.
 * @param res A {@link fetch} response
 * @throws ClientError When the status code is between 400 and 499 (but not 401)
 * @throws ApiError When the status code is >= 500
 */
async function errorConverter (res: Response) {
  const isResponseJson = res.headers.get('content-type')?.includes('application/json')
  if (res.status >= 400 && res.status < 500) {
    const responseBody = isResponseJson ? await res.json() : { code: 'UNKNOWN' }
    throw new ClientError(res.url, res.status, responseBody)
  } else if (res.status >= 500) {
    throw new ApiError(res.url, res.status, await res.text())
  } else {
    return res
  }
}

/**
 * Send a request to the provided public API
 * @param endpoint An endpoint URL
 */
const sendRequestToAPI = async (
  endpoint: string,
): Promise<Response> => {
  const requestURL = BASE_URL + endpoint
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  return fetch(requestURL, {
    headers: headers,
  }).then(errorConverter)
}

/**
 * Interface defining the data structure for a trending repository.
 */
export type TrendingRepo = {
  /**
   * The unique identifier of the repository.
   */
  id: number
  /**
   * The name of the repository.
   */
  name: string
  /**
   * A brief description of the repository.
   */
  description: string
  /**
   * The GitHub URL to the repository.
   */
  link: string
  /**
   * An array of topics associated with the repository.
   */
  topics: string[]
  /**
   * The URL of the repository's avatar image.
   */
  avatar_url: string
  /**
   * The primary programming language used in the repository.
   */
  language: string
  /**
   * The number of stargazers on the repository.
   */
  stargazers_count: number
  /**
   * The number of forks for the repository.
   */
  forks_count: number
  /**
   * The date and time the repository was last updated.
   */
  updated_at: string
  /**
   * A boolean flag indicating whether the user has starred the repository.
   */
  starred: boolean
}

/**
 * Fetches the list of trending GitHub repositories.
 * @returns A promise that resolves to a list of trending repositories.
 */
export function getTrendingRepositories(): Promise<TrendingRepo[]> {
  const params = new URLSearchParams({
    q: 'created:2017-01-10',
    sort: 'stars',
    order: 'desc',
  })
  return sendRequestToAPI(`/search/repositories?${params.toString()}`)
    .then((res) => res.json())
    .then((data: ApiResponse) => {
      return data.items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        link: item.html_url,
        topics: item.topics,
        avatar_url: item.owner.avatar_url,
        language: item.language,
        stargazers_count: item.stargazers_count,
        forks_count: item.forks_count,
        updated_at: item.updated_at,
        starred: false
      }))
    })
}
