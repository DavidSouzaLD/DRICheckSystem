import { type Checklist, type ChecklistItemData, type Device } from '../types';

type StaticChecklist = Omit<ChecklistItemData, 'id'>[];

const STATIC_CHECKLISTS: Record<Device, StaticChecklist> = {
  iPhone: [
    { category: 'Condição Física', item: 'Inspeção de arranhões, amassados na carcaça' },
    { category: 'Condição Física', item: 'Verificação de danos na tela (trincos, arranhões profundos)' },
    { category: 'Condição Física', item: 'Verificação de danos na lente da câmera' },
    { category: 'Tela', item: 'Teste de touch screen em toda a superfície' },
    { category: 'Tela', item: 'Verificação de pixels mortos ou manchas (display LCD/OLED)' },
    { category: 'Tela', item: 'Teste de brilho (mínimo e máximo)' },
    { category: 'Tela', item: 'Teste de True Tone (se aplicável)' },
    { category: 'Tela', item: 'Teste de Face ID / Touch ID' },
    { category: 'Câmeras', item: 'Teste da câmera traseira (wide, ultrawide, telephoto)' },
    { category: 'Câmeras', item: 'Teste da câmera frontal' },
    { category: 'Câmeras', item: 'Teste de gravação de vídeo e áudio' },
    { category: 'Câmeras', item: 'Teste do flash LED' },
    { category: 'Áudio', item: 'Teste do alto-falante superior (chamadas)' },
    { category: 'Áudio', item: 'Teste do alto-falante inferior (mídia)' },
    { category: 'Áudio', item: 'Teste do microfone (chamadas, gravador)' },
    { category: 'Bateria', item: 'Verificação da saúde da bateria em Ajustes' },
    { category: 'Bateria', item: 'Teste de carregamento com cabo' },
    { category: 'Bateria', item: 'Teste de carregamento sem fio (se aplicável)' },
    { category: 'Conectividade', item: 'Teste de Wi-Fi' },
    { category: 'Conectividade', item: 'Teste de Bluetooth' },
    { category: 'Conectividade', item: 'Teste de sinal de celular (com chip)' },
    { category: 'Botões e Portas', item: 'Teste dos botões de volume' },
    { category: 'Botões e Portas', item: 'Teste do botão de silenciar' },
    { category: 'Botões e Portas', item: 'Teste do botão lateral (power)' },
    { category: 'Botões e Portas', item: 'Inspeção e teste do conector de carregamento' },
  ],
  MacBook: [
    { category: 'Condição Física', item: 'Inspeção da carcaça (arranhões, amassados)' },
    { category: 'Condição Física', item: 'Verificação da tela (trincos, manchas, arranhões)' },
    { category: 'Tela', item: 'Teste de pixels mortos ou "stuck pixels"' },
    { category: 'Tela', item: 'Verificação de "staingate" (revestimento antirreflexo)' },
    { category: 'Tela', item: 'Teste de brilho e cores' },
    { category: 'Teclado e Trackpad', item: 'Teste de todas as teclas do teclado' },
    { category: 'Teclado e Trackpad', item: 'Teste da retroiluminação do teclado' },
    { category: 'Teclado e Trackpad', item: 'Teste de todos os gestos do trackpad' },
    { category: 'Teclado e Trackpad', item: 'Teste do Force Touch / clique físico' },
    { category: 'Portas e Conexões', item: 'Teste de todas as portas USB-C / Thunderbolt' },
    { category: 'Portas e Conexões', item: 'Teste da porta HDMI (se aplicável)' },
    { category: 'Portas e Conexões', item: 'Teste do leitor de cartão SD (se aplicável)' },
    { category: 'Portas e Conexões', item: 'Teste da entrada de fone de ouvido' },
    { category: 'Bateria', item: 'Verificação de contagem de ciclos e condição da bateria' },
    { category: 'Bateria', item: 'Teste de carregamento com carregador MagSafe / USB-C' },
    { category: 'Áudio e Vídeo', item: 'Teste dos alto-falantes' },
    { category: 'Áudio e Vídeo', item: 'Teste dos microfones' },
    { category: 'Áudio e Vídeo', item: 'Teste da webcam (câmera FaceTime)' },
    { category: 'Sistema e Conectividade', item: 'Teste de Wi-Fi e Bluetooth' },
    { category: 'Sistema e Conectividade', item: 'Verificação do sistema operacional (versão, performance)' },
  ],
  iPad: [
    { category: 'Condição Física', item: 'Inspeção de arranhões, amassados na carcaça' },
    { category: 'Tela', item: 'Teste de touch screen em toda a superfície' },
    { category: 'Tela', item: 'Verificação de pixels mortos ou manchas' },
    { category: 'Tela', item: 'Teste de suporte ao Apple Pencil (se aplicável)' },
    { category: 'Tela', item: 'Teste de Face ID / Touch ID' },
    { category: 'Câmeras', item: 'Teste da câmera traseira e frontal' },
    { category: 'Áudio', item: 'Teste de todos os alto-falantes' },
    { category: 'Áudio', item: 'Teste do microfone' },
    { category: 'Bateria', item: 'Verificação da saúde da bateria (se disponível)' },
    { category: 'Bateria', item: 'Teste de carregamento' },
    { category: 'Conectividade', item: 'Teste de Wi-Fi e Bluetooth' },
    { category: 'Botões e Portas', item: 'Teste dos botões de volume e power' },
    { category: 'Botões e Portas', item: 'Inspeção e teste do conector USB-C / Lightning' },
  ],
  iPod: [
    { category: 'Condição Física', item: 'Inspeção da carcaça e tela' },
    { category: 'Tela', item: 'Teste de touch screen (se aplicável)' },
    { category: 'Controles', item: 'Teste da Click Wheel (se aplicável)' },
    { category: 'Controles', item: 'Teste de todos os botões físicos' },
    { category: 'Áudio', item: 'Teste da saída de fone de ouvido' },
    { category: 'Áudio', item: 'Teste do alto-falante interno (se aplicável)' },
    { category: 'Bateria', item: 'Teste de carregamento e duração da bateria' },
    { category: 'Conectividade', item: 'Teste de Wi-Fi e Bluetooth (se aplicável)' },
    { category: 'Software', item: 'Verificação da sincronização com iTunes/Finder' },
  ],
  AirPods: [
    { category: 'Estojo de Carregamento', item: 'Inspeção física do estojo (arranhões, sujeira)' },
    { category: 'Estojo de Carregamento', item: 'Teste de carregamento do estojo (com e sem fio)' },
    { category: 'Estojo de Carregamento', item: 'Verificação do LED de status' },
    { category: 'Fones', item: 'Inspeção física dos fones (arranhões, limpeza das grades)' },
    { category: 'Fones', item: 'Teste de carregamento de ambos os fones no estojo' },
    { category: 'Áudio', item: 'Teste de áudio (fone esquerdo e direito)' },
    { category: 'Áudio', item: 'Teste de microfone (chamadas, gravação)' },
    { category: 'Conectividade', item: 'Teste de emparelhamento com dispositivo' },
    { category: 'Sensores', item: 'Teste de detecção de uso (pausa automática ao remover)' },
    { category: 'Sensores', item: 'Teste dos controles de toque/força' },
    { category: 'Recursos', item: 'Teste do Cancelamento Ativo de Ruído (se aplicável)' },
    { category: 'Recursos', item: 'Teste do Modo Ambiente (se aplicável)' },
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