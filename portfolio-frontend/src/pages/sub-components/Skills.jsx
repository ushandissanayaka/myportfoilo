import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import LoadingSpinner from '../../components/ui/loading-spinner';
import { API_BASE_URL } from '../../lib/api';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/v1/skill/getall`,
          { withCredentials: true }
        );
        setSkills(data.skills);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMySkills();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <LoadingSpinner className="text-blue-600 dark:text-neutral-50" />
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 px-4 py-16 sm:gap-12 sm:p-8 bg-gray-100 dark:bg-gray-900">
      {/* Centered Header */}
      <div className="flex justify-center items-center w-full">
        <h1 className='flex max-w-full flex-wrap justify-center gap-x-2 gap-y-1 sm:gap-x-4 items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-[3px] sm:tracking-[8px] md:tracking-[15px] mx-auto w-fit px-2 font-extrabold text-center uppercase'>
          My
          <span className='text-tubeLight-effect font-extrabold'>Skills</span>
        </h1>
      </div>

      {/* Skills Grid */}
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'>
        {skills.map((element) => (
          <Card className="min-h-32 p-4 sm:p-7 flex flex-col justify-center items-center gap-3 bg-white dark:bg-gray-800" key={element._id}>
            <img src={element.svg?.url} alt={element.name} className='h-12 sm:h-24 w-auto' />
            <p className='text-sm sm:text-base text-muted dark:text-gray-300 text-center leading-tight'>{element.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Skills;
