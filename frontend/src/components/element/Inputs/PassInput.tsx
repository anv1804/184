import React from 'react'

const PassInput = () => {
  return (
    <div>
    <label className="sr-only" htmlFor="password">
        Password
    </label>
    <div className="relative">
        <input
            placeholder="Enter your password"
            className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="password"
            type="password"
        />
        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
                stroke="#9ca3af"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
                <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </svg>
        </span>
    </div>
</div>
  )
}

export default PassInput
