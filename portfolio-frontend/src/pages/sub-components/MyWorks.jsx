import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { API_BASE_URL } from '../../lib/api';

const MyWorks = () => {
  const [myWorks, setMyWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyWorks = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/v1/myWorks/getall`,
          { withCredentials: true }
        );
        setMyWorks(data.myWorks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyWorks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="w-full max-w-4xl p-4">
        <h1 className="flex max-w-full flex-wrap justify-center gap-x-2 gap-y-1 sm:gap-x-4 items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-[3px] sm:tracking-[8px] md:tracking-[15px] mx-auto mb-12 w-fit px-2 font-extrabold text-center uppercase text-gray-900 dark:text-white">
          My
          <span className="text-tubeLight-effect font-extrabold">Works</span>
        </h1>

        <ol className="relative border-none sm:border-s border-gray-200 dark:border-gray-700">
          {myWorks && myWorks.length > 0 ? (
            myWorks.map((element, index) => (
              <li className="mb-16 ms-0 sm:ms-6 text-center sm:text-left" key={index}>
                {/* Timeline dot */}
                <span className="hidden sm:flex absolute items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-4 sm:ring-8 ring-white dark:ring-black dark:bg-blue-900">
                  <svg
                    className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>

                {/* Title */}
                <h3 className="mb-1 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {element.title}
                </h3>

                {/* Date range */}
                {element.timeLine && (
                  <time className="block mb-2 text-xs sm:text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {element.timeLine.from} -{' '}
                    {element.timeLine.to ? element.timeLine.to : 'present'}
                  </time>
                )}

                {/* Animated description via GSAP ScrollReveal */}
                <ScrollReveal
                  baseOpacity={0.1}
                  enableBlur={true}
                  baseRotation={3}
                  blurStrength={4}
                  textClassName="text-gray-500 dark:text-gray-400 !text-[clamp(0.9rem,2vw,1.1rem)] !font-normal text-center sm:text-left"
                >
                  {element.description}
                </ScrollReveal>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500 dark:text-gray-400">
              No works found. Add them from the dashboard!
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

export default MyWorks;

