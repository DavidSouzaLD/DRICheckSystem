import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { DeviceSelector } from './components/DeviceSelector';
import { Checklist } from './components/Checklist';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import { generateChecklist } from './services/geminiService';
import { type Device, type Checklist as ChecklistType } from './types';
import { DEVICES } from './constants';

const App: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device>('iPhone');
  const [checklist, setChecklist] = useState<ChecklistType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchChecklist = useCallback(async (device: Device) => {
    setIsLoading(true);
    setChecklist([]);
    
    const newChecklist = await generateChecklist(device);
    setChecklist(newChecklist);
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchChecklist(selectedDevice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDevice]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <DeviceSelector
            devices={DEVICES}
            selectedDevice={selectedDevice}
            onSelectDevice={setSelectedDevice}
          />

          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8 min-h-[400px]">
            {isLoading && <LoadingSpinner />}
            {!isLoading && checklist.length > 0 && (
              <Checklist checklist={checklist} />
            )}
             {!isLoading && checklist.length === 0 && (
                 <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full">
                    <p>Selecione um dispositivo para começar.</p>
                </div>
             )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;