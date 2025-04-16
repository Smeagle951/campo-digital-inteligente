
import React, { useState } from 'react';
import { Calendar, Cloud, CloudRain, Droplets, BarChart, Download, Plus, FileText, ThermometerSun } from 'lucide-react';
import { toast } from 'sonner';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

interface RainRecord {
  id: string;
  date: string;
  amount: number; // in mm
  location: string;
  notes?: string;
  technician: string;
}

// Sample data for display
const currentYear = new Date().getFullYear();
const SAMPLE_RAIN_DATA: RainRecord[] = [
  { id: '1', date: `${currentYear}-04-15`, amount: 12, location: 'Sede', notes: 'Chuva moderada durante a tarde', technician: 'Carlos Silva' },
  { id: '2', date: `${currentYear}-04-10`, amount: 8, location: 'Talhão 2', notes: 'Chuva leve pela manhã', technician: 'Carlos Silva' },
  { id: '3', date: `${currentYear}-04-05`, amount: 25, location: 'Sede', notes: 'Chuva forte à noite', technician: 'Ana Martins' },
  { id: '4', date: `${currentYear}-03-28`, amount: 15, location: 'Talhão 1', notes: 'Chuva moderada durante o dia todo', technician: 'Carlos Silva' },
  { id: '5', date: `${currentYear}-03-22`, amount: 5, location: 'Sede', notes: 'Chuva fraca', technician: 'Ana Martins' },
  { id: '6', date: `${currentYear}-03-15`, amount: 18, location: 'Talhão 3', notes: 'Chuva moderada a forte', technician: 'Carlos Silva' },
  { id: '7', date: `${currentYear}-03-10`, amount: 30, location: 'Sede', notes: 'Tempestade', technician: 'João Pereira' },
  { id: '8', date: `${currentYear}-03-05`, amount: 7, location: 'Talhão 2', notes: 'Chuva fraca', technician: 'Ana Martins' },
  { id: '9', date: `${currentYear}-02-28`, amount: 22, location: 'Sede', notes: 'Chuva forte', technician: 'Carlos Silva' },
  { id: '10', date: `${currentYear}-02-20`, amount: 13, location: 'Talhão 1', notes: 'Chuva moderada', technician: 'João Pereira' },
];

// Monthly rain data for charts
const MONTHLY_RAIN_DATA = [
  { month: 'Jan', amount: 240, average: 220 },
  { month: 'Fev', amount: 180, average: 190 },
  { month: 'Mar', amount: 70, average: 110 },
  { month: 'Abr', amount: 60, average: 80 },
  { month: 'Mai', amount: 30, average: 40 },
  { month: 'Jun', amount: 10, average: 15 },
  { month: 'Jul', amount: 5, average: 10 },
  { month: 'Ago', amount: 15, average: 20 },
  { month: 'Set', amount: 30, average: 50 },
  { month: 'Out', amount: 90, average: 100 },
  { month: 'Nov', amount: 150, average: 160 },
  { month: 'Dez', amount: 210, average: 200 },
];

// Daily rain data for the recent period
const DAILY_RAIN_DATA = SAMPLE_RAIN_DATA.map(record => ({
  date: new Date(record.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
  amount: record.amount
})).sort((a, b) => {
  const dateA = a.date.split('/').reverse().join('');
  const dateB = b.date.split('/').reverse().join('');
  return dateA.localeCompare(dateB);
});

interface NewRainRecordFormProps {
  onClose: () => void;
  onSave: (record: Omit<RainRecord, 'id'>) => void;
}

const NewRainRecordForm: React.FC<NewRainRecordFormProps> = ({ onClose, onSave }) => {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('Sede');
  const [notes, setNotes] = useState('');
  const [technician, setTechnician] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !amount || !location || !technician) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    onSave({
      date,
      amount: parseFloat(amount),
      location,
      notes,
      technician
    });
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-agro-dark">Registrar Nova Chuva</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <CloudRain size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Data*</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                max={today}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Quantidade (mm)*</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Ex: 12.5"
                min="0.1"
                step="0.1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Local*</label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="Sede">Sede</option>
                <option value="Talhão 1">Talhão 1</option>
                <option value="Talhão 2">Talhão 2</option>
                <option value="Talhão 3">Talhão 3</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Técnico Responsável*</label>
              <input 
                type="text" 
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Nome do técnico"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Observações</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-20"
                placeholder="Informações adicionais sobre a chuva..."
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

const RainTracker: React.FC = () => {
  const [rainRecords, setRainRecords] = useState<RainRecord[]>(SAMPLE_RAIN_DATA);
  const [showNewRecordForm, setShowNewRecordForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'chart'>('list');
  const [periodFilter, setPeriodFilter] = useState<'7d' | '30d' | 'year' | 'all'>('30d');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  
  const handleAddRecord = () => {
    setShowNewRecordForm(true);
  };
  
  const handleSaveRecord = (recordData: Omit<RainRecord, 'id'>) => {
    const newRecord: RainRecord = {
      ...recordData,
      id: `rain-${Date.now()}`
    };
    
    setRainRecords([newRecord, ...rainRecords]);
    toast.success("Registro de chuva adicionado com sucesso!");
  };
  
  const handleExportData = () => {
    toast.info("A funcionalidade de exportação será implementada em breve!");
  };
  
  const handleGenerateReport = () => {
    toast.info("A funcionalidade de relatórios será implementada em breve!");
  };
  
  // Filter records based on selected period
  const filterRecordsByPeriod = () => {
    const now = new Date();
    const filterDate = new Date();
    
    switch (periodFilter) {
      case '7d':
        filterDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        filterDate.setDate(now.getDate() - 30);
        break;
      case 'year':
        filterDate.setFullYear(now.getFullYear(), 0, 1);
        break;
      case 'all':
      default:
        return rainRecords;
    }
    
    return rainRecords.filter(record => new Date(record.date) >= filterDate);
  };
  
  // Further filter by location if selected
  const filteredRecords = filterRecordsByPeriod().filter(record => 
    locationFilter === 'all' || record.location === locationFilter
  );
  
  // Calculate statistics
  const totalRainfall = filteredRecords.reduce((sum, record) => sum + record.amount, 0);
  const averageRainfall = filteredRecords.length > 0 
    ? totalRainfall / filteredRecords.length 
    : 0;
  const maxRainfall = filteredRecords.length > 0 
    ? Math.max(...filteredRecords.map(record => record.amount)) 
    : 0;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Registro de Chuvas</h2>
      
      <div className="flex justify-between items-center mb-5">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'list'
                ? 'bg-agro-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-agro-text-light'
            }`}
          >
            <Calendar className="w-5 h-5 mr-1 inline" />
            <span>Registros</span>
          </button>
          <button
            onClick={() => setActiveTab('chart')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'chart'
                ? 'bg-agro-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-agro-text-light'
            }`}
          >
            <BarChart className="w-5 h-5 mr-1 inline" />
            <span>Gráficos</span>
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleGenerateReport}
            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <FileText className="w-5 h-5 mr-1 inline" />
            <span>Relatório</span>
          </button>
          <button
            onClick={handleExportData}
            className="px-3 py-2 bg-gray-200 text-agro-dark rounded-md hover:bg-gray-300 transition-colors"
          >
            <Download className="w-5 h-5 mr-1 inline" />
            <span>Exportar</span>
          </button>
          <button
            onClick={handleAddRecord}
            className="px-3 py-2 bg-agro-primary text-white rounded-md hover:bg-agro-dark transition-colors"
          >
            <Plus className="w-5 h-5 mr-1 inline" />
            <span>Novo Registro</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <CloudRain className="h-7 w-7 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-blue-700">Total de Chuva</p>
            <p className="text-2xl font-bold text-blue-900">{totalRainfall.toFixed(1)} mm</p>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Cloud className="h-7 w-7 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-green-700">Média por Registro</p>
            <p className="text-2xl font-bold text-green-900">{averageRainfall.toFixed(1)} mm</p>
          </div>
        </div>
        
        <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 flex items-center">
          <div className="bg-orange-100 p-3 rounded-full mr-4">
            <Droplets className="h-7 w-7 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-orange-700">Maior Registro</p>
            <p className="text-2xl font-bold text-orange-900">{maxRainfall.toFixed(1)} mm</p>
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <ThermometerSun className="h-7 w-7 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-purple-700">Total do Ano</p>
            <p className="text-2xl font-bold text-purple-900">
              {rainRecords
                .filter(r => new Date(r.date).getFullYear() === new Date().getFullYear())
                .reduce((sum, r) => sum + r.amount, 0)
                .toFixed(1)} mm
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-4 flex flex-wrap justify-between items-center">
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="year">Ano atual</option>
            <option value="all">Todos os registros</option>
          </select>
          
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          >
            <option value="all">Todos os locais</option>
            <option value="Sede">Sede</option>
            <option value="Talhão 1">Talhão 1</option>
            <option value="Talhão 2">Talhão 2</option>
            <option value="Talhão 3">Talhão 3</option>
          </select>
        </div>
        
        <div className="text-sm text-agro-text-light">
          Exibindo {filteredRecords.length} registro{filteredRecords.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {activeTab === 'list' ? (
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade (mm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Técnico</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 whitespace-nowrap text-sm">
                      {new Date(record.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        record.amount > 20 ? 'text-blue-600' : 
                        record.amount > 10 ? 'text-blue-500' : 'text-blue-400'
                      }`}>
                        {record.amount.toFixed(1)} mm
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm">
                      {record.location}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm">
                      {record.technician}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      {record.notes || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-agro-text-light">
                    Nenhum registro encontrado para o período selecionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Precipitação Mensal (mm)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={MONTHLY_RAIN_DATA}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" name="Precipitação Atual" fill="#3B82F6" />
                  <Bar dataKey="average" name="Média Histórica" fill="#9333EA" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Chuvas Recentes (mm)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={DAILY_RAIN_DATA}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    name="Precipitação (mm)" 
                    stroke="#3B82F6" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Distribuição por Local</h3>
              <div className="space-y-3">
                {Array.from(new Set(rainRecords.map(r => r.location))).map(location => {
                  const locationRecords = rainRecords.filter(r => r.location === location);
                  const totalAmount = locationRecords.reduce((sum, r) => sum + r.amount, 0);
                  const percentage = Math.round((totalAmount / rainRecords.reduce((sum, r) => sum + r.amount, 0)) * 100);
                  
                  return (
                    <div key={location}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{location}</span>
                        <span>{totalAmount.toFixed(1)} mm ({percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Comparativo Ano Anterior</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>{currentYear}: 540mm</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>{currentYear - 1}: 720mm</span>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Comparativo:</span>
                    <span className="text-red-500">-25%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-4 bg-blue-500 rounded-l-full" style={{ width: '100%' }}></div>
                    <div className="h-4 bg-green-500 rounded-l-full -mt-4" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-agro-text-light mt-1">Ano atual vs. ano anterior até a mesma data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* New record form modal */}
      {showNewRecordForm && (
        <NewRainRecordForm 
          onClose={() => setShowNewRecordForm(false)}
          onSave={handleSaveRecord}
        />
      )}
    </div>
  );
};

export default RainTracker;
