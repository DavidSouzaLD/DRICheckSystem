import React from 'react';
import { type ChecklistItemData } from '../types';

interface ChecklistItemProps {
  item: ChecklistItemData;
  isChecked: boolean;
  onToggleCheck: () => void;
  isVisible: boolean;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, isChecked, onToggleCheck, isVisible }) => {
  return (
    <div
      className={`
        transform transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <label
        className="flex items-center p-4 rounded-lg cursor-pointer transition-colors duration-200 border-2 border-transparent bg-slate-100 hover:border-green-300"
      >
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
              transition-all duration-300 ease-in-out
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
    </div>
  );
};
