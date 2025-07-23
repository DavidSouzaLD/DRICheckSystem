import React, { useState, useMemo, useEffect } from 'react';
import { type Checklist as ChecklistType, type ChecklistItemData } from '../types';
import { ChecklistItem } from './ChecklistItem';

interface ChecklistProps {
  checklist: ChecklistType;
}

export const Checklist: React.FC<ChecklistProps> = ({ checklist }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  const groupedChecklist: Record<string, ChecklistType> = useMemo(() => {
    return checklist.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {} as Record<string, ChecklistType>);
  }, [checklist]);

  useEffect(() => {
    // Reset states when checklist changes
    setCheckedItems({});
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


  const handleToggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
                    onToggleCheck={() => handleToggleCheck(item.id)}
                    isVisible={visibleItems.has(item.id)}
                    />
                ))}
                </div>
            </div>
         );
      })}
    </div>
  );
};