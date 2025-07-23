import React, { useState } from 'react';
import { type ChecklistItemData } from '../types';

interface ChecklistItemProps {
  item: ChecklistItemData;
  isChecked: boolean;
  onToggleCheck: () => void;
  isVisible: boolean;
  comment: string;
  onCommentChange: (id: string, text: string) => void;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, isChecked, onToggleCheck, isVisible, comment, onCommentChange }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <div
      className={`
        transform transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <div className="bg-slate-100 rounded-lg">
        <div className="flex items-start p-4">
          <label className="flex items-center cursor-pointer flex-grow">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={onToggleCheck}
                className="sr-only" // Hide default checkbox
              />
              <div
                className={`
                  w-6 h-6 rounded-md border-2 flex-shrink-0
                  flex items-center justify-center
                  transition-all duration-300 ease-in-out mt-1
                  ${isChecked ? 'bg-green-600 border-green-600' : 'bg-white border-slate-300'}
                `}
              >
                {/* Animated Checkmark */}
                <svg
                  className={`w-4 h-4 text-white transition-transform duration-300 ease-in-out ${isChecked ? 'scale-100' : 'scale-0'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span
              className={`
                ml-4 text-slate-700 transition-all duration-300 ease-in-out
                ${isChecked ? 'line-through text-slate-400' : ''}
              `}
            >
              {item.item}
            </span>
          </label>
          <button
            onClick={() => setIsCommentOpen(p => !p)}
            className="ml-4 p-1 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors flex-shrink-0"
            aria-label={isCommentOpen ? "Fechar observação" : "Adicionar observação"}
          >
            {isCommentOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        {isCommentOpen && (
          <div className="px-4 pb-4 pl-14">
            <textarea
              value={comment}
              onChange={(e) => onCommentChange(item.id, e.target.value)}
              placeholder="Adicionar observação..."
              className="w-full p-2 text-sm border-slate-300 rounded-md focus:ring-green-500 focus:border-green-500 transition"
              rows={2}
            />
          </div>
        )}
      </div>
    </div>
  );
};