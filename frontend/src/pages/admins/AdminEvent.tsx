import React, { useEffect, useState } from 'react';
import { getAllEvent } from '../../services/admin/adminEventService';
import IconEyes from '../../components/icons/IconEyes';
import IconHeart from '../../components/icons/IconHeart';
import IconComment from '../../components/icons/IconComment';
import IconShare from '../../components/icons/IconShare';
import { Link } from 'react-router-dom';
import { Spin } from 'antd'; // Import Ant Design's Spin component for loading

const AdminEvent = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>(''); // State for search input
  const [filterStatus, setFilterStatus] = useState<string>(''); // State for filter
  const [sortOrder, setSortOrder] = useState<string>('asc'); // State for sort order
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  const [itemsPerPage, setItemsPerPage] = useState<number>(2); // State for items per page

  useEffect(() => {
    const loadEvent = async () => {
      setLoading(true); // Set loading to true before API call
      try {
        const data = await getAllEvent();
        setEvents(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    loadEvent();
  }, []);

  // Filter and sort events
  const filteredAndSortedEvents = events
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = filterStatus ? event.status === filterStatus : true;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.view - b.view;
      } else {
        return b.view - a.view;
      }
    });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedEvents.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAndSortedEvents.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="items-center w-full bg-white rounded-lg px-4 py-2">
        <div className="mx-auto">
          <div className="flex justify-between w-full py-2 items-center">
            <div className="text-xl font-bold">Danh sách sự kiện</div>
            <button className="py-2 px-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">
              Viết bài
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:justify-between w-full mb-2 mt-4 items-center">
            <div className="flex bg-gray-100 w-full sm:w-2/5 items-center rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mx-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                className="w-full bg-gray-100 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-sm"
                type="text"
                placeholder="Search events..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} // Update search text
              />
            </div>
            <div className="flex-row space-x-2 items-center">
              <select
                className="border border-gray-300 rounded-md text-gray-600 px-2 pl-2 pr-8 bg-white hover:border-gray-400 focus:outline-none text-xs focus:ring-0"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)} // Update filter status
              >
                <option value="">All Status</option>
                <option value="edit">Edit</option>
                <option value="publish">Publish</option>
                <option value="hidden">Hidden</option>
              </select>
              <select
                className="border border-gray-300 rounded-md text-gray-600 px-2 pl-2 pr-8 bg-white hover:border-gray-400 focus:outline-none text-xs focus:ring-0"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)} // Update sort order
              >
                <option value="asc">Sort by Views: Ascending</option>
                <option value="desc">Sort by Views: Descending</option>
              </select>
            </div>
          </div>
          <div className="mt-6 overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Spin size="large" /> {/* Display loading spinner */}
              </div>
            ) : (
              <table className="w-full table-auto">
                <thead className="">
                  <tr className="text-sm font-semibold text-center border-b-2 border-blue-500 uppercase">
                    <th className="px-2 py-3">STT</th>
                    <th className="px-4 py-3">Sự Kiện</th>
                    <th className="px-2 py-3">Lượt Xem</th>
                    <th className="px-2 py-3">Dữ liệu</th>
                    <th className="px-4 py-3">xuất bản</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3">thao tác</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal text-gray-700 text-center">
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={index} className="py-10 bg-gray-100 hover:bg-gray-200 font-medium">
                        <td className="px-2 py-4">{indexOfFirstItem + index + 1}</td>
                        <td className="px-4 py-4">
                          <Link to={`/su-kien/${item?._id}`}>{item?.title}</Link>
                        </td>
                        <td className="px-2 py-4">
                          <div className="font-medium flex items-center justify-center gap-1">
                            <span className='text-blue-600 '>{item?.view}</span>
                            <IconEyes s={15} />
                          </div>
                        </td>
                        <td className="items-center px-2 py-4">
                          <div className="flex flex-col">
                            <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
                              <div className="like flex items-center justify-center gap-1">
                                <span className=''>{item?.like?.countLike}</span>
                                <IconHeart s={15} />
                              </div>
                              <div className="comment flex items-center justify-center gap-1">
                                <span className=''>{item?.comment?.countComment}</span>
                                <IconComment s={12.5} />
                              </div>
                              <div className="share flex items-center justify-center gap-1">
                                <span className=''>{item?.share?.countShare}</span>
                                <IconShare s={15} />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="items-center px-4 py-4">
                          <div className="flex flex-col">
                            <div className="font-medium ">{item?.formattedDate}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">{item?.status === "edit"
                          ? <span className='bg-yellow-500 px-4 py-1 rounded-full'>Edit</span>
                          : (item?.status === "publish"
                            ? <span className='bg-blue-400 text-white px-4 py-1 rounded-full'>Publish</span>
                            : <span className='bg-red-500 px-4 py-1 rounded-full'>Hidden</span>)}</td>
                        <td className="px-4 py-4">
                          <div className="flex-col lg:flex-row lg:space-x-2 items-center space-y-2 lg:space-y-0">
                            <button className="items-center px-2 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button className="items-center px-2 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-4">Không tìm thấy sự kiện nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div className="flex flex-col items-center w-full px-4 py-4 text-sm text-gray-500 justify-center mx-auto">
            <div className="flex items-center justify-between space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="hover:text-gray-600"
              >
                Previous
              </button>
              <div className="flex flex-row space-x-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-2 py-px ${currentPage === i + 1 ? 'text-white bg-blue-400' : 'border border-blue-400 hover:bg-blue-400 hover:text-white'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="hover:text-gray-600"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminEvent;