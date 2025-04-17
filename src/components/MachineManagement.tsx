
import React, { useState } from 'react';
import { Tractor, PlaneTakeoff, Calendar, Wrench, Plus, Edit3, Trash2, ArrowRight, FileText, Clock, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Machine {
  id: string;
  name: string;
  model: string;
  type: 'tractor' | 'harvester' | 'sprayer' | 'plane' | 'implement' | 'other';
  code: string;
  hoursUsed: number;
  status: 'operational' | 'maintenance' | 'broken';
  nextMaintenance?: string;
  costPerHour: number;
  purchaseDate: string;
  lastMaintenanceDate?: string;
  image?: string;
  implements?: string[];
  notes?: string;
}

interface MaintenanceRecord {
  id: string;
  machineId: string;
  date: string;
  type: 'preventive' | 'corrective' | 'regular';
  description: string;
  cost: number;
  technician?: string;
  parts?: {
    name: string;
    quantity: number;
    unitCost: number;
  }[];
  completed: boolean;
}

// Sample data
const SAMPLE_MACHINES: Machine[] = [
  {
    id: '1',
    name: 'Trator John Deere',
    model: '8R 310',
    type: 'tractor',
    code: 'TR-JD-01',
    hoursUsed: 2450,
    status: 'operational',
    nextMaintenance: '2025-04-20',
    costPerHour: 180,
    purchaseDate: '2023-05-15',
    lastMaintenanceDate: '2025-02-10',
    image: 'https://i.imgur.com/Npu8gkJ.jpg',
    implements: ['IL-AR-01', 'IL-PL-02'],
    notes: 'Trator principal para operações pesadas'
  },
  {
    id: '2',
    name: 'Colheitadeira Case',
    model: 'IH 8250',
    type: 'harvester',
    code: 'CH-CS-01',
    hoursUsed: 1850,
    status: 'maintenance',
    nextMaintenance: '2025-04-10',
    costPerHour: 250,
    purchaseDate: '2022-08-22',
    lastMaintenanceDate: '2025-01-05',
    image: 'https://i.imgur.com/DxQMODJ.jpg',
    implements: [],
    notes: 'Revisão geral necessária antes da safra'
  },
  {
    id: '3',
    name: 'Pulverizador Jacto',
    model: 'Uniport 3030',
    type: 'sprayer',
    code: 'PL-JC-01',
    hoursUsed: 980,
    status: 'broken',
    costPerHour: 120,
    purchaseDate: '2023-11-10',
    lastMaintenanceDate: '2025-03-01',
    image: 'https://i.imgur.com/v5EIHBJ.jpg',
    implements: [],
    notes: 'Bomba com problema, peça em falta para substituição'
  },
  {
    id: '4',
    name: 'Avião Agrícola Ipanema',
    model: 'EMB-202A',
    type: 'plane',
    code: 'AV-EM-01',
    hoursUsed: 450,
    status: 'operational',
    nextMaintenance: '2025-05-15',
    costPerHour: 850,
    purchaseDate: '2024-01-10',
    image: 'https://i.imgur.com/Bq7fDDN.jpg',
    implements: [],
    notes: 'Contrato com empresa terceirizada'
  },
  {
    id: '5',
    name: 'Arado Reversível',
    model: 'Baldan ASPC',
    type: 'implement',
    code: 'IL-AR-01',
    hoursUsed: 520,
    status: 'operational',
    costPerHour: 0,
    purchaseDate: '2023-08-15',
    image: 'https://i.imgur.com/Yh2Yvcj.jpg',
    notes: 'Utilizado com o Trator John Deere'
  },
  {
    id: '6',
    name: 'Plantadeira',
    model: 'John Deere DB120',
    type: 'implement',
    code: 'IL-PL-02',
    hoursUsed: 350,
    status: 'operational',
    costPerHour: 0,
    purchaseDate: '2023-06-20',
    image: 'https://i.imgur.com/4sJlG1F.jpg',
    notes: 'Plantadeira de 36 linhas'
  }
];

// Sample maintenance records
const SAMPLE_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: 'm1',
    machineId: '1',
    date: '2025-04-18',
    type: 'preventive',
    description: 'Troca de óleo e filtros',
    cost: 1200,
    technician: 'João Silva',
    parts: [
      { name: 'Óleo 15W40', quantity: 20, unitCost: 45 },
      { name: 'Filtro de óleo', quantity: 1, unitCost: 180 },
      { name: 'Filtro de combustível', quantity: 2, unitCost: 120 }
    ],
    completed: false
  },
  {
    id: 'm2',
    machineId: '2',
    date: '2025-04-10',
    type: 'corrective',
    description: 'Revisão geral do sistema hidráulico',
    cost: 8500,
    technician: 'Equipe Case',
    parts: [
      { name: 'Bomba hidráulica', quantity: 1, unitCost: 6500 },
      { name: 'Mangueiras', quantity: 4, unitCost: 250 },
      { name: 'Fluido hidráulico', quantity: 10, unitCost: 75 }
    ],
    completed: false
  },
  {
    id: 'm3',
    machineId: '3',
    date: '2025-04-05',
    type: 'corrective',
    description: 'Reparo na bomba de produto',
    cost: 3200,
    technician: 'Assistência Jacto',
    parts: [
      { name: 'Bomba completa', quantity: 1, unitCost: 2800 },
      { name: 'Kit de vedação', quantity: 1, unitCost: 400 }
    ],
    completed: false
  },
  {
    id: 'm4',
    machineId: '1',
    date: '2025-02-10',
    type: 'regular',
    description: 'Troca de óleo e filtros',
    cost: 1200,
    technician: 'João Silva',
    parts: [
      { name: 'Óleo 15W40', quantity: 20, unitCost: 45 },
      { name: 'Filtro de óleo', quantity: 1, unitCost: 180 },
      { name: 'Filtro de combustível', quantity: 2, unitCost: 120 }
    ],
    completed: true
  }
];

