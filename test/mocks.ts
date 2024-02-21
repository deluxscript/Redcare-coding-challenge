import { TrendingRepo } from '../src/api'

export const mockRepo: TrendingRepo[] = [{
    id: 1,
    name: 'First Repo',
    description: 'This is a test repository',
    avatar_url: 'https://example.com/avatar.png',
    link: 'https://example.com/avatar.png',
    starred: false,
    topics: ['aero', 'typescript'],
    language: 'JavaScript',
    stargazers_count: 100,
    forks_count: 50,
    updated_at: '2024-02-20T08:00:00Z',
  },
  {
    id: 2,
    name: 'Second Repo',
    description: 'This is the second test repository',
    avatar_url: 'https://example.com/avatar.png',
    link: 'https://example.com/avatar.png',
    starred: false,
    topics: ['topic1', 'topic2'],
    language: 'TypeScript',
    stargazers_count: 100,
    forks_count: 50,
    updated_at: '2024-02-19T08:00:00Z',
  }
]
