import { type Checklist, type ChecklistItemData, type Device } from '../types';

type StaticChecklist = Omit<ChecklistItemData, 'id'>[];

const STATIC_CHECKLISTS: Record<Device, StaticChecklist> = {
  iPhone: [
    { category: 'Autenticação e Sensores', item: 'FaceID / Biometria' },
    { category: 'Autenticação e Sensores', item: 'Sensor de proximidade' },
    { category: 'Autenticação e Sensores', item: 'Giroscópio' },
    { category: 'Autenticação e Sensores', item: 'Vibra (motor Taptic)' },

    { category: 'Tela', item: 'Testar touch com ícone (arrastar, gestos)' },
    { category: 'Tela', item: 'Inspeção do Display (pixels, manchas)' },
    { category: 'Tela', item: 'Brilho e True Tone' },

    { category: 'Áudio', item: 'Fones (alto-falante de chamada)' },
    { category: 'Áudio', item: 'Viva voz (alto-falante de mídia)' },
    { category: 'Áudio', item: 'Microfone (chamada, gravador, vídeo)' },
    
    { category: 'Conectividade', item: 'Torre de chip (sinal 4G/5G)' },
    { category: 'Conectividade', item: 'Ligação via chip' },
    { category: 'Conectividade', item: 'Wi-Fi' },
    { category: 'Conectividade', item: 'Bluetooth' },
    { category: 'Conectividade', item: 'Internet (navegação)' },
    { category: 'Conectividade', item: 'NFC' },
    
    { category: 'Câmeras', item: 'Câmera frontal/traseira' },
    { category: 'Câmeras', item: 'Foco da câmera' },
    { category: 'Câmeras', item: 'Flash' },
    { category: 'Câmeras', item: 'Gravação de vídeo' },
    
    { category: 'Energia', item: 'Carregador com fio' },
    { category: 'Energia', item: 'Indução (carregamento sem fio)' },
    { category: 'Energia', item: 'Saúde da Bateria' },
    
    { category: 'Botões e Condição Física', item: 'Botões laterais' },
    { category: 'Botões e Condição Física', item: 'Inspeção física (carcaça, tela, lentes)' },
  ],
  MacBook: [
    { category: 'Verificação Inicial', item: 'Inspeção da Carcaça (arranhões, amassados)' },
    { category: 'Verificação Inicial', item: 'Inspeção da Tela (trincos, manchas, staingate)' },
    { category: 'Verificação Inicial', item: 'Touch ID (se aplicável)' },

    { category: 'Tela e Câmera', item: 'Teste de Pixels e Cores do Display' },
    { category: 'Tela e Câmera', item: 'Teste de Brilho e True Tone' },
    { category: 'Tela e Câmera', item: 'Câmera FaceTime HD' },

    { category: 'Teclado e Trackpad', item: 'Teste de todas as teclas do teclado' },
    { category: 'Teclado e Trackpad', item: 'Retroiluminação do Teclado' },
    { category: 'Teclado e Trackpad', item: 'Trackpad (clique, gestos, Force Touch)' },

    { category: 'Áudio', item: 'Alto-falantes (estéreo)' },
    { category: 'Áudio', item: 'Microfones' },
    { category: 'Áudio', item: 'Saída de áudio (P2)' },

    { category: 'Portas e Conectividade', item: 'Portas USB-C / Thunderbolt' },
    { category: 'Portas e Conectividade', item: 'Porta HDMI (se aplicável)' },
    { category: 'Portas e Conectividade', item: 'Leitor de Cartão SD (se aplicável)' },
    { category: 'Portas e Conectividade', item: 'Wi-Fi' },
    { category: 'Portas e Conectividade', item: 'Bluetooth' },

    { category: 'Bateria e Sistema', item: 'Contagem de Ciclos e Condição da Bateria' },
    { category: 'Bateria e Sistema', item: 'Carregamento (MagSafe / USB-C)' },
    { category: 'Bateria e Sistema', item: 'Verificação do Sistema Operacional' },
  ],
  iPad: [
    { category: 'Autenticação e Sensores', item: 'Face ID / Touch ID' },
    { category: 'Autenticação e Sensores', item: 'Giroscópio e Acelerômetro' },

    { category: 'Tela', item: 'Teste de Touch (gestos, arrastar)' },
    { category: 'Tela', item: 'Teste com Apple Pencil (se aplicável)' },
    { category: 'Tela', item: 'Inspeção do Display (pixels, manchas)' },
    { category: 'Tela', item: 'Brilho, True Tone e ProMotion' },

    { category: 'Áudio', item: 'Alto-falantes (todos)' },
    { category: 'Áudio', item: 'Microfones (gravação, chamada de vídeo)' },

    { category: 'Conectividade', item: 'Wi-Fi' },
    { category: 'Conectividade', item: 'Bluetooth' },
    { category: 'Conectividade', item: 'Dados Móveis (se aplicável)' },

    { category: 'Câmeras', item: 'Câmera Traseira' },
    { category: 'Câmeras', item: 'Câmera Frontal (Center Stage)' },
    { category: 'Câmeras', item: 'Foco e Gravação de Vídeo' },

    { category: 'Energia', item: 'Carregamento via Conector (USB-C/Lightning)' },
    { category: 'Energia', item: 'Saúde da Bateria (se disponível)' },
    
    { category: 'Botões e Condição Física', item: 'Botões de Volume e Power' },
    { category: 'Botões e Condição Física', item: 'Inspeção da Carcaça e Tela' },
  ],
  iPod: [
    { category: 'Condição Física', item: 'Inspeção da Carcaça e Tela' },
    { category: 'Tela e Controles', item: 'Teste de Touch Screen (iPod Touch)' },
    { category: 'Tela e Controles', item: 'Click Wheel e Botões (modelos clássicos)' },
    { category: 'Tela e Controles', item: 'Botões Físicos (Volume, Power)' },

    { category: 'Áudio', item: 'Saída de Fone de Ouvido (P2)' },
    { category: 'Áudio', item: 'Alto-falante Interno (se aplicável)' },

    { category: 'Câmeras', item: 'Câmera Traseira (se aplicável)' },
    { category: 'Câmeras', item: 'Câmera Frontal (FaceTime, se aplicável)' },

    { category: 'Bateria e Conectividade', item: 'Carregamento e Duração da Bateria' },
    { category: 'Bateria e Conectividade', item: 'Wi-Fi e Bluetooth (se aplicável)' },
    { category: 'Bateria e Conectividade', item: 'Sincronização com Computador' },
  ],
  AirPods: [
    { category: 'Estojo de Carregamento', item: 'Inspeção Física (limpeza, danos)' },
    { category: 'Estojo de Carregamento', item: 'Carregamento do Estojo (com e sem fio)' },
    { category: 'Estojo de Carregamento', item: 'LED de Status' },
    { category: 'Estojo de Carregamento', item: 'Botão de Emparelhamento' },

    { category: 'Fones', item: 'Inspeção Física dos Fones (grades, limpeza)' },
    { category: 'Fones', item: 'Carregamento de ambos os fones no estojo' },
    { category: 'Fones', item: 'Emparelhamento e Conexão com Dispositivo' },

    { category: 'Áudio e Microfone', item: 'Teste de Áudio (fone esquerdo e direito)' },
    { category: 'Áudio e Microfone', item: 'Teste de Microfone (chamadas, Siri)' },
    { category: 'Áudio e Microfone', item: 'Áudio Espacial (se aplicável)' },

    { category: 'Sensores e Recursos', item: 'Detecção de Uso (pausa/play automático)' },
    { category: 'Sensores e Recursos', item: 'Controles de Toque / Força' },
    { category: 'Sensores e Recursos', item: 'Cancelamento Ativo de Ruído (se aplicável)' },
    { category: 'Sensores e Recursos', item: 'Modo Ambiente / Adaptativo (se aplicável)' },
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
