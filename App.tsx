import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import { SetupView } from './components/SetupView';
import { ChecklistView } from './components/ChecklistView';
import { generateChecklist } from './services/geminiService';
import { type Device, type Checklist as ChecklistType, ChecklistItemData } from './types';
import { DEVICES } from './constants';

type ViewMode = 'setup' | 'loading' | 'checklist' | 'error';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('setup');
  const [selectedDevice, setSelectedDevice] = useState<Device>('iPhone');
  const [serviceOrder, setServiceOrder] = useState('');
  const [checklist, setChecklist] = useState<ChecklistType>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setViewMode('loading');
    setError(null);
    try {
      const newChecklist = await generateChecklist(selectedDevice);
      if (newChecklist.length === 0) {
        throw new Error("Não foi possível carregar o checklist para este dispositivo.");
      }
      setChecklist(newChecklist);
      setCheckedItems({});
      setComments({});
      setViewMode('checklist');
    } catch (e: any) {
      setError(e.message || "Ocorreu um erro desconhecido.");
      setViewMode('error');
    }
  }, [selectedDevice]);

  const handleGoBack = () => {
    setChecklist([]);
    setServiceOrder('');
    setViewMode('setup');
  };

  const handleToggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCommentChange = (id: string, text: string) => {
    setComments(prev => ({ ...prev, [id]: text }));
  };

  const groupedChecklist: Record<string, ChecklistType> = useMemo(() => {
    return checklist.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {} as Record<string, ChecklistType>);
  }, [checklist]);

  const handleCopy = () => {
    const date = new Date().toLocaleDateString('pt-BR');
    let report = `*Doutor iPhone - Relatório de Verificação*\n\n`;
    report += `*Dispositivo:* ${selectedDevice}\n`;
    report += `*Ordem de Serviço:* ${serviceOrder || 'N/A'}\n`;
    report += `*Data:* ${date}\n`;
    report += `------------------------------------\n\n`;

    Object.entries(groupedChecklist).forEach(([category, items]) => {
      const checkedCount = items.filter(item => checkedItems[item.id]).length;
      report += `*${category}* (${checkedCount}/${items.length})\n`;
      items.forEach(item => {
        report += `${checkedItems[item.id] ? '✅' : '❌'} ${item.item}\n`;
        if (comments[item.id]) {
          report += `   - _Observação:_ ${comments[item.id]}\n`;
        }
      });
      report += '\n';
    });

    navigator.clipboard.writeText(report);
  };
  
  const renderContent = () => {
    switch(viewMode) {
      case 'setup':
        return <SetupView 
                  devices={DEVICES}
                  selectedDevice={selectedDevice}
                  onSelectDevice={setSelectedDevice}
                  serviceOrder={serviceOrder}
                  onServiceOrderChange={setServiceOrder}
                  onGenerate={handleGenerate}
                />;
      case 'loading':
        return <LoadingSpinner />;
      case 'checklist':
        return <ChecklistView 
                  checklist={checklist}
                  checkedItems={checkedItems}
                  comments={comments}
                  onToggleCheck={handleToggleCheck}
                  onCommentChange={handleCommentChange}
                  onCopy={handleCopy}
                  onGoBack={handleGoBack}
                  selectedDevice={selectedDevice}
                  serviceOrder={serviceOrder}
                  groupedChecklist={groupedChecklist}
               />
      case 'error':
        return (
          <div className="text-center text-red-500 bg-red-50 p-8 rounded-xl flex flex-col items-center justify-center h-full space-y-4">
            <h2 className="text-xl font-bold">Erro ao Carregar Checklist</h2>
            <p>{error}</p>
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        );
      default:
        return null;
    }
  }


  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;