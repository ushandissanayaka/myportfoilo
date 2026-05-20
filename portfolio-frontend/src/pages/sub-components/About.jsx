import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../lib/api';

const About = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/v1/user/me/portfoilo`, {
          withCredentials: true
        });
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setError("User data not found in the response.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getMyProfile();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-black">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-black">Error: {error}</div>;
  }

  return (
    <div className='w-full flex flex-col overflow-x-hidden min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-black dark:to-black'>
      {/* Heading Section */}
      <div className='relative'>
        <h1 className='flex gap-2 sm:gap-4 items-center text-[1.75rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-tight md:leading-[67px] lg:leading-[90px] tracking-[2px] sm:tracking-[8px] md:tracking-[15px] mx-auto w-fit font-extrabold px-4'>
          ABOUT
          <span className='text-tubeLight-effect font-extrabold'>ME</span>
        </h1>

        {/* Decorative Line */}
        <div className='absolute w-[80%] sm:w-[70%] md:w-[50%] h-1 left-1/2 transform -translate-x-1/2 top-15 sm:top-12 md:top-14 lg:top-16 bg-slate-200 dark:bg-gray-500'>
          <div className='absolute -left-4 sm:-left-6 top-1/2 transform -translate-y-1/2 flex gap-1'>
            <span className='w-1.5 h-1.5 sm:w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-1.5 h-1.5 sm:w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-1.5 h-1.5 sm:w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
          </div>
          <div className='absolute -right-4 sm:-right-6 top-1/2 transform -translate-y-1/2 flex gap-1'>
            <span className='w-1.5 h-1.5 sm:w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-1.5 h-1.5 sm:w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
            <span className='w-1.5 h-1.5 sm:w-2 h-2 bg-slate-200 dark:bg-gray-500 rounded-full'></span>
          </div>
          <div
            className='absolute w-8 h-1 bg-blue-700 top-0'
            style={{ animation: 'moveLine 3s linear infinite' }}
          ></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className='grid md:grid-cols-2 my-8 sm:my-12 gap-8 sm:gap-14 flex-grow items-center'>

        {/* Image Section — Slides from LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='flex justify-center items-center'
        >
          <img
            src={user.avatar && user.avatar.url}
            alt={user.fullName || "User Avatar"}
            className='bg-white p-2 sm:p-4 h-[260px] sm:h-[360px] md:h-[460px] lg:h-[560px] shadow-xl rounded-2xl'
          />
        </motion.div>

        {/* Text Section — Paragraphs slide from RIGHT with staggered delay */}
        <div className='flex justify-center flex-col tracking-[0.5px] sm:tracking-[1px] text-base sm:text-xl gap-4 sm:gap-5 text-center md:text-left'>
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            I am a Freelancer Web Developer, Mobile App Developer, Web Designer,
            Content Creator, and Editor with a strong foundation in modern web and mobile
            application development. With expertise in both frontend and backend technologies,
            I specialize in building scalable, efficient, and user-friendly applications. My core technical
            skills include Java, Spring Boot, React.js, Node.js, MongoDB, MySQL, and Oracle Database, allowing me to develop complete
            end-to-end solutions across multiple platforms and industries.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            I have hands-on experience working with modern frontend and mobile technologies,
            including React.js for dynamic web applications and React Native for cross-platform mobile app development.
            On the backend, I use Node.js, Express.js, and Spring Boot to build secure, high-performance REST APIs, enterprise-level systems,
            and scalable microservices architectures. I am also experienced with database management and optimization using MongoDB, MySQL, and Oracle Database,
            ensuring reliable and efficient data handling for complex applications.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            In addition to software development, I am proficient in Git and GitHub for version control and collaborative development workflows.
            Currently, I am expanding my knowledge in ASP.NET, Docker, AWS hosting, and Serverless Technologies to strengthen my expertise in cloud-native and scalable application deployment.
            Beyond coding, I actively share my knowledge as a tech blogger on Medium, where I publish tutorials, insights, and best practices related to full-stack development, modern web technologies,
            and software engineering.
          </motion.p>
        </div>
      </div>

      {/* CSS for moving line */}
      <style>{`
        @keyframes moveLine {
          0% { left: 0; }
          50% { left: calc(100% - 2rem); }
          100% { left: 0; }
        }
      `}</style>
    </div>
  );
};

export default About;
