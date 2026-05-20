import React from 'react';

const Footer = () => {
  return (
    <footer className='p-5 w-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800'>
      <div className='max-w-[1050px] mx-auto'>
        <hr className='border-gray-300 dark:border-gray-600' />
        {/* Centered Heading */}
        <div className='flex items-center justify-center mt-5'>
          <h1 className='text-2xl sm:text-3xl text-center tracking-[8px] text-tubelight-effect'>
            Thanks For Scrolling
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;