import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/ui/loading-spinner';
import { API_BASE_URL } from '../lib/api';

const ProjectsView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState([]); // Initialize as an array
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState(false); // Initialize as boolean
  const [projectBanner, setProjectBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const normalizeList = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      return value.split(',').map((item) => item.trim()).filter(Boolean);
    }
    return [];
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/project/get/${id}`, {
          withCredentials: true,
        });
        const project = res.data.project;
        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setTechnologies(normalizeList(project.technologies));
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBanner(project.projectBanner?.url || null);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch project details");
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <LoadingSpinner className="text-blue-600 dark:text-neutral-50" />
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-10 sm:py-20 flex flex-col items-center'>
      {/* Main Content Wrapper */}
      <div className='w-full max-w-[95%] sm:max-w-3xl lg:max-w-6xl mx-auto'>
        {/* Heading Section */}
        <div className='relative flex w-full flex-col items-center overflow-visible text-center mb-12 sm:mb-16'>
          <h1 className='flex max-w-full flex-wrap justify-center gap-x-2 gap-y-1 sm:gap-x-4 items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-[3px] sm:tracking-[8px] md:tracking-[15px] mx-auto w-fit px-2 font-extrabold'>
            PROJECT
            <span className='text-tubeLight-effect font-extrabold'>DETAILS</span>
          </h1>

          {/* Centered Decorative Line */}
          <div className='mt-3 sm:mt-4 flex w-full justify-center'>
            <div className='relative w-[90%] sm:w-[60%] md:w-[40%] h-1 bg-slate-200 dark:bg-gray-500'>
              {/* Dots on the left side */}
              <div className='absolute -left-6 top-1/2 transform -translate-y-1/2 flex gap-1'>
                <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
                <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
              </div>

              {/* Dots on the right side */}
              <div className='absolute -right-6 top-1/2 transform -translate-y-1/2 flex gap-1'>
                <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
                <span className='w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
              </div>

              {/* Moving highlight */}
              <div
                className='absolute w-8 h-1 bg-blue-800 top-0 animate-move-line'
                style={{ animation: 'moveLine 3s linear infinite' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Project Details Card */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-8 md:p-12 lg:p-16 mx-auto'>
          {projectBanner && (
            <div className='mb-10 overflow-hidden rounded-xl'>
              <img
                src={projectBanner}
                alt="Project Banner"
                className='w-full h-auto object-cover max-h-[500px]'
              />
            </div>
          )}
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-6 md:col-span-2'>
              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2'>Project Title</label>
                <input
                  type="text"
                  value={title}
                  readOnly
                  className='w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-medium text-lg'
                />
              </div>
              
              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2'>Description</label>
                <textarea
                  value={description}
                  readOnly
                  className='w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white h-48 leading-relaxed'
                />
              </div>
            </div>

            <div className='space-y-6'>
              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2'>GitHub Repository</label>
                <a
                  href={gitRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='truncate px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-blue-600 dark:text-blue-400 block hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors'
                >
                  {gitRepoLink || "Not Available"}
                </a>
              </div>
              
              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2'>Live Preview</label>
                <a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='truncate px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-blue-600 dark:text-blue-400 block hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors'
                >
                  {projectLink || "Not Deployed"}
                </a>
              </div>
            </div>

            <div className='space-y-6'>
              <div>
                <label className='block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2'>Technologies Used</label>
                <div className='flex w-full max-w-full flex-wrap items-start gap-2 overflow-hidden px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 min-h-[50px]'>
                  {technologies.length > 0 ? (
                    technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className='max-w-full break-words rounded-full bg-blue-100 px-3 py-1 text-xs sm:text-sm font-medium leading-snug text-blue-800 dark:bg-blue-900/40 dark:text-blue-200'
                      >
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className='text-sm text-gray-500 dark:text-gray-400'>Not Available</span>
                  )}
                </div>
              </div>
              
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2'>Stack</label>
                  <div className='px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-medium'>
                    {stack}
                  </div>
                </div>
                <div>
                  <label className='block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2'>Status</label>
                  <div className='px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-medium'>
                    {deployed ? "✅ Deployed" : "🚧 In Progress"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for the moving line animation */}
      <style>
        {`
          @keyframes moveLine {
            0% {
              left: 0;
            }
            50% {
              left: calc(100% - 2rem); /* Adjust based on the width of the line */
            }
            100% {
              left: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProjectsView;
