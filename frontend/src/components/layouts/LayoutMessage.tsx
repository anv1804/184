import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutMessage = () => {
    return (
        <div className='wrapper flex justify-between overflow-hidden w-full'>

            <div className="w-full shadow-lg rounded-lg">
                <div className="grid grid-cols-message-layout bg-white">
                    <div className="flex flex-col max-w-[350px] border-r-2 overflow-y-auto">
                        <div className="border-b-2 py-4 px-2">
                            <input
                                type="text"
                                placeholder="search chatting"
                                className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                            />
                            <div role="tablist" className="tabs tabs-bordered">
                                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 1" />
                                <div role="tabpanel" className="tab-content">
                                    <div className="">
                                        <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                                            <div className="w-1/4">
                                                <img
                                                    src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                                                    className="object-cover h-12 w-12 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="text-lg font-semibold">Luis1994</div>
                                                <span className="text-gray-500">Pick me at 9:00 Am</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row py-4 px-2 items-center border-b-2">
                                            <div className="w-1/4">
                                                <img
                                                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                                                    className="object-cover h-12 w-12 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="text-lg font-semibold">Everest Trip 2021</div>
                                                <span className="text-gray-500">Hi Sam, Welcome</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400">
                                            <div className="w-1/4">
                                                <img
                                                    src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                                                    className="object-cover h-12 w-12 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="text-lg font-semibold">MERN Stack</div>
                                                <span className="text-gray-500">Lusi : Thanks Everyone</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row py-4 px-2 items-center border-b-2">
                                            <div className="w-1/4">
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    className="object-cover h-12 w-12 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="text-lg font-semibold">Javascript Indonesia</div>
                                                <span className="text-gray-500">Evan : some one can fix this</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row py-4 px-2 items-center border-b-2">
                                            <div className="w-1/4">
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    className="object-cover h-12 w-12 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="text-lg font-semibold">Javascript Indonesia</div>
                                                <span className="text-gray-500">Evan : some one can fix this</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row py-4 px-2 items-center border-b-2">
                                            <div className="w-1/4">
                                                <img
                                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                                    className="object-cover h-12 w-12 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className="text-lg font-semibold">Javascript Indonesia</div>
                                                <span className="text-gray-500">Evan : some one can fix this</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <input
                                    type="radio"
                                    name="my_tabs_1"
                                    role="tab"
                                    className="tab"
                                    aria-label="Tab 2"
                                    defaultChecked />
                                <div role="tabpanel" className="tab-content p-10">Tab content 2</div>

                                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 3" />
                                <div role="tabpanel" className="tab-content p-10">Tab content 3</div>
                            </div>
                        </div>

                    </div>
                    <div className="mesage">
                        <Outlet />
                    </div>
                    <div className="max-w-[220px] border-l-2 px-5">
                        <div className="flex flex-col">
                            <div className="font-semibold text-xl py-4">Mern Stack Group</div>
                            <img
                                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                                className="object-cover rounded-xl h-64"
                                alt=""
                            />
                            <div className="font-semibold py-4">Created 22 Sep 2021</div>
                            <div className="font-light">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
                                perspiciatis!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutMessage