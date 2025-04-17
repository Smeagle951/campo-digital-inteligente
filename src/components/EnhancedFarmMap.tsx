import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Plus, Trash2, Edit3, Crop, ArrowRight, Check, X, Map } from 'lucide-react';
import { toast } from 'sonner';

interface Plot {
  id: string;
  name: string;
  area: number; // in hectares
  crop: string;
  variety?: string;
  status: 'plantio' | 'preparo' | 'adubacao' | 'pulverizacao-terrestre' | 'pulverizacao-aerea' | 'colheita' | 'descanso';
  coordinates: {
    lat: number;
    lng: number;
  }[];
  color: string;
}

const SAMPLE_PLOTS: Plot[] = [
  {
    id: '1',
    name: 'Talhão 1',
    area: 50,
    crop: 'Soja',
    variety: 'BMX Potência',
    status: 'plantio',
    coordinates: [
      { lat: -13.002, lng: -55.995 },
      { lat: -13.002, lng: -55.985 },
      { lat: -13.007, lng: -55.985 },
      { lat: -13.007, lng: -55.995 }
    ],
    color: '#48BB78'
  },
  {
    id: '2',
    name: 'Talhão 2',
    area: 30,
    crop: 'Milho',
    variety: 'DKB 390',
    status: 'colheita',
    coordinates: [
      { lat: -13.009, lng: -55.995 },
      { lat: -13.009, lng: -55.985 },
      { lat: -13.014, lng: -55.985 },
      { lat: -13.014, lng: -55.995 }
    ],
    color: '#ED8936'
  },
  {
    id: '3',
    name: 'Talhão 3',
    area: 45,
    crop: 'Algodão',
    variety: 'FM 944',
    status: 'pulverizacao-terrestre',
    coordinates: [
      { lat: -13.002, lng: -55.983 },
      { lat: -13.002, lng: -55.975 },
      { lat: -13.010, lng: -55.975 },
      { lat: -13.010, lng: -55.983 }
    ],
    color: '#4299E1'
  }
];

const statusIcons = {
  'plantio': '🌱',
  'preparo': '🚜',
  'adubacao': '💧',
  'pulverizacao-terrestre': '🚜',
  'pulverizacao-aerea': '✈️',
  'colheita': '🌾',
  'descanso': '⏸️',
};

const statusLabels = {
  'plantio': 'Plantio',
  'preparo': 'Preparo de Solo',
  'adubacao': 'Adubação',
  'pulverizacao-terrestre': 'Pulverização Terrestre',
  'pulverizacao-aerea': 'Pulverização Aérea',
  'colheita': 'Colheita',
  'descanso': 'Descanso',
};

const statusColors = {
  'plantio': 'bg-dashboard-plantio',
  'preparo': 'bg-gray-500',
  'adubacao': 'bg-green-700',
  'pulverizacao-terrestre': 'bg-dashboard-pulverizacao-terrestre',
  'pulverizacao-aerea': 'bg-dashboard-pulverizacao-aerea',
  'colheita': 'bg-dashboard-colheita',
  'descanso': 'bg-gray-400',
};

interface NewPlotFormProps {
  onClose: () => void;
  onSave: (plot: Omit<Plot, 'id' | 'coordinates' | 'color'>) => void;
}

