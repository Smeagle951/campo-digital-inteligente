
import React, { useState } from 'react';
import { Calendar, Leaf, TrendingUp, DollarSign, BarChart2, Clock, AlertTriangle, Plus, History, Edit3, Trash2, CalendarRange, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface Crop {
  id: string;
  name: string;
  variety: string;
  plannedArea: number; // in hectares
  expectedYield: number; // in bags/ha
  costPerHectare: number; // in BRL
  plantingDate: string;
  harvestDate: string;
  status: 'planning' | 'active' | 'completed';
  field: string;
  cycle: number; // in days
  notes?: string;
}

interface CropHistory {
  id: string;
  fieldId: string;
  fieldName: string;
  cropName: string;
  variety: string;
  season: string;
  yieldPerHectare: number;
  totalYield: number;
  plantingDate: string;
  harvestDate: string;
  notes?: string;
}

interface CropSimulation {
  cropName: string;
  costPerHectare: number;
  expectedYield: number;
  currentPrice: number;
  cycle: number;
}

// Sample data for crop planning
const SAMPLE_CROPS: Crop[] = [
  {
    id: '1',
    name: 'Soja',
    variety: 'BMX Potência',
    plannedArea: 120,
    expectedYield: 62,
    costPerHectare: 3800,
    plantingDate: '2025-10-15',
    harvestDate: '2026-02-10',
    status: 'planning',
    field: 'Talhão 1, 2 e 3',
    cycle: 118,
    notes: 'Soja principal, cultivar de maior rentabilidade na última safra'
  },
  {
    id: '2',
    name: 'Milho',
    variety: 'DKB 390',
    plannedArea: 80,
    expectedYield: 145,
    costPerHectare: 4200,
    plantingDate: '2026-02-20',
    harvestDate: '2026-06-25',
    status: 'planning',
    field: 'Talhão 2 e 4',
    cycle: 125,
    notes: 'Milho safrinha após colheita da soja'
  },
  {
    id: '3',
    name: 'Algodão',
    variety: 'FM 944',
    plannedArea: 50,
    expectedYield: 320,
    costPerHectare: 6500,
    plantingDate: '2025-12-05',
    harvestDate: '2026-05-10',
    status: 'planning',
    field: 'Talhão 5',
    cycle: 156,
    notes: 'Algodão em área separada para evitar contaminação'
  },
  {
    id: '4',
    name: 'Soja',
    variety: 'Desafio 8473',
    plannedArea: 100,
    expectedYield: 58,
    costPerHectare: 3600,
    plantingDate: '2024-10-20',
    harvestDate: '2025-02-15',
    status: 'active',
    field: 'Talhão 1 e 3',
    cycle: 118,
    notes: 'Safra atual em desenvolvimento'
  },
  {
    id: '5',
    name: 'Trigo',
    variety: 'TBIO Audaz',
    plannedArea: 40,
    expectedYield: 50,
    costPerHectare: 2800,
    plantingDate: '2025-05-10',
    harvestDate: '2025-09-15',
    status: 'planning',
    field: 'Talhão 4',
    cycle: 128,
    notes: 'Plantio de inverno para rotação de culturas'
  }
];

// Sample crop history data
const SAMPLE_CROP_HISTORY: CropHistory[] = [
  {
    id: '1',
    fieldId: 'field1',
    fieldName: 'Talhão 1',
    cropName: 'Soja',
    variety: 'BMX Potência',
    season: '2023/2024',
    yieldPerHectare: 62,
    totalYield: 2480,
    plantingDate: '2023-10-10',
    harvestDate: '2024-02-05',
    notes: 'Boa produtividade mesmo com período seco em janeiro'
  },
  {
    id: '2',
    fieldId: 'field1',
    fieldName: 'Talhão 1',
    cropName: 'Milho',
    variety: 'DKB 390',
    season: '2023/2024',
    yieldPerHectare: 140,
    totalYield: 5600,
    plantingDate: '2024-02-15',
    harvestDate: '2024-06-20',
    notes: 'Safrinha com bons resultados'
  },
  {
    id: '3',
    fieldId: 'field2',
    fieldName: 'Talhão 2',
    cropName: 'Soja',
    variety: 'Desafio 8473',
    season: '2023/2024',
    yieldPerHectare: 58,
    totalYield: 1740,
    plantingDate: '2023-10-15',
    harvestDate: '2024-02-10',
    notes: 'Produtividade afetada por período seco'
  },
  {
    id: '4',
    fieldId: 'field2',
    fieldName: 'Talhão 2',
    cropName: 'Soja',
    variety: 'BMX Potência',
    season: '2022/2023',
    yieldPerHectare: 65,
    totalYield: 1950,
    plantingDate: '2022-10-12',
    harvestDate: '2023-02-08',
    notes: 'Excelente produtividade'
  },
  {
    id: '5',
    fieldId: 'field2',
    fieldName: 'Talhão 2',
    cropName: 'Milho',
    variety: 'DKB 390',
    season: '2022/2023',
    yieldPerHectare: 135,
    totalYield: 4050,
    plantingDate: '2023-02-20',
    harvestDate: '2023-06-25',
    notes: 'Boa produtividade na safrinha'
  }
];

// Sample crop simulation data
const SAMPLE_CROP_SIMULATIONS: CropSimulation[] = [
  { cropName: 'Soja', costPerHectare: 3800, expectedYield: 62, currentPrice: 165, cycle: 120 },
  { cropName: 'Milho', costPerHectare: 4200, expectedYield: 145, currentPrice: 75, cycle: 125 },
  { cropName: 'Algodão', costPerHectare: 6500, expectedYield: 320, currentPrice: 198, cycle: 160 },
  { cropName: 'Trigo', costPerHectare: 2800, expectedYield: 50, currentPrice: 90, cycle: 130 },
  { cropName: 'Feijão', costPerHectare: 4500, expectedYield: 30, currentPrice: 280, cycle: 90 }
];

interface NewCropFormProps {
  onClose: () => void;
  onSave: (crop: Omit<Crop, 'id'>) => void;
}

const NewCropForm: React.FC<NewCropFormProps> = ({ onClose, onSave }) => {
  const [formState, setFormState] = useState<Omit<Crop, 'id'>>({
    name: '',
    variety: '',
    plannedArea: 0,
    expectedYield: 0,
    costPerHectare: 0,
    plantingDate: '',
    harvestDate: '',
    status: 'planning',
    field: '',
    cycle: 0
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: Number(value) }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.name || !formState.plantingDate || !formState.harvestDate || !formState.field) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    onSave(formState);
    onClose();
  };
  
  // Calculate cycle days when planting and harvest dates are set
  React.useEffect(() => {
    if (formState.plantingDate && formState.harvestDate) {
      const plantDate = new Date(formState.plantingDate);
      const harvestDate = new Date(formState.harvestDate);
      const diffTime = Math.abs(harvestDate.getTime() - plantDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setFormState(prev => ({ ...prev, cycle: diffDays }));
    }
  }, [formState.plantingDate, formState.harvestDate]);
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-agro-dark">Adicionar Nova Safra</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Trash2 size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Cultura*</label>
                <select 
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Soja">Soja</option>
                  <option value="Milho">Milho</option>
                  <option value="Algodão">Algodão</option>
                  <option value="Trigo">Trigo</option>
                  <option value="Feijão">Feijão</option>
                  <option value="Outra">Outra</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Variedade</label>
                <input 
                  type="text" 
                  name="variety"
                  value={formState.variety}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: BMX Potência"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Área Planejada (hectares)*</label>
                <input 
                  type="number" 
                  name="plannedArea"
                  value={formState.plannedArea}
                  onChange={handleNumberChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  min="0.1"
                  step="0.1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Talhão/Área*</label>
                <input 
                  type="text" 
                  name="field"
                  value={formState.field}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Ex: Talhão 1, 2"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Data de Plantio*</label>
                <input 
                  type="date" 
                  name="plantingDate"
                  value={formState.plantingDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Data de Colheita*</label>
                <input 
                  type="date" 
                  name="harvestDate"
                  value={formState.harvestDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Ciclo (dias)</label>
                <input 
                  type="number" 
                  name="cycle"
                  value={formState.cycle}
                  onChange={handleNumberChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Produtividade Esperada (sc/ha)</label>
                <input 
                  type="number" 
                  name="expectedYield"
                  value={formState.expectedYield}
                  onChange={handleNumberChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Custo/ha (R$)</label>
                <input 
                  type="number" 
                  name="costPerHectare"
                  value={formState.costPerHectare}
                  onChange={handleNumberChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Observações</label>
              <textarea 
                name="notes"
                value={formState.notes || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-20"
                placeholder="Informações adicionais sobre esta safra..."
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-agro-text-light hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-agro-primary text-white rounded-md hover:bg-agro-dark"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface CropComparisonModalProps {
  onClose: () => void;
  simulations: CropSimulation[];
}

const CropComparisonModal: React.FC<CropComparisonModalProps> = ({ onClose, simulations }) => {
  const [area, setArea] = useState(50); // default 50 hectares
  
  const calculateProfit = (simulation: CropSimulation) => {
    const revenue = simulation.expectedYield * simulation.currentPrice * area;
    const cost = simulation.costPerHectare * area;
    return revenue - cost;
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-agro-dark">Comparativo de Culturas</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Trash2 size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-agro-text-light mb-1">Área para Simulação (hectares)</label>
          <input 
            type="number" 
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2"
            min="1"
            step="1"
          />
          <p className="text-sm text-agro-text-light mt-1">Ajuste a área para simular diferentes cenários</p>
        </div>
        
        <div className="border rounded-lg overflow-hidden mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cultura</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciclo (dias)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Custo/ha</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prod. Esperada</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Preço Atual</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {simulations.map((simulation, index) => {
                const profit = calculateProfit(simulation);
                const totalCost = simulation.costPerHectare * area;
                const totalRevenue = simulation.expectedYield * simulation.currentPrice * area;
                const profitMargin = (profit / totalRevenue) * 100;
                
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{simulation.cropName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-agro-text-light" />
                        <span>{simulation.cycle} dias</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div>R$ {simulation.costPerHectare.toLocaleString('pt-BR')}</div>
                      <div className="text-xs text-agro-text-light">
                        Total: R$ {totalCost.toLocaleString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div>{simulation.expectedYield} sc/ha</div>
                      <div className="text-xs text-agro-text-light">
                        Total: {(simulation.expectedYield * area).toLocaleString('pt-BR')} sc
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      R$ {simulation.currentPrice.toLocaleString('pt-BR')}/sc
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className={profit >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        R$ {profit.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-xs text-agro-text-light">
                        Margem: {profitMargin.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Notas sobre a Simulação</h4>
          <ul className="text-sm space-y-1 text-agro-text-light">
            <li>• Valores baseados em médias de mercado e produtividade esperada</li>
            <li>• O resultado pode variar conforme condições climáticas, manejo e flutuações de preço</li>
            <li>• Ciclo mais curto permite maior rotação de culturas e melhor aproveitamento da área</li>
            <li>• Considere outros fatores como rotação de culturas e benefícios ao solo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

interface CropCycleFormProps {
  onClose: () => void;
}

const CropCycleForm: React.FC<CropCycleFormProps> = ({ onClose }) => {
  const [cycleName, setCycleName] = useState('');
  const [cycleYear, setCycleYear] = useState('2025/2026');
  
  const handleCreateCycle = () => {
    if (!cycleName) {
      toast.error("Por favor, defina um nome para o ciclo.");
      return;
    }
    
    toast.success(`Ciclo "${cycleName} - ${cycleYear}" criado com sucesso!`);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-agro-dark">Criar Novo Ciclo de Produção</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Trash2 size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-agro-text-light mb-1">Nome do Ciclo*</label>
            <input 
              type="text" 
              value={cycleName}
              onChange={(e) => setCycleName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Ex: Ciclo Safra Verão"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-agro-text-light mb-1">Ano Agrícola*</label>
            <select 
              value={cycleYear}
              onChange={(e) => setCycleYear(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="2024/2025">2024/2025</option>
              <option value="2025/2026">2025/2026</option>
              <option value="2026/2027">2026/2027</option>
            </select>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Estrutura do Ciclo</h4>
            <div className="space-y-3">
              <div className="p-3 border rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">1. Safra Principal</span>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option value="soja">Soja</option>
                    <option value="milho">Milho</option>
                    <option value="algodao">Algodão</option>
                  </select>
                </div>
                <div className="text-sm text-agro-text-light mt-1">Out-Fev • 120 dias</div>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">2. Safrinha</span>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option value="milho">Milho</option>
                    <option value="feijao">Feijão</option>
                    <option value="nenhuma">Nenhuma</option>
                  </select>
                </div>
                <div className="text-sm text-agro-text-light mt-1">Fev-Jun • 120 dias</div>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">3. Cobertura</span>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option value="braquiaria">Braquiária</option>
                    <option value="milheto">Milheto</option>
                    <option value="nenhuma">Nenhuma</option>
                  </select>
                </div>
                <div className="text-sm text-agro-text-light mt-1">Jun-Set • 90 dias</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-agro-text-light hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button 
            onClick={handleCreateCycle}
            className="px-4 py-2 bg-agro-primary text-white rounded-md hover:bg-agro-dark"
          >
            Criar Ciclo
          </button>
        </div>
      </div>
    </div>
  );
};

const CropPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crops' | 'history' | 'cycle'>('crops');
  const [cropFilter, setCropFilter] = useState<'all' | 'planning' | 'active'>('all');
  const [showNewCropForm, setShowNewCropForm] = useState(false);
  const [showCropComparison, setShowCropComparison] = useState(false);
  const [showCropCycleForm, setShowCropCycleForm] = useState(false);
  const [crops, setCrops] = useState<Crop[]>(SAMPLE_CROPS);
  const [cropHistory] = useState<CropHistory[]>(SAMPLE_CROP_HISTORY);
  const [fieldFilter, setFieldFilter] = useState<string>('all');
  
  const handleAddCrop = () => {
    setShowNewCropForm(true);
  };
  
  const handleSaveCrop = (cropData: Omit<Crop, 'id'>) => {
    const newCrop: Crop = {
      ...cropData,
      id: `crop-${Date.now()}`
    };
    
    setCrops([...crops, newCrop]);
    toast.success("Safra adicionada com sucesso!");
  };
  
  const handleCompareCrops = () => {
    setShowCropComparison(true);
  };
  
  const handleCreateCropCycle = () => {
    setShowCropCycleForm(true);
  };
  
  const filteredCrops = crops.filter(crop => {
    if (cropFilter === 'all') return true;
    return crop.status === cropFilter;
  });
  
  const filteredHistory = cropHistory.filter(record => {
    if (fieldFilter === 'all') return true;
    return record.fieldId === fieldFilter;
  });
  
  const fieldMap = new Map<string, CropHistory[]>();
  cropHistory.forEach(record => {
    if (!fieldMap.has(record.fieldId)) {
      fieldMap.set(record.fieldId, []);
    }
    fieldMap.get(record.fieldId)?.push(record);
  });
  
  // Calculate statistics
  const totalArea = filteredCrops.reduce((sum, crop) => sum + crop.plannedArea, 0);
  const averageCost = filteredCrops.length > 0
    ? filteredCrops.reduce((sum, crop) => sum + crop.costPerHectare, 0) / filteredCrops.length
    : 0;
  const totalInvestment = filteredCrops.reduce((sum, crop) => sum + (crop.costPerHectare * crop.plannedArea), 0);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Planejamento de Safras</h2>
      
      <div className="flex justify-between items-center mb-5">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('crops')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'crops'
                ? 'bg-agro-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-agro-text-light'
            }`}
          >
            <Leaf className="w-5 h-5 mr-1 inline" />
            <span>Safras</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'history'
                ? 'bg-agro-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-agro-text-light'
            }`}
          >
            <History className="w-5 h-5 mr-1 inline" />
            <span>Histórico</span>
          </button>
          <button
            onClick={() => setActiveTab('cycle')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'cycle'
                ? 'bg-agro-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-agro-text-light'
            }`}
          >
            <RotateCcw className="w-5 h-5 mr-1 inline" />
            <span>Ciclos</span>
          </button>
        </div>
        
        <div className="flex space-x-2">
          {activeTab === 'crops' && (
            <>
              <button
                onClick={handleCompareCrops}
                className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <TrendingUp className="w-5 h-5 mr-1 inline" />
                <span>Comparar Culturas</span>
              </button>
              <button
                onClick={handleAddCrop}
                className="px-3 py-2 bg-agro-primary text-white rounded-md hover:bg-agro-dark transition-colors"
              >
                <Plus className="w-5 h-5 mr-1 inline" />
                <span>Nova Safra</span>
              </button>
            </>
          )}
          {activeTab === 'cycle' && (
            <button
              onClick={handleCreateCropCycle}
              className="px-3 py-2 bg-agro-primary text-white rounded-md hover:bg-agro-dark transition-colors"
            >
              <CalendarRange className="w-5 h-5 mr-1 inline" />
              <span>Criar Ciclo</span>
            </button>
          )}
        </div>
      </div>
      
      {activeTab === 'crops' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Leaf className="h-7 w-7 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-green-700">Área Total Planejada</p>
                <p className="text-2xl font-bold text-green-900">{totalArea} ha</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <BarChart2 className="h-7 w-7 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Custo Médio por Hectare</p>
                <p className="text-2xl font-bold text-blue-900">R$ {averageCost.toLocaleString('pt-BR')}</p>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 flex items-center">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <DollarSign className="h-7 w-7 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-orange-700">Investimento Total</p>
                <p className="text-2xl font-bold text-orange-900">R$ {totalInvestment.toLocaleString('pt-BR')}</p>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Calendar className="h-7 w-7 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-purple-700">Safras Planejadas</p>
                <p className="text-2xl font-bold text-purple-900">
                  {crops.filter(c => c.status === 'planning').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCropFilter('all')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  cropFilter === 'all'
                    ? 'bg-agro-primary text-white'
                    : 'bg-gray-100 text-agro-text-light hover:bg-gray-200'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setCropFilter('planning')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  cropFilter === 'planning'
                    ? 'bg-agro-primary text-white'
                    : 'bg-gray-100 text-agro-text-light hover:bg-gray-200'
                }`}
              >
                Em Planejamento
              </button>
              <button
                onClick={() => setCropFilter('active')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  cropFilter === 'active'
                    ? 'bg-agro-primary text-white'
                    : 'bg-gray-100 text-agro-text-light hover:bg-gray-200'
                }`}
              >
                Safras Ativas
              </button>
            </div>
            
            <div className="text-sm text-agro-text-light">
              Mostrando {filteredCrops.length} safra{filteredCrops.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredCrops.map(crop => (
              <div key={crop.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                  <div className="flex items-center">
                    <Leaf className={`mr-2 ${
                      crop.name === 'Soja' ? 'text-green-500' :
                      crop.name === 'Milho' ? 'text-yellow-500' :
                      crop.name === 'Algodão' ? 'text-blue-400' :
                      crop.name === 'Trigo' ? 'text-yellow-600' :
                      'text-agro-primary'
                    }`} />
                    <h3 className="font-medium">
                      {crop.name} {crop.variety ? `- ${crop.variety}` : ''}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      crop.status === 'planning' ? 'bg-blue-100 text-blue-800' :
                      crop.status === 'active' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {crop.status === 'planning' ? 'Em Planejamento' :
                       crop.status === 'active' ? 'Ativa' : 'Concluída'}
                    </span>
                    <button
                      onClick={() => toast.info("A funcionalidade de edição será implementada em breve!")}
                      className="p-1 hover:bg-gray-200 rounded"
                      title="Editar"
                    >
                      <Edit3 size={18} className="text-agro-text-light" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div>
                      <span className="text-agro-text-light">Área:</span>
                      <span className="ml-1 font-medium">{crop.plannedArea} hectares</span>
                    </div>
                    <div>
                      <span className="text-agro-text-light">Talhões:</span>
                      <span className="ml-1">{crop.field}</span>
                    </div>
                    <div>
                      <span className="text-agro-text-light">Ciclo:</span>
                      <span className="ml-1">{crop.cycle} dias</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-agro-text-light">Plantio:</span>
                      <span className="ml-1">{new Date(crop.plantingDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div>
                      <span className="text-agro-text-light">Colheita:</span>
                      <span className="ml-1">{new Date(crop.harvestDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div>
                      <span className="text-agro-text-light">Prod. Esperada:</span>
                      <span className="ml-1">{crop.expectedYield} sc/ha</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-agro-text-light">Custo por Hectare:</span>
                      <span className="ml-1">R$ {crop.costPerHectare.toLocaleString('pt-BR')}</span>
                    </div>
                    <div>
                      <span className="text-agro-text-light">Custo Total:</span>
                      <span className="ml-1">R$ {(crop.costPerHectare * crop.plannedArea).toLocaleString('pt-BR')}</span>
                    </div>
                    <div>
                      <span className="text-agro-text-light">Prod. Total Esperada:</span>
                      <span className="ml-1">{(crop.expectedYield * crop.plannedArea).toLocaleString('pt-BR')} sc</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between">
                    {crop.notes && (
                      <div className="text-sm bg-gray-50 p-2 rounded border">
                        <span className="text-agro-text-light">Observações:</span>
                        <p>{crop.notes}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={() => toast.info("Função de visualização detalhada será implementada em breve!")}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
                      >
                        Ver Detalhes
                      </button>
                      {crop.status === 'planning' && (
                        <button
                          onClick={() => toast.info("Função de orçamento detalhado será implementada em breve!")}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                        >
                          Orçamento
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div 
              className="border border-dashed rounded-lg p-8 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={handleAddCrop}
            >
              <div className="text-center">
                <Plus size={32} className="mx-auto text-agro-text-light" />
                <p className="mt-2 text-agro-text-light">Adicionar Nova Safra</p>
              </div>
            </div>
          </div>
        </>
      )}
      
      {activeTab === 'history' && (
        <>
          <div className="mb-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <select
                value={fieldFilter}
                onChange={(e) => setFieldFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              >
                <option value="all">Todos os Talhões</option>
                {[...fieldMap.keys()].map(fieldId => {
                  const records = fieldMap.get(fieldId) || [];
                  const fieldName = records[0]?.fieldName || fieldId;
                  return (
                    <option key={fieldId} value={fieldId}>{fieldName}</option>
                  );
                })}
              </select>
            </div>
            
            <div className="text-sm text-agro-text-light">
              Histórico de {filteredHistory.length} safra{filteredHistory.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Talhão</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cultura</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Safra</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Produtividade</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Produção Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {record.fieldName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Leaf className={`mr-2 ${
                          record.cropName === 'Soja' ? 'text-green-500' :
                          record.cropName === 'Milho' ? 'text-yellow-500' :
                          record.cropName === 'Algodão' ? 'text-blue-400' :
                          'text-agro-primary'
                        }`} />
                        <span>{record.cropName} {record.variety ? `- ${record.variety}` : ''}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {record.season}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(record.plantingDate).toLocaleDateString('pt-BR')} a {new Date(record.harvestDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {record.yieldPerHectare} sc/ha
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                      {record.totalYield.toLocaleString('pt-BR')} sc
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Histórico de Produtividade por Talhão</h3>
              <div className="space-y-4">
                {[...fieldMap.entries()].map(([fieldId, records]) => {
                  const fieldName = records[0]?.fieldName || fieldId;
                  const cropYields = records.map(r => r.yieldPerHectare);
                  const avgYield = cropYields.reduce((sum, y) => sum + y, 0) / cropYields.length;
                  const maxYield = Math.max(...cropYields);
                  
                  return (
                    <div key={fieldId} className="p-3 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-1">{fieldName}</h4>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-agro-text-light">Safras:</span>
                          <span className="ml-1">{records.length}</span>
                        </div>
                        <div>
                          <span className="text-agro-text-light">Média:</span>
                          <span className="ml-1">{avgYield.toFixed(1)} sc/ha</span>
                        </div>
                        <div>
                          <span className="text-agro-text-light">Máxima:</span>
                          <span className="ml-1">{maxYield} sc/ha</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Evolução da Produtividade</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {cropYields.map((y, i) => (
                            <div 
                              key={i}
                              className="h-6 bg-green-500 rounded-sm first:rounded-l-md last:rounded-r-md relative group"
                              style={{ width: `${100 / cropYields.length}%`, opacity: 0.3 + (0.7 * y / maxYield) }}
                            >
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                {records[i].cropName}: {y} sc/ha
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs mt-1 text-agro-text-light">
                          <span>{records[records.length - 1]?.season}</span>
                          <span>{records[0]?.season}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Produtividade por Cultura</h3>
              <div className="space-y-4">
                {Array.from(new Set(cropHistory.map(r => r.cropName))).map(cropName => {
                  const cropRecords = cropHistory.filter(r => r.cropName === cropName);
                  const yields = cropRecords.map(r => r.yieldPerHectare);
                  const avgYield = yields.reduce((sum, y) => sum + y, 0) / yields.length;
                  
                  return (
                    <div key={cropName} className="p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{cropName}</h4>
                        <span className="text-sm">{cropRecords.length} safra{cropRecords.length !== 1 ? 's' : ''}</span>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Produtividade Média</span>
                          <span>{avgYield.toFixed(1)} sc/ha</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              cropName === 'Soja' ? 'bg-green-500' :
                              cropName === 'Milho' ? 'bg-yellow-500' :
                              cropName === 'Algodão' ? 'bg-blue-400' :
                              'bg-agro-primary'
                            }`}
                            style={{ width: `${(avgYield / 100) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-agro-text-light">Maior produtividade:</span>
                          <span>{Math.max(...yields)} sc/ha ({cropRecords.find(r => r.yieldPerHectare === Math.max(...yields))?.season})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-agro-text-light">Menor produtividade:</span>
                          <span>{Math.min(...yields)} sc/ha ({cropRecords.find(r => r.yieldPerHectare === Math.min(...yields))?.season})</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
      
      {activeTab === 'cycle' && (
        <>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-5">
            <div className="flex items-start">
              <AlertTriangle className="text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-yellow-800">Modelo Baseado em Ciclos</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Planeje suas safras em ciclos produtivos completos. Defina a sequência de culturas para cada área ao longo de um ano agrícola, 
                  facilitando a rotação de culturas e otimizando os recursos.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h3 className="font-medium">Ciclos de Produção Ativos</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-agro-primary text-white p-3">
                    <h4 className="font-medium">Ciclo Safra Verão 2024/2025</h4>
                    <p className="text-sm text-white/80">Talhões 1, 2 e 3 • 250 hectares</p>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="border-l-4 border-green-500 pl-3 py-1">
                      <p className="font-medium">Soja - BMX Potência</p>
                      <p className="text-sm text-agro-text-light">Out/2024 - Fev/2025 • 120 dias</p>
                    </div>
                    
                    <div className="border-l-4 border-yellow-500 pl-3 py-1">
                      <p className="font-medium">Milho - DKB 390</p>
                      <p className="text-sm text-agro-text-light">Fev/2025 - Jun/2025 • 120 dias</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-3 py-1">
                      <p className="font-medium">Braquiária - Cobertura</p>
                      <p className="text-sm text-agro-text-light">Jun/2025 - Set/2025 • 90 dias</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
                    <span className="text-sm text-green-600">
                      Ciclo em andamento (25%)
                    </span>
                    <button
                      onClick={() => toast.info("Função de visualização será implementada em breve!")}
                      className="text-sm text-agro-primary hover:underline"
                    >
                      Ver detalhes
                    </button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-green-600 text-white p-3">
                    <h4 className="font-medium">Ciclo Rotação Algodão 2024/2025</h4>
                    <p className="text-sm text-white/80">Talhões 4 e 5 • 150 hectares</p>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="border-l-4 border-blue-400 pl-3 py-1">
                      <p className="font-medium">Algodão - FM 944</p>
                      <p className="text-sm text-agro-text-light">Dez/2024 - Mai/2025 • 150 dias</p>
                    </div>
                    
                    <div className="border-l-4 border-amber-500 pl-3 py-1">
                      <p className="font-medium">Trigo - TBIO Audaz</p>
                      <p className="text-sm text-agro-text-light">Mai/2025 - Set/2025 • 120 dias</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
                    <span className="text-sm text-yellow-600">
                      Planejado (inicia em Dez/2024)
                    </span>
                    <button
                      onClick={() => toast.info("Função de visualização será implementada em breve!")}
                      className="text-sm text-agro-primary hover:underline"
                    >
                      Ver detalhes
                    </button>
                  </div>
                </div>
                
                <div 
                  className="border border-dashed rounded-lg flex items-center justify-center p-6 cursor-pointer hover:bg-gray-50 transition-colors h-64"
                  onClick={handleCreateCropCycle}
                >
                  <div className="text-center">
                    <Plus size={32} className="mx-auto text-agro-text-light" />
                    <p className="mt-2 text-agro-text-light">Criar Novo Ciclo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h3 className="font-medium">Integração com Outros Módulos</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center mb-3">
                    <Leaf className="text-green-500 mr-2" />
                    <h4 className="font-medium">Integração com Safras</h4>
                  </div>
                  <p className="text-sm text-agro-text-light mb-3">
                    Os ciclos planejados geram automaticamente as safras de cada cultura com datas e áreas definidas.
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => toast.info("Função será implementada em breve!")}
                      className="text-sm text-agro-primary hover:underline"
                    >
                      Configurar
                    </button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center mb-3">
                    <DollarSign className="text-financial-income mr-2" />
                    <h4 className="font-medium">Gestão Financeira</h4>
                  </div>
                  <p className="text-sm text-agro-text-light mb-3">
                    As estimativas de custo e receita são sincronizadas com o módulo financeiro para orçamento anual.
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => toast.info("Função será implementada em breve!")}
                      className="text-sm text-agro-primary hover:underline"
                    >
                      Configurar
                    </button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center mb-3">
                    <BarChart2 className="text-blue-500 mr-2" />
                    <h4 className="font-medium">Estoque de Produtos</h4>
                  </div>
                  <p className="text-sm text-agro-text-light mb-3">
                    Planeje a utilização de insumos e estoques necessários para cada fase do ciclo de produção.
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => toast.info("Função será implementada em breve!")}
                      className="text-sm text-agro-primary hover:underline"
                    >
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* New crop form modal */}
      {showNewCropForm && (
        <NewCropForm 
          onClose={() => setShowNewCropForm(false)}
          onSave={handleSaveCrop}
        />
      )}
      
      {/* Crop comparison modal */}
      {showCropComparison && (
        <CropComparisonModal 
          onClose={() => setShowCropComparison(false)}
          simulations={SAMPLE_CROP_SIMULATIONS}
        />
      )}
      
      {/* Crop cycle form modal */}
      {showCropCycleForm && (
        <CropCycleForm 
          onClose={() => setShowCropCycleForm(false)}
        />
      )}
    </div>
  );
};

export default CropPlanning;
