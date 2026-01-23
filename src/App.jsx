import { useMovies } from './hooks/useMovies'
import SearchBar from './components/SearchBar'
import VideoPlayer from './components/VideoPlayer'
import MovieDetails from './components/MovieDetails'
import MovieList from './components/MovieList'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'

function App() {
  const {
    movies,
    currentMovie,
    trailerKey,
    loading,
    error,
    selectMovie,
    search
  } = useMovies()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Movie Search
            </h1>
            <div className="flex-1 max-w-2xl">
              <SearchBar onSearch={search} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && <ErrorMessage message={error} />}

        {loading && !currentMovie ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <VideoPlayer videoId={trailerKey} />
              {currentMovie && (
                <MovieDetails
                  title={currentMovie.title}
                  overview={currentMovie.overview}
                  releaseDate={currentMovie.release_date}
                  rating={currentMovie.vote_average}
                  posterPath={currentMovie.poster_path}
                />
              )}
            </div>

            <aside>
              <h2 className="text-xl font-semibold mb-4 text-gray-200">
                Recommended Movies
              </h2>
              <MovieList
                movies={movies}
                onMovieSelect={selectMovie}
                currentMovieId={currentMovie?.id}
              />
            </aside>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            Powered by{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              TMDB
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
