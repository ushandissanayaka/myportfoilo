import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/skill/getall`,
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
    return <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-900">
      {/* Centered Header */}
      <div className="flex-1 flex justify-center items-center w-full">
        <h1 className='text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[4px] sm:tracking-[15px] dancing_text'>
          Skills
        </h1>
      </div>

      {/* Skills Grid */}
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {skills.map((element) => (
          <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3 bg-white dark:bg-gray-800" key={element._id}>
            <img src={element.svg?.url} alt={element.name} className='h-12 sm:h-24 w-auto' />
            <p className='text-muted dark:text-gray-300'>{element.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Skills;
