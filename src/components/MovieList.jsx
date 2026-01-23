import MovieCard from './MovieCard'

const MovieList = ({ movies, onMovieSelect, currentMovieId }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>No recommendations available</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onMovieSelect(movie)}
          isActive={movie.id === currentMovieId}
        />
      ))}
    </div>
  )
}

export default MovieList
