import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 px-4">
      <p className="text-sm text-slate-500">
        Powered by Gemini AI. Doutor iPhone Check System &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};
