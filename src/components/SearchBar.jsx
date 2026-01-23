import { useState, useCallback } from 'react'

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('')
  const [debounceTimeout, setDebounceTimeout] = useState(null)

  const handleSearch = useCallback((value) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }

    const timeout = setTimeout(() => {
      onSearch(value)
    }, 500)

    setDebounceTimeout(timeout)
  }, [onSearch, debounceTimeout])

  const handleChange = (e) => {
    const value = e.target.value
    setSearchText(value)
    handleSearch(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }
    onSearch(searchText)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchText}
            onChange={handleChange}
            placeholder="Search for movies..."
            className="input-search pl-10"
            aria-label="Search movies"
          />
        </div>
        <button
          type="submit"
          className="btn-primary px-6"
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
