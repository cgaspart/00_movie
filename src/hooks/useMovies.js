import { useState, useEffect, useCallback } from 'react'
import {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
  getMovieRecommendations,
  getYouTubeTrailerKey
} from '../api/tmdb'

export const useMovies = () => {
  const [movies, setMovies] = useState([])
  const [currentMovie, setCurrentMovie] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadMovieDetails = useCallback(async (movie) => {
    try {
      const details = await getMovieDetails(movie.id)
      const videoKey = getYouTubeTrailerKey(details.videos)
      setTrailerKey(videoKey)
      setCurrentMovie({ ...movie, ...details })

      const recommendations = await getMovieRecommendations(movie.id)
      setMovies(recommendations.slice(0, 5))
    } catch (err) {
      console.error('Error loading movie details:', err)
      setError(err.message)
    }
  }, [])

  const selectMovie = useCallback((movie) => {
    loadMovieDetails(movie)
  }, [loadMovieDetails])

  const search = useCallback(async (query) => {
    if (!query.trim()) {
      initializeMovies()
      return
    }

    setLoading(true)
    setError(null)

    try {
      const results = await searchMovies(query)
      if (results.length > 0) {
        await loadMovieDetails(results[0])
      }
    } catch (err) {
      console.error('Error searching movies:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [loadMovieDetails])

  const initializeMovies = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const popularMovies = await getPopularMovies()
      if (popularMovies.length > 0) {
        await loadMovieDetails(popularMovies[0])
        setMovies(popularMovies.slice(1, 6))
      }
    } catch (err) {
      console.error('Error initializing movies:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [loadMovieDetails])

  useEffect(() => {
    initializeMovies()
  }, [initializeMovies])

  return {
    movies,
    currentMovie,
    trailerKey,
    loading,
    error,
    selectMovie,
    search
  }
}