const NewPlotForm: React.FC<NewPlotFormProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [crop, setCrop] = useState('');
  const [variety, setVariety] = useState('');
  const [status, setStatus] = useState<Plot['status']>('preparo');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !area || !crop) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    onSave({
      name,
      area: parseFloat(area),
      crop,
      variety,
      status
    });
    
    toast.success("Talhão adicionado com sucesso! Agora você pode desenhar seus limites no mapa.");
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-agro-dark">Novo Talhão</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Nome do Talhão*</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Ex: Talhão Norte"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Área (hectares)*</label>
              <input 
                type="number" 
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Ex: 45"
                required
                min="0.1"
                step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Cultura*</label>
              <input 
                type="text" 
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Ex: Soja"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Variedade</label>
              <input 
                type="text" 
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Ex: BMX Potência"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-agro-text-light mb-1">Status Atual</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value as Plot['status'])}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="preparo">Preparo de Solo</option>
                <option value="plantio">Plantio</option>
                <option value="adubacao">Adubação</option>
                <option value="pulverizacao-terrestre">Pulverização Terrestre</option>
                <option value="pulverizacao-aerea">Pulverização Aérea</option>
                <option value="colheita">Colheita</option>
                <option value="descanso">Descanso</option>
              </select>
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
              Próximo: Desenhar no Mapa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface PlotDetailsCardProps {
  plot: Plot;
  onClose: () => void;
}

const PlotDetailsCard: React.FC<PlotDetailsCardProps> = ({ plot, onClose }) => {
  const handleDelete = () => {
    toast.info("A funcionalidade de exclusão será implementada em breve!");
    onClose();
  };
  
  const handleEdit = () => {
    toast.info("A funcionalidade de edição será implementada em breve!");
  };
  
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 w-full max-w-md mx-auto z-10">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{plot.name}</h3>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <div>
              <span className="text-agro-text-light">Área:</span>
              <span className="ml-1">{plot.area} hectares</span>
            </div>
            <div>
              <span className="text-agro-text-light">Cultura:</span>
              <span className="ml-1">{plot.crop}</span>
            </div>
            {plot.variety && (
              <div>
                <span className="text-agro-text-light">Variedade:</span>
                <span className="ml-1">{plot.variety}</span>
              </div>
            )}
            <div className="flex items-center">
              <span className="text-agro-text-light mr-1">Status:</span>
              <span className={`px-2 py-0.5 text-xs rounded-full text-white ${statusColors[plot.status]}`}>
                {statusLabels[plot.status]}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="mt-3 flex justify-end space-x-2">
        <button
          onClick={handleDelete}
          className="p-1 text-red-500 hover:bg-red-50 rounded"
        >
          <Trash2 size={18} />
        </button>
        <button
          onClick={handleEdit}
          className="p-1 text-blue-500 hover:bg-blue-50 rounded"
        >
          <Edit3 size={18} />
        </button>
      </div>
    </div>
  );
};

