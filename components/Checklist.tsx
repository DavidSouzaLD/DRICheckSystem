import React, { useState, useEffect } from 'react';
import { type Checklist as ChecklistType, type ChecklistItemData } from '../types';
import { ChecklistItem } from './ChecklistItem';

interface ChecklistProps {
  groupedChecklist: Record<string, ChecklistType>;
  checkedItems: Record<string, boolean>;
  comments: Record<string, string>;
  onToggleCheck: (id: string) => void;
  onCommentChange: (id: string, text: string) => void;
}

export const Checklist: React.FC<ChecklistProps> = ({
  groupedChecklist,
  checkedItems,
  comments,
  onToggleCheck,
  onCommentChange
}) => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    setVisibleItems(new Set<string>());

    let delay = 0;
    const allItems = Object.values(groupedChecklist).flat();
    const timers = allItems.map((item) => {
      delay += 50; // Stagger animation
      return setTimeout(() => {
        setVisibleItems(prev => new Set(prev).add(item.id));
      }, delay);
    });

    return () => timers.forEach(clearTimeout);
  }, [groupedChecklist]);


  const getCategoryProgress = (categoryItems: ChecklistItemData[]) => {
      if (categoryItems.length === 0) return 0;
      const checkedCount = categoryItems.filter(item => checkedItems[item.id]).length;
      return (checkedCount / categoryItems.length) * 100;
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedChecklist).map(([category, items]) => {
         const progress = getCategoryProgress(items);
         return (
            <div key={category}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-700">{category}</h2>
                    <span className="text-sm font-medium text-slate-500">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mb-4">
                    <div className="bg-green-600 h-1.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="space-y-3">
                {items.map((item) => (
                    <ChecklistItem
                      key={item.id}
                      item={item}
                      isChecked={!!checkedItems[item.id]}
                      onToggleCheck={() => onToggleCheck(item.id)}
                      isVisible={visibleItems.has(item.id)}
                      comment={comments[item.id] || ''}
                      onCommentChange={onCommentChange}
                    />
                ))}
                </div>
            </div>
         );
      })}
    </div>
  );
};