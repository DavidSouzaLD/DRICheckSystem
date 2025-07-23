import React from 'react';
import { type Device } from '../types';

interface DeviceSelectorProps {
  devices: Device[];
  selectedDevice: Device;
  onSelectDevice: (device: Device) => void;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({ devices, selectedDevice, onSelectDevice }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-2 flex flex-wrap justify-center gap-2">
      {devices.map((device) => {
        const isSelected = device === selectedDevice;
        return (
          <button
            key={device}
            onClick={() => onSelectDevice(device)}
            className={`
              px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
              ${isSelected
                ? 'bg-green-600 text-white shadow'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }
            `}
          >
            {device}
          </button>
        );
      })}
    </div>
  );
};
