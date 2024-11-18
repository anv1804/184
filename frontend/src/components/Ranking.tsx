import React from 'react'

const Ranking = () => {
    return (
        <div className="bg-white shadow-md rounded-[4px] overflow-hidden max-w-lg mx-auto">
            <div className="bg-gray-100 py-2 px-4">
                <h2 className="text-xl font-semibold text-center text-gray-800 capitalize">Top Điểm Tháng</h2>
            </div>
            <ul className="divide-y divide-gray-200">
                <li className="flex items-center py-4 px-3">
                    <span className="text-gray-700 text-lg font-medium mr-4 rounded-full">1.</span>
                    <img
                        className="w-8 h-8 rounded-full object-cover mr-4"
                        src="https://randomuser.me/api/portraits/women/72.jpg"
                        alt="User avatar"
                    />
                    <div className="flex-1">
                        <h3 className="text-md font-medium text-gray-800">Emily Jones</h3>
                        <p className="text-gray-600 text-sm">1234 points</p>
                    </div>
                </li>
                <li className="flex items-center py-4 px-3">
                    <span className="text-gray-700 text-lg font-medium mr-4">2.</span>
                    <img
                        className="w-8 h-8 rounded-full object-cover mr-4"
                        src="https://randomuser.me/api/portraits/men/40.jpg"
                        alt="User avatar"
                    />
                    <div className="flex-1">
                        <h3 className="text-md font-medium text-gray-800">David Lee</h3>
                        <p className="text-gray-600 text-sm">987 points</p>
                    </div>
                </li>
                <li className="flex items-center py-4 px-3">
                    <span className="text-gray-700 text-lg font-medium mr-4">3.</span>
                    <img
                        className="w-8 h-8 rounded-full object-cover mr-4"
                        src="https://randomuser.me/api/portraits/women/54.jpg"
                        alt="User avatar"
                    />
                    <div className="flex-1">
                        <h3 className="text-md font-medium text-gray-800">Sophia Williams</h3>
                        <p className="text-gray-600 text-sm">876 points</p>
                    </div>
                </li>
                <li className="flex items-center py-4 px-3">
                    <span className="text-gray-700 text-lg font-medium mr-4">4.</span>
                    <img
                        className="w-8 h-8 rounded-full object-cover mr-4"
                        src="https://randomuser.me/api/portraits/men/83.jpg"
                        alt="User avatar"
                    />
                    <div className="flex-1">
                        <h3 className="text-md font-medium text-gray-800">Michael Chen</h3>
                        <p className="text-gray-600 text-sm">765 points</p>
                    </div>
                </li>
                <li className="flex items-center py-4 px-3">
                    <span className="text-gray-700 text-lg font-medium mr-4">5.</span>
                    <img
                        className="w-8 h-8 rounded-full object-cover mr-4"
                        src="https://randomuser.me/api/portraits/women/17.jpg"
                        alt="User avatar"
                    />
                    <div className="flex-1">
                        <h3 className="text-md font-medium text-gray-800">Mia Davis</h3>
                        <p className="text-gray-600 text-sm">654 points</p>
                    </div>
                </li>
            </ul>
        </div>

    )
}

export default Ranking