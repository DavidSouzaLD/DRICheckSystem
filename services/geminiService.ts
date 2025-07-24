import { type Checklist, type ChecklistItemData, type Device } from '../types';

type StaticChecklist = Omit<ChecklistItemData, 'id'>[];

const STATIC_CHECKLISTS: Record<Device, StaticChecklist> = {
  iPhone: [
    { category: 'Verificação Inicial', item: 'Inspeção visual (carcaça, tela, câmeras)' },
    { category: 'Verificação Inicial', item: 'Botões físicos (Volume, Silenciar, Power)' },

    { category: 'Tela e Touch', item: 'Display (pixels mortos, manchas, burn-in)' },
    { category: 'Tela e Touch', item: 'Resposta ao Toque (gestos, arrastar ícone)' },
    { category: 'Tela e Touch', item: '3D Touch / Haptic Touch' },
    { category: 'Tela e Touch', item: 'Brilho (manual e automático) e True Tone' },
    
    { category: 'Sensores e Autenticação', item: 'Face ID / Touch ID' },
    { category: 'Sensores e Autenticação', item: 'Sensor de Proximidade' },
    { category: 'Sensores e Autenticação', item: 'Giroscópio e Acelerômetro' },
    { category: 'Sensores e Autenticação', item: 'Barômetro e Bússola' },
    
    { category: 'Áudio e Vibração', item: 'Alto-falante auricular (chamadas)' },
    { category: 'Áudio e Vibração', item: 'Alto-falantes estéreo (mídia / viva-voz)' },
    { category: 'Áudio e Vibração', item: 'Microfones (frontal, traseiro, inferior)' },
    { category: 'Áudio e Vibração', item: 'Vibração (Taptic Engine)' },

    { category: 'Conectividade', item: 'Sinal de Operadora (Torre de Chip)' },
    { category: 'Conectividade', item: 'Chamada de teste (Ligação via Chip)' },
    { category: 'Conectividade', item: 'Wi-Fi e Bluetooth' },
    { category: 'Conectividade', item: 'GPS / Localização' },
    { category: 'Conectividade', item: 'NFC (Pagamentos)' },
    
    { category: 'Câmeras', item: 'Câmera Traseira (todas as lentes)' },
    { category: 'Câmeras', item: 'Câmera Frontal (TrueDepth)' },
    { category: 'Câmeras', item: 'Foco, Estabilização e Modos (Retrato, etc)' },
    { category: 'Câmeras', item: 'Flash LED' },
    { category: 'Câmeras', item: 'Gravação de Vídeo (com áudio)' },
    
    { category: 'Bateria e Carregamento', item: 'Saúde da Bateria (nas Configurações)' },
    { category: 'Bateria e Carregamento', item: 'Carregamento com Fio' },
    { category: 'Bateria e Carregamento', item: 'Carregamento sem Fio (Indução)' },
  ],
  MacBook: [
    { category: 'Verificação Inicial', item: 'Inspeção da Carcaça e Tela (danos, staingate)' },
    { category: 'Verificação Inicial', item: 'Verificação do número de série' },
    { category: 'Verificação Inicial', item: 'Inicialização e Desempenho do Sistema' },

    { category: 'Tela e Câmera', item: 'Display (pixels, vazamento de luz, cores)' },
    { category: 'Tela e Câmera', item: 'Brilho, True Tone e ProMotion (se aplicável)' },
    { category: 'Tela e Câmera', item: 'Câmera FaceTime HD (qualidade e funcionamento)' },

    { category: 'Teclado e Trackpad', item: 'Funcionamento de todas as teclas' },
    { category: 'Teclado e Trackpad', item: 'Retroiluminação do Teclado' },
    { category: 'Teclado e Trackpad', item: 'Trackpad (clique, gestos, Force Touch)' },
    { category: 'Teclado e Trackpad', item: 'Touch Bar e Touch ID (se aplicável)' },

    { category: 'Áudio', item: 'Alto-falantes (sem distorção)' },
    { category: 'Áudio', item: 'Microfones (gravação limpa)' },
    { category: 'Áudio', item: 'Saída de áudio P2 (se aplicável)' },

    { category: 'Portas e Conectividade', item: 'Portas USB-C / Thunderbolt (dados e energia)' },
    { category: 'Portas e Conectividade', item: 'Porta HDMI e Leitor SD (se aplicável)' },
    { category: 'Portas e Conectividade', item: 'Wi-Fi (conexão e velocidade)' },
    { category: 'Portas e Conectividade', item: 'Bluetooth (pareamento com acessório)' },

    { category: 'Bateria e Sistema', item: 'Saúde da Bateria (ciclos e condição)' },
    { category: 'Bateria e Sistema', item: 'Carregador e Porta de Carregamento (MagSafe/USB-C)' },
    { category: 'Bateria e Sistema', item: 'Diagnóstico Apple (se necessário)' },
  ],
  iPad: [
    { category: 'Verificação Inicial', item: 'Inspeção visual (carcaça, tela, porta)' },
    { category: 'Verificação Inicial', item: 'Botões Físicos (Volume, Power)' },
    { category: 'Tela e Touch', item: 'Display (pixels, manchas, vazamento de luz)' },
    { category: 'Tela e Touch', item: 'Resposta ao Toque e Gestos' },
    { category: 'Tela e Touch', item: 'Compatibilidade com Apple Pencil (se aplicável)' },
    { category: 'Tela e Touch', item: 'Brilho, True Tone e ProMotion (se aplicável)' },
    
    { category: 'Sensores e Autenticação', item: 'Face ID / Touch ID' },
    { category: 'Sensores e Autenticação', item: 'Giroscópio e Acelerômetro' },

    { category: 'Áudio', item: 'Alto-falantes (todos, sem distorção)' },
    { category: 'Áudio', item: 'Microfones (gravação limpa)' },

    { category: 'Conectividade', item: 'Wi-Fi e Bluetooth' },
    { category: 'Conectividade', item: 'Dados Móveis e GPS (versão Cellular)' },
    { category: 'Conectividade', item: 'Smart Connector (se aplicável)' },
    
    { category: 'Câmeras', item: 'Câmera Traseira e Frontal' },
    { category: 'Câmeras', item: 'Foco, Flash e Gravação de Vídeo' },

    { category: 'Bateria e Carregamento', item: 'Saúde da Bateria (se disponível)' },
    { category: 'Bateria e Carregamento', item: 'Carregamento (porta USB-C/Lightning)' },
  ],
  iPod: [
    { category: 'Verificação Inicial', item: 'Inspeção da Carcaça e Tela' },
    { category: 'Tela e Controles', item: 'Display (pixels, cores)' },
    { category: 'Tela e Controles', item: 'Touch Screen (iPod Touch)' },
    { category: 'Tela e Controles', item: 'Click Wheel e Botões (modelos clássicos)' },
    { category: 'Tela e Controles', item: 'Botões Físicos (Volume, Power)' },

    { category: 'Áudio', item: 'Saída de Fone de Ouvido (P2)' },
    { category: 'Áudio', item: 'Alto-falante Interno (se aplicável)' },

    { category: 'Câmeras (iPod Touch)', item: 'Câmera Traseira e Frontal' },
    { category: 'Câmeras (iPod Touch)', item: 'Gravação de Vídeo' },

    { category: 'Bateria e Conectividade', item: 'Carregamento via conector' },
    { category: 'Bateria e Conectividade', item: 'Duração da Bateria (teste de playback)' },
    { category: 'Bateria e Conectividade', item: 'Wi-Fi e Bluetooth (iPod Touch)' },
    { category: 'Bateria e Conectividade', 'item': 'Sincronização com Computador' },
  ],
  AirPods: [
    { category: 'Estojo de Carregamento', item: 'Inspeção Física (limpeza, dobradiça)' },
    { category: 'Estojo de Carregamento', item: 'Carregamento do Estojo (com e sem fio)' },
    { category: 'Estojo de Carregamento', item: 'LED de Status (cores e funcionamento)' },
    { category: 'Estojo de Carregamento', item: 'Botão de Emparelhamento' },

    { category: 'Fones (Ambos L e R)', item: 'Inspeção Física (grades, limpeza)' },
    { category: 'Fones (Ambos L e R)', item: 'Carregamento de ambos os fones no estojo' },
    { category: 'Fones (Ambos L e R)', item: 'Emparelhamento e Conexão estável' },

    { category: 'Qualidade de Áudio', item: 'Teste de Áudio (estéreo, L/R)' },
    { category: 'Qualidade de Áudio', item: 'Teste de Microfone (chamadas, Siri)' },
    { category: 'Qualidade de Áudio', item: 'Áudio Espacial (se aplicável)' },

    { category: 'Recursos e Sensores', item: 'Detecção de Uso (pausa/play automático)' },
    { category: 'Recursos e Sensores', item: 'Controles de Toque / Força' },
    { category: 'Recursos e Sensores', item: 'Cancelamento Ativo de Ruído (ANC)' },
    { category: 'Recursos e Sensores', item: 'Modo Ambiente / Adaptativo' },
  ],
};

export const generateChecklist = async (deviceType: Device): Promise<Checklist> => {
  // Simula um pequeno atraso para consistência da UI
  await new Promise(res => setTimeout(res, 250));

  const checklistData = STATIC_CHECKLISTS[deviceType] || [];

  if (checklistData.length === 0) {
    console.error(`Nenhum checklist estático encontrado para o dispositivo: ${deviceType}`);
    return [];
  }

  // Adiciona IDs únicos aos itens do checklist
  const checklistWithIds: Checklist = checklistData.map((item, index) => ({
    ...item,
    id: `${deviceType}-${Date.now()}-${index}`,
  }));

  return checklistWithIds;
};