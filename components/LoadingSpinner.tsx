import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full py-16">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Carregando checklist...</p>
      </div>
    </div>
  );
};