import React from 'react';
import { cn } from '@/lib/utils';

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-4',
  lg: 'h-12 w-12 border-4',
};

const LoadingSpinner = ({ className, label = 'Loading...', size = 'md' }) => {
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]',
        sizeClasses[size],
        className
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        {label}
      </span>
    </div>
  );
};

export default LoadingSpinner;
