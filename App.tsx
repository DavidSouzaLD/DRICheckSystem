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
    const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const totalItems = checklist.length;
    const totalChecked = Object.values(checkedItems).filter(Boolean).length;
    const totalFailed = totalItems - totalChecked;

    let status = 'PENDENTE';
    if (totalItems > 0) {
        if (totalChecked === totalItems) {
            status = 'APROVADO';
        } else if (totalChecked > 0) {
            status = 'APROVADO COM RESSALVAS';
        } else {
            status = 'PENDENTE DE VERIFICAÇÃO';
        }
    }

    let report = `*Relatório de Verificação - Doutor iPhone*\n\n`;
    report += `*Dispositivo:* ${selectedDevice}\n`;
    report += `*Ordem de Serviço:* ${serviceOrder || 'N/A'}\n`;
    report += `*Data:* ${date}\n\n`;

    report += `*STATUS GERAL: ${status}*\n\n`;
    report += `*Resumo da Análise:*\n`;
    report += `  • Itens Aprovados: ${totalChecked} de ${totalItems}\n`;
    if (totalFailed > 0 && status !== 'PENDENTE DE VERIFICAÇÃO') {
      report += `  • Itens com Falha: ${totalFailed}\n`;
    }
    report += `\n`;

    report += `*Checklist Detalhado:*\n`;
    report += `---------------------------------------\n`;

    Object.entries(groupedChecklist).forEach(([category, items]) => {
      report += `\n*_${category}_*\n`;
      items.forEach(item => {
        const itemStatus = checkedItems[item.id] ? '✅' : '❌';
        report += `${itemStatus} ${item.item}\n`;
        if (comments[item.id]) {
          report += `    Obs: ${comments[item.id].replace(/\n/g, ' ')}\n`;
        }
      });
    });
    
    report += `\n---------------------------------------\n`;
    report += `Gerado pelo Doutor iPhone Check System.`;

    navigator.clipboard.writeText(report).catch(err => {
        console.error('Falha ao copiar relatório: ', err);
    });
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'loading':
        return <LoadingSpinner />;
      case 'error':
        return (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
            <p className="font-bold">Ocorreu um erro</p>
            <p>{error}</p>
            <button
              onClick={handleGoBack}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Tentar Novamente
            </button>
          </div>
        );
      case 'checklist':
        return (
          <ChecklistView
            checklist={checklist}
            checkedItems={checkedItems}
            comments={comments}
            groupedChecklist={groupedChecklist}
            onToggleCheck={handleToggleCheck}
            onCommentChange={handleCommentChange}
            onCopy={handleCopy}
            onGoBack={handleGoBack}
            selectedDevice={selectedDevice}
            serviceOrder={serviceOrder}
          />
        );
      case 'setup':
      default:
        return (
          <SetupView
            devices={DEVICES}
            selectedDevice={selectedDevice}
            onSelectDevice={setSelectedDevice}
            serviceOrder={serviceOrder}
            onServiceOrderChange={setServiceOrder}
            onGenerate={handleGenerate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