const EnhancedFarmMap: React.FC = () => {
  const [plots, setPlots] = useState<Plot[]>(SAMPLE_PLOTS);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [showNewPlotForm, setShowNewPlotForm] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  
  const handleMapClick = () => {
    toast.info("Clique para adicionar pontos ao talhão. Use o botão de finalizar quando terminar.");
  };
  
  const handleNotImplemented = () => {
    toast.info("Esta funcionalidade de mapa interativo será implementada em breve!");
  };
  
  const handleAddPlot = () => {
    setShowNewPlotForm(true);
  };
  
  const handlePlotClick = (plot: Plot) => {
    setSelectedPlot(plot);
  };
  
  const handleCloseDetails = () => {
    setSelectedPlot(null);
  };
  
  const handleSavePlot = (plotData: Omit<Plot, 'id' | 'coordinates' | 'color'>) => {
    const newPlot: Plot = {
      ...plotData,
      id: `temp-${Date.now()}`,
      coordinates: [
        { lat: -13.017, lng: -55.995 },
        { lat: -13.017, lng: -55.987 },
        { lat: -13.022, lng: -55.987 },
        { lat: -13.022, lng: -55.995 }
      ],
      color: '#9333EA'
    };
    
    const updatedPlots = [...plots, newPlot];
    setPlots(updatedPlots);
    localStorage.setItem('farmPlots', JSON.stringify(updatedPlots));
    
    handleNotImplemented();
  };
  
  useEffect(() => {
    const loadMap = () => {
      if (mapRef.current) {
        setTimeout(() => {
          setMapLoaded(true);
        }, 500);
      }
    };
    
    loadMap();
  }, []);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#3a7e4f]">Talhões no Mapa</h2>
        <button
          onClick={handleAddPlot}
          className="px-3 py-2 bg-agro-primary text-white rounded-md hover:bg-agro-dark transition-colors flex items-center"
        >
          <Plus size={16} className="mr-1" />
          Adicionar Talhão
        </button>
      </div>
      
      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <div 
          ref={mapRef}
          className="w-full h-full"
          onClick={selectedPlot ? undefined : handleMapClick}
        >
          {!mapLoaded ? (
            <div className="h-full w-full flex items-center justify-center">
              <div className="text-center">
                <Map className="animate-pulse h-16 w-16 text-agro-primary mx-auto" />
                <p className="mt-2 text-agro-text-light">Carregando mapa...</p>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full bg-cover bg-center" 
              style={{ 
                backgroundImage: "url('https://i.imgur.com/VLUdCwF.jpg')",
                cursor: selectedPlot ? 'default' : 'crosshair'
              }}
            >
              {plots.map((plot) => (
                <div 
                  key={plot.id}
                  onClick={() => handlePlotClick(plot)}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${(plots.indexOf(plot) * 20) + 10}%`,
                    top: `${(plots.indexOf(plot) * 15) + 30}%`,
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 border-white shadow-md"
                    style={{ backgroundColor: plot.color }}
                  >
                    {statusIcons[plot.status]}
                  </div>
                  <div className="mt-1 bg-white px-2 py-0.5 rounded text-xs text-center shadow">
                    {plot.name}
                  </div>
                </div>
              ))}
              
              <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                <button
                  onClick={handleNotImplemented}
                  className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                >
                  <Plus size={18} />
                </button>
                <button
                  onClick={handleNotImplemented}
                  className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                >
                  <Minus size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {selectedPlot && (
          <PlotDetailsCard 
            plot={selectedPlot} 
            onClose={handleCloseDetails} 
          />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-3">Lista de Talhões</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cultura</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {plots.map((plot) => (
                  <tr 
                    key={plot.id}
                    onClick={() => handlePlotClick(plot)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: plot.color }}
                        ></div>
                        {plot.name}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{plot.area} ha</td>
                    <td className="px-4 py-2 whitespace-nowrap">{plot.crop}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 py-0.5 text-xs rounded-full text-white ${statusColors[plot.status]}`}>
                        {statusLabels[plot.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Resumo da Fazenda</h3>
          <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
            <div className="flex justify-between">
              <span>Total de Talhões:</span>
              <span className="font-medium">{plots.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Área Total:</span>
              <span className="font-medium">{plots.reduce((sum, plot) => sum + plot.area, 0)} hectares</span>
            </div>
            <div className="flex justify-between">
              <span>Talhões em Plantio:</span>
              <span className="font-medium">{plots.filter(p => p.status === 'plantio').length}</span>
            </div>
            <div className="flex justify-between">
              <span>Talhões em Colheita:</span>
              <span className="font-medium">{plots.filter(p => p.status === 'colheita').length}</span>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Distribuição de Culturas</h4>
              <div className="space-y-2">
                {Array.from(new Set(plots.map(p => p.crop))).map(crop => {
                  const cropPlots = plots.filter(p => p.crop === crop);
                  const percentage = (cropPlots.reduce((sum, p) => sum + p.area, 0) / 
                    plots.reduce((sum, p) => sum + p.area, 0)) * 100;
                  
                  return (
                    <div key={crop}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{crop}</span>
                        <span>{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 rounded-full bg-agro-primary"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showNewPlotForm && (
        <NewPlotForm 
          onClose={() => setShowNewPlotForm(false)}
          onSave={handleSavePlot}
        />
      )}
    </div>
  );
};

const Minus: React.FC<{ size: number }> = ({ size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default EnhancedFarmMap;
