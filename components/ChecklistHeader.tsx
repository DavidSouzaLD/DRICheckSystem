import React from 'react';
import { type Device } from '../types';

interface ChecklistHeaderProps {
    device: Device;
    serviceOrder: string;
}

export const ChecklistHeader: React.FC<ChecklistHeaderProps> = ({ device, serviceOrder }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h2 className="text-xl font-bold text-slate-800">
                    Checklist para: <span className="text-green-600">{device}</span>
                </h2>
                {serviceOrder && (
                    <p className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        OS: <span className="font-semibold text-slate-700">{serviceOrder}</span>
                    </p>
                )}
            </div>
        </div>
    );
};