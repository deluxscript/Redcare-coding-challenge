/**
 * Calculates the human-readable time difference between a given date string and today's date.
 * @param dateString - The date string.
 * @returns - A string representing the time difference (e.g., 'Today', 'Yesterday', '2 days ago', etc.).
 */
export const getDateDifference = (dateString: string) => {
  const today = new Date()
  const date = new Date(dateString)

  const diffInMs = today.getTime() - date.getTime()
  const differenceDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  // Return appropriate message based on difference
  if (differenceDays === 0) {
    return 'Today'
  } else if (differenceDays === 1) {
    return 'Yesterday'
  } else if (differenceDays === 2) {
    return '2 days ago'
  } else if (differenceDays === 3) {
    return '3 days ago'
  } else if (differenceDays > 3) {
    return `${differenceDays} days ago`
  } else {
    return 'Date in the future'
  }
}

export const repoLanguages = [
  'C++',
  'Java',
  'TypeScript',
  'JavaScript',
  'Shell',
  'Python',
  'SCSS',
  'C#',
  'Assembly',
  'Scala',
  'HTML',
  'Jupyter Notebook',
  'R',
  'Dockerfile',
  'Kotlin'
]

