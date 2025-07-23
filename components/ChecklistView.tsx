import React from 'react';
import { Checklist } from './Checklist';
import { ChecklistHeader } from './ChecklistHeader';
import { ChecklistActions } from './ChecklistActions';
import { type Device, type Checklist as ChecklistType } from '../types';

interface ChecklistViewProps {
  checklist: ChecklistType;
  checkedItems: Record<string, boolean>;
  comments: Record<string, string>;
  groupedChecklist: Record<string, ChecklistType>;
  onToggleCheck: (id: string) => void;
  onCommentChange: (id: string, text: string) => void;
  onCopy: () => void;
  onGoBack: () => void;
  selectedDevice: Device;
  serviceOrder: string;
}

export const ChecklistView: React.FC<ChecklistViewProps> = (props) => {
  return (
    <div className="max-w-4xl mx-auto">
      <ChecklistHeader device={props.selectedDevice} serviceOrder={props.serviceOrder} />
      <div className="mt-4 bg-white rounded-xl shadow-lg p-6 md:p-8">
        <Checklist
          groupedChecklist={props.groupedChecklist}
          checkedItems={props.checkedItems}
          comments={props.comments}
          onToggleCheck={props.onToggleCheck}
          onCommentChange={props.onCommentChange}
        />
      </div>
      <ChecklistActions onCopy={props.onCopy} onGoBack={props.onGoBack} />
    </div>
  );
};