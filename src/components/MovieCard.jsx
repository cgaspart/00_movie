import { getThumbnailUrl } from '../api/tmdb'

const MovieCard = ({ movie, onClick, isActive }) => {
  const posterUrl = getThumbnailUrl(movie.poster_path)

  return (
    <button
      onClick={onClick}
      className={`movie-card w-full text-left p-3 flex gap-4 ${
        isActive ? 'ring-2 ring-primary-500 bg-gray-700' : ''
      }`}
      aria-label={`Select ${movie.title}`}
    >
      <div className="flex-shrink-0 w-16 h-24 bg-gray-700 rounded-md overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-white truncate">{movie.title}</h3>
        {movie.release_date && (
          <p className="text-sm text-gray-400 mt-1">
            {new Date(movie.release_date).getFullYear()}
          </p>
        )}
        {movie.vote_average > 0 && (
          <div className="flex items-center gap-1 mt-2">
            <svg
              className="w-3 h-3 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-gray-400">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </button>
  )
}

export default MovieCard
