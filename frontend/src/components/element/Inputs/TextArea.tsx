import React from 'react'

const TextArea = () => {
    return (
        <div className='w-full'>
            <label className="sr-only" htmlFor="name">
                Name
            </label>
            <div className="relative" >
                <textarea
                    placeholder="Mô tả..."
                    className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="name">

                </textarea>
            </div>
        </div>
    )
}

export default TextArea