interface NewMachineFormProps {
  onClose: () => void;
  onSave: (machine: Omit<Machine, 'id'>) => void;
}

const NewMachineForm: React.FC<NewMachineFormProps> = ({ onClose, onSave }) => {
  const [formState, setFormState] = useState<Omit<Machine, 'id'>>({
    name: '',
    model: '',
    type: 'tractor',
    code: '',
    hoursUsed: 0,
    status: 'operational',
    costPerHour: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
    implements: [],
    notes: ''
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
    
    if (!formState.name || !formState.model || !formState.code) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    onSave(formState);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-agro-dark">Adicionar Nova Máquina</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Trash2 size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Tipo de Máquina*</label>
              <select 
                name="type"
                value={formState.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="tractor">Trator</option>
                <option value="harvester">Colheitadeira</option>
                <option value="sprayer">Pulverizador</option>
                <option value="plane">Avião Agrícola</option>
                <option value="implement">Implemento</option>
                <option value="other">Outro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Nome da Máquina*</label>
              <input 
                type="text" 
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Ex: Trator John Deere"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Modelo*</label>
              <input 
                type="text" 
                name="model"
                value={formState.model}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Ex: 8R 310"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Código de Identificação*</label>
              <input 
                type="text" 
                name="code"
                value={formState.code}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Ex: TR-JD-01"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Horímetro (horas)</label>
                <input 
                  type="number" 
                  name="hoursUsed"
                  value={formState.hoursUsed}
                  onChange={handleNumberChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Custo por Hora (R$)</label>
                <input 
                  type="number" 
                  name="costPerHour"
                  value={formState.costPerHour}
                  onChange={handleNumberChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Status</label>
                <select 
                  name="status"
                  value={formState.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="operational">Operacional</option>
                  <option value="maintenance">Em Manutenção</option>
                  <option value="broken">Com Problema</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Data de Aquisição</label>
                <input 
                  type="date" 
                  name="purchaseDate"
                  value={formState.purchaseDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Observações</label>
              <textarea 
                name="notes"
                value={formState.notes}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-20"
                placeholder="Informações adicionais sobre esta máquina..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Imagem da Máquina</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                />
                <button 
                  type="button"
                  onClick={() => toast.info("Funcionalidade de upload será implementada em breve!")}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md text-sm"
                >
                  Selecionar Arquivo
                </button>
              </div>
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

interface NewMaintenanceFormProps {
  onClose: () => void;
  onSave: (record: Omit<MaintenanceRecord, 'id'>) => void;
  machines: Machine[];
}

const NewMaintenanceForm: React.FC<NewMaintenanceFormProps> = ({ onClose, onSave, machines }) => {
  const [formState, setFormState] = useState<Omit<MaintenanceRecord, 'id'>>({
    machineId: machines[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    type: 'preventive',
    description: '',
    cost: 0,
    technician: '',
    parts: [],
    completed: false
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
    
    if (!formState.machineId || !formState.description) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    onSave(formState);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-agro-dark">Agendar Manutenção</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Trash2 size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Máquina*</label>
              <select 
                name="machineId"
                value={formState.machineId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                {machines.map(machine => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name} ({machine.code})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Tipo de Manutenção*</label>
              <select 
                name="type"
                value={formState.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="preventive">Preventiva</option>
                <option value="corrective">Corretiva</option>
                <option value="regular">Regular</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Data Programada*</label>
              <input 
                type="date" 
                name="date"
                value={formState.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Descrição*</label>
              <textarea 
                name="description"
                value={formState.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-20"
                placeholder="Descreva o serviço a ser realizado..."
                required
              ></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Custo Estimado (R$)</label>
                <input 
                  type="number" 
                  name="cost"
                  value={formState.cost}
                  onChange={handleNumberChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-agro-text-light mb-1">Técnico Responsável</label>
                <input 
                  type="text" 
                  name="technician"
                  value={formState.technician || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Nome do técnico"
                />
              </div>
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
              Agendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface MachineDetailsProps {
  machine: Machine;
  maintenanceRecords: MaintenanceRecord[];
  onClose: () => void;
}

const MachineDetails: React.FC<MachineDetailsProps> = ({ machine, maintenanceRecords, onClose }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'maintenance'>('details');
  
  const handleNotImplemented = () => {
    toast.info("Esta funcionalidade será implementada em breve!");
  };
  
  const getStatusColor = (status: Machine['status']) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'broken':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status: Machine['status']) => {
    switch (status) {
      case 'operational':
        return 'Operacional';
      case 'maintenance':
        return 'Em Manutenção';
      case 'broken':
        return 'Com Problema';
      default:
        return status;
    }
  };
  
  const getTypeIcon = (type: Machine['type']) => {
    switch (type) {
      case 'tractor':
        return <Tractor className="text-agro-primary" />;
      case 'plane':
        return <PlaneTakeoff className="text-agro-primary" />;
      case 'implement':
        return <Wrench className="text-agro-primary" />;
      default:
        return <Tractor className="text-agro-primary" />;
    }
  };
  
  const getMachineImageUrl = (machine: Machine) => {
    return machine.image || 'https://i.imgur.com/placeholder.jpg';
  };
  
  const filteredMaintenanceRecords = maintenanceRecords.filter(record => record.machineId === machine.id);
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {getTypeIcon(machine.type)}
            <h3 className="text-xl font-semibold text-agro-dark ml-2">{machine.name}</h3>
            <span className={`ml-3 px-2 py-1 text-xs rounded-full ${getStatusColor(machine.status)}`}>
              {getStatusText(machine.status)}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Trash2 size={20} />
          </button>
        </div>
        
        <div className="mb-4 border-b">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 transition-colors ${
                activeTab === 'details'
                  ? 'border-b-2 border-agro-primary text-agro-primary font-medium'
                  : 'text-agro-text-light hover:text-agro-primary'
              }`}
            >
              Detalhes da Máquina
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-4 py-2 transition-colors ${
                activeTab === 'maintenance'
                  ? 'border-b-2 border-agro-primary text-agro-primary font-medium'
                  : 'text-agro-text-light hover:text-agro-primary'
              }`}
            >
              Histórico de Manutenção
            </button>
          </div>
        </div>
        
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="rounded-lg overflow-hidden border h-64">
                <img 
                  src={getMachineImageUrl(machine)}
                  alt={machine.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-agro-text-light">Código:</span>
                  <span className="font-medium">{machine.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-agro-text-light">Modelo:</span>
                  <span>{machine.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-agro-text-light">Horímetro:</span>
                  <span>{machine.hoursUsed} horas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-agro-text-light">Custo/Hora:</span>
                  <span>R$ {machine.costPerHour.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-agro-text-light">Data de Aquisição:</span>
                  <span>{machine.purchaseDate}</span>
                </div>
                {machine.lastMaintenanceDate && (
                  <div className="flex justify-between">
                    <span className="text-agro-text-light">Última Manutenção:</span>
                    <span>{machine.lastMaintenanceDate}</span>
                  </div>
                )}
                {machine.nextMaintenance && (
                  <div className="flex justify-between">
                    <span className="text-agro-text-light">Próxima Manutenção:</span>
                    <span className="font-medium">{machine.nextMaintenance}</span>
                  </div>
                )}
              </div>
              
              {machine.implements && machine.implements.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Implementos Compatíveis</h4>
                  <div className="space-y-1">
                    {machine.implements.map(imp => (
                      <div 
                        key={imp}
                        className="p-2 bg-gray-50 rounded flex items-center justify-between cursor-pointer hover:bg-gray-100"
                        onClick={handleNotImplemented}
                      >
                        <span>{imp}</span>
                        <ArrowRight size={16} className="text-agro-text-light" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {machine.notes && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Observações</h4>
                  <p className="text-sm p-3 bg-gray-50 rounded">{machine.notes}</p>
                </div>
              )}
            </div>
            
            <div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Custos Operacionais</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Custo Diário (8h):</span>
                      <span className="font-medium">R$ {(machine.costPerHour * 8).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Custo Mensal (176h):</span>
                      <span className="font-medium">R$ {(machine.costPerHour * 176).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Custo Anual (2112h):</span>
                      <span className="font-medium">R$ {(machine.costPerHour * 2112).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <h5 className="font-medium mb-2">Custos de Manutenção</h5>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Total Gasto:</span>
                      <span className="font-medium">
                        R$ {filteredMaintenanceRecords.reduce((sum, record) => sum + record.cost, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Custo / Hora:</span>
                      <span className="font-medium">
                        R$ {machine.hoursUsed > 0 
                          ? (filteredMaintenanceRecords.reduce((sum, record) => sum + record.cost, 0) / machine.hoursUsed).toFixed(2) 
                          : '0.00'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <h5 className="font-medium mb-2">Próximas Manutenções</h5>
                    {machine.nextMaintenance ? (
                      <div className="p-3 bg-yellow-50 rounded-md text-sm">
                        <div className="flex items-center text-yellow-800">
                          <Calendar size={16} className="mr-2" />
                          <span className="font-medium">Agendada para {machine.nextMaintenance}</span>
                        </div>
                        <p className="mt-1 text-yellow-700">
                          Manutenção preventiva recomendada baseada no uso atual.
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-green-50 rounded-md text-sm">
                        <div className="flex items-center text-green-800">
                          <CheckCircle size={16} className="mr-2" />
                          <span className="font-medium">Sem manutenções programadas</span>
                        </div>
                        <p className="mt-1 text-green-700">
                          Máquina em dia com as manutenções recomendadas.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 border rounded-lg p-4">
                <h4 className="font-medium mb-3">Desempenho e Utilização</h4>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Utilização no mês:</span>
                    <span>48 horas</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 rounded-full bg-agro-primary" style={{ width: '27%' }}></div>
                  </div>
                  <p className="text-xs text-agro-text-light mt-1">27% da capacidade total (176h)</p>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Consumo de combustível:</span>
                    <span>12L/h</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 rounded-full bg-yellow-500" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-agro-text-light mt-1">75% da eficiência esperada</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Eficiência operacional:</span>
                    <span>Boa</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-agro-text-light mt-1">85% da média esperada</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'maintenance' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Histórico de Manutenção</h4>
              <button
                onClick={handleNotImplemented}
                className="flex items-center text-sm text-agro-primary"
              >
                <Plus size={16} className="mr-1" />
                <span>Agendar Nova Manutenção</span>
              </button>
            </div>
            
            {filteredMaintenanceRecords.length > 0 ? (
              <div className="space-y-4">
                {filteredMaintenanceRecords.map(record => (
                  <div 
                    key={record.id}
                    className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            record.type === 'preventive' 
                              ? 'bg-green-100 text-green-800' 
                              : record.type === 'corrective'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {record.type === 'preventive' 
                              ? 'Preventiva' 
                              : record.type === 'corrective'
                                ? 'Corretiva'
                                : 'Regular'}
                          </span>
                          <span className="ml-2 text-sm text-agro-text-light">{record.date}</span>
                        </div>
                        <h5 className="font-medium mt-1">{record.description}</h5>
                      </div>
                      <span className="font-medium text-agro-primary">R$ {record.cost.toFixed(2)}</span>
                    </div>
                    
                    {record.technician && (
                      <div className="mt-2 text-sm">
                        <span className="text-agro-text-light">Técnico:</span>
                        <span className="ml-1">{record.technician}</span>
                      </div>
                    )}
                    
                    {record.parts && record.parts.length > 0 && (
                      <div className="mt-2">
                        <h6 className="text-sm text-agro-text-light mb-1">Peças utilizadas:</h6>
                        <div className="text-sm bg-gray-50 p-2 rounded">
                          {record.parts.map((part, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{part.name} (x{part.quantity})</span>
                              <span>R$ {(part.unitCost * part.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-3 pt-2 border-t flex justify-between items-center">
                      <div className="flex items-center">
                        <span className={`flex items-center text-xs ${
                          record.completed 
                            ? 'text-green-600' 
                            : 'text-yellow-600'
                        }`}>
                          {record.completed 
                            ? <CheckCircle size={14} className="mr-1" />
                            : <Clock size={14} className="mr-1" />
                          }
                          {record.completed ? 'Concluída' : 'Pendente'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleNotImplemented}
                          className="p-1 text-agro-text-light hover:text-agro-primary"
                        >
                          <FileText size={16} />
                        </button>
                        <button
                          onClick={handleNotImplemented}
                          className="p-1 text-agro-text-light hover:text-agro-primary"
                        >
                          <Edit3 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                  <Wrench size={24} className="text-agro-text-light" />
                </div>
                <h5 className="font-medium text-agro-dark">Nenhuma manutenção registrada</h5>
                <p className="text-sm text-agro-text-light mt-1">
                  Agende manutenções preventivas para otimizar a vida útil do equipamento.
                </p>
                <button
                  onClick={handleNotImplemented}
                  className="mt-4 px-4 py-2 border border-agro-primary text-agro-primary rounded-md hover:bg-agro-primary hover:text-white transition-colors"
                >
                  Agendar Primeira Manutenção
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const MachineManagement: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>(SAMPLE_MACHINES);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>(SAMPLE_MAINTENANCE);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<Machine['type'] | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<Machine['status'] | 'all'>('all');
  const [isAddMachineOpen, setIsAddMachineOpen] = useState(false);
  const [isAddMaintenanceOpen, setIsAddMaintenanceOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  
  const handleAddMachine = (machine: Omit<Machine, 'id'>) => {
    const newMachine: Machine = {
      ...machine,
      id: `${machines.length + 1}`,
    };
    setMachines([...machines, newMachine]);
    toast.success("Máquina adicionada com sucesso!");
  };
  
  const handleAddMaintenance = (maintenance: Omit<MaintenanceRecord, 'id'>) => {
    const newMaintenance: MaintenanceRecord = {
      ...maintenance,
      id: `m${maintenanceRecords.length + 1}`,
    };
    setMaintenanceRecords([...maintenanceRecords, newMaintenance]);
    
    // Update machine's lastMaintenanceDate if the new record is completed
    if (maintenance.completed) {
      setMachines(prev => prev.map(machine => {
        if (machine.id === maintenance.machineId) {
          return {
            ...machine,
            lastMaintenanceDate: maintenance.date
          };
        }
        return machine;
      }));
    }
    
    toast.success("Manutenção agendada com sucesso!");
  };
  
  const handleOpenMachineDetails = (machine: Machine) => {
    setSelectedMachine(machine);
  };
  
  const getTypeIcon = (type: Machine['type']) => {
    switch (type) {
      case 'tractor':
        return <Tractor className="text-agro-primary" />;
      case 'plane':
        return <PlaneTakeoff className="text-agro-primary" />;
      case 'implement':
        return <Wrench className="text-agro-primary" />;
      default:
        return <Tractor className="text-agro-primary" />;
    }
  };
  
  const getStatusColor = (status: Machine['status']) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'broken':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status: Machine['status']) => {
    switch (status) {
      case 'operational':
        return 'Operacional';
      case 'maintenance':
        return 'Em Manutenção';
      case 'broken':
        return 'Com Problema';
      default:
        return status;
    }
  };
  
  const getMachineTypeText = (type: Machine['type']) => {
    switch (type) {
      case 'tractor':
        return 'Trator';
      case 'harvester':
        return 'Colheitadeira';
      case 'sprayer':
        return 'Pulverizador';
      case 'plane':
        return 'Avião';
      case 'implement':
        return 'Implemento';
      default:
        return 'Outro';
    }
  };
  
  const filteredMachines = machines.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          machine.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          machine.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || machine.type === filterType;
    const matchesStatus = filterStatus === 'all' || machine.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-agro-dark mb-4">Gestão de Máquinas e Equipamentos</h2>
      
      <div className="mb-4 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Buscar máquinas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as Machine['type'] | 'all')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">Todos os tipos</option>
            <option value="tractor">Tratores</option>
            <option value="harvester">Colheitadeiras</option>
            <option value="sprayer">Pulverizadores</option>
            <option value="plane">Aviões</option>
            <option value="implement">Implementos</option>
            <option value="other">Outros</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Machine['status'] | 'all')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">Todos os status</option>
            <option value="operational">Operacional</option>
            <option value="maintenance">Em Manutenção</option>
            <option value="broken">Com Problema</option>
          </select>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setIsAddMaintenanceOpen(true)}
            className="px-3 py-2 bg-agro-secondary text-agro-dark text-sm rounded-md hover:opacity-90 inline-flex items-center"
          >
            <Calendar size={16} className="mr-1" />
            Agendar Manutenção
          </button>
          
          <button
            onClick={() => setIsAddMachineOpen(true)}
            className="px-3 py-2 bg-agro-primary text-white text-sm rounded-md hover:bg-agro-primary-dark inline-flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Nova Máquina
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-3 text-left text-xs font-medium text-agro-text-light border-b">Tipo</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-agro-text-light border-b">Código</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-agro-text-light border-b">Nome</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-agro-text-light border-b">Modelo</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-agro-text-light border-b">Horímetro</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-agro-text-light border-b">Status</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-agro-text-light border-b">Próx. Manutenção</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-agro-text-light border-b">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMachines.map(machine => (
              <tr key={machine.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleOpenMachineDetails(machine)}>
                <td className="py-2 px-3">
                  <div className="flex items-center">
                    {getTypeIcon(machine.type)}
                    <span className="ml-1 text-xs">{getMachineTypeText(machine.type)}</span>
                  </div>
                </td>
                <td className="py-2 px-3 text-sm font-medium">{machine.code}</td>
                <td className="py-2 px-3 text-sm">{machine.name}</td>
                <td className="py-2 px-3 text-sm">{machine.model}</td>
                <td className="py-2 px-3 text-sm">{machine.hoursUsed} horas</td>
                <td className="py-2 px-3">
                  <span className={`inline-flex text-xs rounded-full px-2 py-1 ${getStatusColor(machine.status)}`}>
                    {getStatusText(machine.status)}
                  </span>
                </td>
                <td className="py-2 px-3 text-sm">
                  {machine.nextMaintenance || <span className="text-green-500 text-xs">Em dia</span>}
                </td>
                <td className="py-2 px-3">
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenMachineDetails(machine);
                      }}
                      className="p-1 text-agro-text-light hover:text-agro-primary"
                    >
                      <FileText size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.info("Funcionalidade de edição será implementada em breve!");
                      }}
                      className="p-1 text-agro-text-light hover:text-agro-primary"
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {isAddMachineOpen && (
        <NewMachineForm
          onClose={() => setIsAddMachineOpen(false)}
          onSave={handleAddMachine}
        />
      )}
      
      {isAddMaintenanceOpen && (
        <NewMaintenanceForm
          onClose={() => setIsAddMaintenanceOpen(false)}
          onSave={handleAddMaintenance}
          machines={machines}
        />
      )}
      
      {selectedMachine && (
        <MachineDetails
          machine={selectedMachine}
          maintenanceRecords={maintenanceRecords}
          onClose={() => setSelectedMachine(null)}
        />
      )}
    </div>
  );
};

export default MachineManagement;
