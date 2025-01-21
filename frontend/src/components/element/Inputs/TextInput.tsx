import React from 'react'

const TextInput = () => {
    return (
        <div className='w-full'>
            <label className="sr-only" htmlFor="name">
                Name
            </label>
            <div className="relative" >
                <input
                    placeholder="Nguyễn Văn A"
                    className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="name"
                    type="text"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={25}
                        height={24}
                        viewBox="0 0 25 24"
                        fill="none"
                    >
                        <circle
                            cx="12.5"
                            cy={7}
                            r={4}
                            stroke="#9ca3af"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle
                            cx="12.5"
                            cy={7}
                            r={4}
                            stroke="white"
                            strokeOpacity="0.2"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6.5 21V19C6.5 16.7909 8.29086 15 10.5 15H14.5C16.7091 15 18.5 16.7909 18.5 19V21"
                            stroke="#9ca3af"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6.5 21V19C6.5 16.7909 8.29086 15 10.5 15H14.5C16.7091 15 18.5 16.7909 18.5 19V21"
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

export default TextInput
