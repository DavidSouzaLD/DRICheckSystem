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

    let status = 'INCOMPLETO';
    if (totalItems > 0) {
        if (totalChecked === totalItems) {
            status = 'APROVADO';
        } else if (totalChecked > 0) {
            status = 'APROVADO COM RESSALVAS';
        } else {
            status = 'PENDENTE DE VERIFICAÇÃO';
        }
    }

    let report = `*Relatório de Verificação - Doutor iPhone*\n`;
    report += `====================================\n\n`;
    report += `*Dispositivo:* ${selectedDevice}\n`;
    report += `*Ordem de Serviço:* ${serviceOrder || 'N/A'}\n`;
    report += `*Data:* ${date}\n\n`;
    
    report += `*Resumo da Verificação:*\n`;
    report += `*- Status:* ${status}\n`;
    report += `*- Itens Verificados:* ${totalChecked} de ${totalItems}\n\n`;
    
    report += `====================================\n`;
    report += `*Checklist Detalhado:*\n\n`;

    Object.entries(groupedChecklist).forEach(([category, items]) => {
      const checkedCount = items.filter(item => checkedItems[item.id]).length;
      const categoryStatusIcon = checkedCount === items.length ? '✅' : (checkedCount > 0 ? '⚠️' : '❌');
      
      report += `${categoryStatusIcon} *${category}* (${checkedCount}/${items.length})\n`;
      items.forEach(item => {
        const itemStatus = checkedItems[item.id] ? '[OK]' : '[FALHA]';
        report += `  ${itemStatus} ${item.item}\n`;
        if (comments[item.id]) {
          report += `    - _Obs:_ ${comments[item.id].replace(/\n/g, ' ')}\n`;
        }
      });
      report += '\n';
    });
    
    report += `====================================\n`;
    report += `Gerado por Doutor iPhone Check System\n`;

    navigator