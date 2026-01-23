const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
      <div className="flex items-center gap-3">
        <svg
          className="w-5 h-5 text-red-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ErrorMessage
