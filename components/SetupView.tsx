import React from 'react';
import { DeviceSelector } from './DeviceSelector';
import { type Device } from '../types';
import { DEVICES } from '../constants';

interface SetupViewProps {
  devices: Device[];
  selectedDevice: Device;
  onSelectDevice: (device: Device) => void;
  serviceOrder: string;
  onServiceOrderChange: (value: string) => void;
  onGenerate: () => void;
}

export const SetupView: React.FC<SetupViewProps> = ({
  devices,
  selectedDevice,
  onSelectDevice,
  serviceOrder,
  onServiceOrderChange,
  onGenerate
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Iniciar Nova Verificação</h2>
        <p className="text-slate-500 mb-8">Selecione o dispositivo e insira a Ordem de Serviço (Opcional).</p>

        <div className="space-y-6">
          <div>
            <label htmlFor="service-order" className="block text-sm font-medium text-slate-700 text-left mb-2">
              Ordem de Serviço (OS)
            </label>
            <input
              type="text"
              id="service-order"
              value={serviceOrder}
              onChange={(e) => onServiceOrderChange(e.target.value)}
              placeholder="Ex: 123456"
              className="w-full px-4 py-2 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 text-left mb-2">
              Selecione o Dispositivo
            </label>
            <DeviceSelector
              devices={devices}
              selectedDevice={selectedDevice}
              onSelectDevice={onSelectDevice}
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={onGenerate}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Gerar Checklist
          </button>
        </div>
      </div>
    </div>
  );
};