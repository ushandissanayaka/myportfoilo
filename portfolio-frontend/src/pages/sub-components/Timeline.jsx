import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../lib/api';

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMyTimeline = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/v1/timeline/getall`,
          { withCredentials: true }
        );
        setTimeline(data.timelines);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMyTimeline();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-16 sm:p-8 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl">
        <h1 className='text-[1.75rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] mb-8 sm:mb-10 font-extrabold text-center'>
          Timeline
        </h1>
        <ol className="relative border-none sm:border-s border-gray-200 dark:border-gray-700">
          {timeline && timeline.map(element => (
            <li className="mb-8 last:mb-0 sm:mb-10 ms-0 sm:ms-6 text-center sm:text-left" key={element._id}>
              <span className="hidden sm:flex absolute items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-4 sm:ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </span>
              <h3 className="mb-1 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                {element.title}
              </h3>
              <time className="block mb-2 text-xs sm:text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {element.timeLine.from} - {element.timeLine.to ? element.timeLine.to : "present"}
              </time>
              <p className="text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400">
                {element.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Timeline;
