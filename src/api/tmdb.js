const API_BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

const getApiKey = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY
  if (!apiKey || apiKey === 'your_api_key_here') {
    console.warn('TMDB API key not configured. Please set VITE_TMDB_API_KEY in your .env file.')
    return null
  }
  return apiKey
}

const fetchFromTMDB = async (endpoint, params = {}) => {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('API key not configured')
  }

  const url = new URL(`${API_BASE_URL}${endpoint}`)
  url.searchParams.append('api_key', apiKey)
  url.searchParams.append('language', 'en-US')

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`)
  }

  return response.json()
}

export const getPopularMovies = async () => {
  const data = await fetchFromTMDB('/discover/movie', {
    sort_by: 'popularity.desc',
    include_adult: 'false'
  })
  return data.results
}

export const searchMovies = async (query) => {
  if (!query.trim()) return []

  const data = await fetchFromTMDB('/search/movie', {
    query,
    include_adult: 'false'
  })
  return data.results
}

export const getMovieDetails = async (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}`, {
    append_to_response: 'videos'
  })
}

export const getMovieRecommendations = async (movieId) => {
  const data = await fetchFromTMDB(`/movie/${movieId}/recommendations`)
  return data.results
}

export const getYouTubeTrailerKey = (videos) => {
  if (!videos?.results?.length) return null

  const trailer = videos.results.find(
    video => video.site === 'YouTube' && video.type === 'Trailer'
  ) || videos.results.find(
    video => video.site === 'YouTube'
  )

  return trailer?.key || null
}

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export const getBackdropUrl = (path) => getImageUrl(path, 'w1280')
export const getPosterUrl = (path) => getImageUrl(path, 'w500')
export const getThumbnailUrl = (path) => getImageUrl(path, 'w185')
