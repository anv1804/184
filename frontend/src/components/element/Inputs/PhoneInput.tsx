import React from 'react'

const PhoneInput = () => {
    return (
        <div>
            <label className="sr-only" htmlFor="phone">
                Phone
            </label>
            <div className="relative">
                <input
                    placeholder="Enter your email"
                    className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="phone"
                    type="number"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={25}
                        height={24}
                        viewBox="0 0 25 24"
                        fill="none"
                    >
                        <path
                            d="M5.5 4H9.5L11.5 9L9 10.5C10.071 12.6715 11.8285 14.429 14 15.5L15.5 13L20.5 15V19C20.5 20.1046 19.6046 21 18.5 21C10.4276 20.5094 3.99056 14.0724 3.5 6C3.5 4.89543 4.39543 4 5.5 4"
                            stroke="#9ca3af"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M5.5 4H9.5L11.5 9L9 10.5C10.071 12.6715 11.8285 14.429 14 15.5L15.5 13L20.5 15V19C20.5 20.1046 19.6046 21 18.5 21C10.4276 20.5094 3.99056 14.0724 3.5 6C3.5 4.89543 4.39543 4 5.5 4"
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

export default PhoneInput
