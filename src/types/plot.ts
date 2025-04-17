
export interface Plot {
  id: string;
  name: string;
  area: number;
  crop: string;
  status: 'plantio' | 'crescimento' | 'maturacao' | 'colheita' | 'preparo';
  lastUpdated: string;
  healthIndex: number;
  criticalAreas?: {
    type: 'praga' | 'doenca' | 'deficiencia' | 'outro';
    position: { x: number; y: number };
    severity: 'baixa' | 'media' | 'alta';
    description: string;
  }[];
}

export interface MonitoringEntry {
  id: string;
  date: string;
  type: 'praga' | 'doenca' | 'deficiencia' | 'outro';
  description: string;
  severity: 'baixa' | 'media' | 'alta';
  images: string[];
  comments: string;
  recommendations: string;
}

