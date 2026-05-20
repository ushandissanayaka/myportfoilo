import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
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
        Loading...
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
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900">
      {/* Centered Header */}
      <div className="flex-1 flex justify-center items-center w-full">
        <h1 className='text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[4px] sm:tracking-[15px] dancing_text'>
          My Applications
        </h1>
      </div>

      {/* Apps Grid */}
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {apps.length > 0 ? (
          apps.map((app) => (
            <Card
              className="h-fit p-4 sm:p-7 flex flex-col justify-center items-center gap-3 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
              key={app._id}
            >
              {/* App Icon */}
              <img
                src={app.svg?.url || 'https://via.placeholder.com/100'} // Fallback image if URL is missing
                alt={app.name || 'App Icon'} // Fallback alt text if name is missing
                className='h-12 sm:h-24 w-auto'
              />
              {/* App Name */}
              <p className='text-muted dark:text-gray-300 text-center'>
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
