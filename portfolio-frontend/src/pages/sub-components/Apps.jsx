import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import LoadingSpinner from '../../components/ui/loading-spinner';
import { API_BASE_URL } from '../../lib/api';

const Apps = () => {
  const [apps, setApps] = useState([]); // State to store apps
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch apps from the backend
  useEffect(() => {
    const getMyApps = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/v1/softwareApplication/getall`,
          { withCredentials: true }
        );

        // Check if the response contains the expected data
        if (data.success && data.softwareApplications) {
          setApps(data.softwareApplications); // Set the apps in state
        } else {
          setError("No apps found in the response.");
        }
      } catch (err) {
        console.error("Error fetching apps:", err);
        setError(err.message || "Failed to fetch apps. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    getMyApps(); // Call the function to fetch apps
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <LoadingSpinner className="text-blue-600 dark:text-neutral-50" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 overflow-x-hidden px-4 py-16 sm:gap-12 sm:p-8 bg-gray-100 dark:bg-gray-900">
      {/* Centered Header */}
      <div className="flex justify-center items-center w-full">
  <h1 className='text-center text-[clamp(1.15rem,5.8vw,3rem)] lg:text-5xl leading-tight tracking-normal md:tracking-[6px] font-extrabold uppercase'>
    <span className='text-tubeLight-effect font-extrabold'>Applications</span>
  </h1>
</div>

      {/* Apps Grid */}
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'>
        {apps.length > 0 ? (
          apps.map((app) => (
            <Card
              className="min-h-32 p-4 sm:p-7 flex flex-col justify-center items-center gap-3 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
              key={app._id}
            >
              {/* App Icon */}
              <img
                src={app.svg?.url || 'https://via.placeholder.com/100'} // Fallback image if URL is missing
                alt={app.name || 'App Icon'} // Fallback alt text if name is missing
                className='h-12 sm:h-24 w-auto'
              />
              {/* App Name */}
              <p className='text-sm sm:text-base text-muted dark:text-gray-300 text-center leading-tight'>
                {app.name || 'Unnamed App'}
              </p>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No apps found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Apps;
