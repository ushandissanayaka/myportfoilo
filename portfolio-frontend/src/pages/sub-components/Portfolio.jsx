import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/project/getall`, {
          withCredentials: true,
        });
        if (data.success && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          setError("No projects found in the response.");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getMyProjects();
  }, []);

  // Defensive check to ensure projects is always an array
  const safeProjects = Array.isArray(projects) ? projects : [];
  const displayedProjects = viewAll ? safeProjects : safeProjects.slice(0, 6);

  if (loading) {
    return (
      <div className='w-full flex justify-center items-center py-20'>
        <p className='text-gray-500 animate-pulse'>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full flex justify-center items-center py-20'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col overflow-x-hidden min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800'>

      {/* Heading Section */}
      <div className='relative'>
        <h1 className='flex gap-4 items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[4px] sm:tracking-[15px] mx-auto w-fit font-extrabold'>
          MY
          <span className='text-tubeLight-effect font-extrabold'>PROJECTS</span>
        </h1>

        {/* Decorative line */}
        <div className='absolute w-[90%] sm:w-[70%] md:w-[50%] h-1 left-1/2 transform -translate-x-1/2 top-15 sm:top-12 md:top-14 lg:top-16 bg-slate-200 dark:bg-gray-500'>
          <div className='absolute -left-4 sm:-left-6 top-1/2 transform -translate-y-1/2 flex gap-1'>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
          </div>
          <div className='absolute -right-4 sm:-right-6 top-1/2 transform -translate-y-1/2 flex gap-1'>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
          </div>
          <div
            className='absolute w-8 h-1 bg-blue-800 top-0'
            style={{ animation: 'moveLine 3s linear infinite' }}
          ></div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 sm:mt-10 gap-6'>
        {displayedProjects.map((project) => (
          <CardContainer key={project._id} containerClassName="py-6 px-2 h-full">
            <CardBody className="bg-gray-50 dark:bg-gray-900 relative group/card border border-gray-200 dark:border-white/[0.2] hover:border-blue-400 dark:hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] w-full h-full flex flex-col rounded-xl p-5 transition-all duration-300">
              
              <div className="flex-grow">
                {/* Project Title */}
                <CardItem
                  translateZ="50"
                  className="text-base sm:text-xl font-bold text-gray-800 dark:text-white"
                >
                  {project.title || "Untitled Project"}
                </CardItem>

                {/* Project Description */}
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-gray-500 dark:text-neutral-300 text-xs sm:text-sm mt-2 line-clamp-2 h-10 overflow-hidden"
                >
                  {project.description || "Click to view project details."}
                </CardItem>

                {/* Project Banner Image */}
                <CardItem
                  translateZ="100"
                  className="w-full mt-4"
                >
                  <img
                    src={project.projectBanner?.url || "/placeholder.png"}
                    alt={project.title || "Project Banner"}
                    className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl group-hover/card:brightness-110 transition-all duration-300"
                  />
                </CardItem>
              </div>

              {/* Footer — Stack Tags + View Button */}
              <div className="flex justify-between items-center mt-5 pt-2 border-t border-gray-100 dark:border-gray-800">
                <CardItem
                  translateZ={20}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest"
                >
                  {typeof project.technologies === 'string'
                    ? project.technologies.split(',').slice(0, 2).join(' · ')
                    : 'Web Project'}
                </CardItem>

                <CardItem translateZ={20}>
                  <Link to={`/project/${project._id}`}>
                    <button className="px-4 py-2 rounded-xl !bg-blue-600 dark:!bg-blue-500 text-white text-xs font-bold hover:!bg-blue-700 dark:hover:!bg-blue-600 transition-all shadow-md hover:shadow-blue-500/50">
                      View →
                    </button>
                  </Link>
                </CardItem>
              </div>

            </CardBody>
          </CardContainer>
        ))}
      </div>

      {/* View All / Show Less Button */}
      {safeProjects.length > 6 && (
        <div className='w-full text-center mt-4 sm:mt-6'>
          <Button
            className="w-40 sm:w-52 !bg-blue-600 dark:!bg-blue-500 text-white hover:!bg-blue-700 dark:hover:!bg-blue-600 shadow-lg shadow-blue-500/20 transition-all duration-300"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}

      {/* Moving line animation */}
      <style>{`
        @keyframes moveLine {
          0%   { left: 0; }
          50%  { left: calc(100% - 2rem); }
          100% { left: 0; }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
