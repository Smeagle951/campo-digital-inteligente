
import { Plot, MonitoringEntry } from '../types/plot';

export const samplePlots: Plot[] = [
  {
    id: '1',
    name: 'Talhão 1',
    area: 50,
    crop: 'Soja',
    status: 'crescimento',
    lastUpdated: '2025-04-15',
    healthIndex: 85,
    criticalAreas: [
      {
        type: 'praga',
        position: { x: 35, y: 45 },
        severity: 'media',
        description: 'Infestação de percevejos'
      },
      {
        type: 'deficiencia',
        position: { x: 65, y: 25 },
        severity: 'baixa',
        description: 'Deficiência de potássio'
      }
    ]
  },
  {
    id: '2',
    name: 'Talhão 2',
    area: 30,
    crop: 'Milho',
    status: 'colheita',
    lastUpdated: '2025-04-14',
    healthIndex: 92,
    criticalAreas: []
  }
];

export const sampleMonitoringEntries: { [key: string]: MonitoringEntry[] } = {
  '1': [
    {
      id: 'm1',
      date: '2025-04-12',
      type: 'praga',
      description: 'Percevejo',
      severity: 'media',
      images: ['https://i.imgur.com/AE57hFk.jpg'],
      comments: 'Infestação moderada na borda leste do talhão',
      recommendations: 'Aplicação de inseticida recomendada nos próximos 3 dias'
    },
    {
      id: 'm2',
      date: '2025-04-10',
      type: 'deficiencia',
      description: 'Deficiência de Potássio',
      severity: 'baixa',
      images: ['https://i.imgur.com/RnZEjBm.jpg'],
      comments: 'Sintomas iniciais nas folhas mais velhas',
      recommendations: 'Considerar aplicação foliar de K'
    }
  ],
  '2': [
    {
      id: 'm3',
      date: '2025-04-14',
      type: 'outro',
      description: 'Avaliação pré-colheita',
      severity: 'baixa',
      images: ['https://i.imgur.com/UqH2vBM.jpg'],
      comments: 'Cultura pronta para colheita',
      recommendations: 'Iniciar colheita na próxima semana'
    }
  ]
};

