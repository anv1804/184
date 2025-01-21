import React from 'react'

const EmailInput = () => {
    return (
        <div>
            <label className="sr-only" htmlFor="email">
                Email
            </label>
            <div className="relative">
                <input
                    placeholder="an@gmail.com"
                    className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="email"
                    type="email"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={25}
                        height={24}
                        viewBox="0 0 25 24"
                        fill="none"
                    >
                        <rect
                            x="3.5"
                            y={5}
                            width={18}
                            height={14}
                            rx={2}
                            stroke="#9ca3af"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <rect
                            x="3.5"
                            y={5}
                            width={18}
                            height={14}
                            rx={2}
                            stroke="white"
                            strokeOpacity="0.2"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.5 7L12.5 13L21.5 7"
                            stroke="#9ca3af"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.5 7L12.5 13L21.5 7"
                            stroke="white"
                            strokeOpacity="0.2"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                </span>
            </div>
        </div>
    )
}

export default EmailInput
