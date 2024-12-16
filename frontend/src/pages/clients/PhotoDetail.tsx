import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../services';

interface PhotoDetailProps {
    avatar: string;
    uploadedAt: string;
}

const PhotoDetail = () => {
    const { id } = useParams();
    const [photoData, setPhotoData] = useState<PhotoDetailProps | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await instance.get(`/api/users/${id}`);
                setPhotoData({
                    avatar: data.avatar,
                    uploadedAt: data.uploadedAt || 'Unknown date',
                });
            } catch (error) {
                console.error("Error fetching photo data:", error);
            }
        })();
    }, [id]);

    return (
        <section className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col items-center">
                <img
                    src={photoData?.avatar}
                    alt="User photo"
                    className="w-full max-w-4xl object-cover rounded-lg mb-6"
                />
                <p className="text-gray-500 text-sm">Uploaded on: {photoData?.uploadedAt}</p>
                <div className="flex items-center justify-around w-full mt-4">
                    <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
                        Like
                    </button>
                    <button className="py-2 px-4 bg-red-500 text-white rounded-lg">
                        Love
                    </button>
                </div>
                <div className="w-full max-w-4xl mt-8">
                    <h3 className="text-lg font-bold mb-4">Comments</h3>
                    <textarea
                        className="w-full border border-gray-300 p-2 rounded-lg mb-4"
                        placeholder="Write a comment..."
                    ></textarea>
                    <button className="py-2 px-4 bg-indigo-500 text-white rounded-lg">
                        Post Comment
                    </button>
                    <div className="mt-4">
                        {/* Display Comments Here */}
                        <p className="text-gray-700">No comments yet.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhotoDetail;
