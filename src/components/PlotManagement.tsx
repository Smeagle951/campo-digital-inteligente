
import React, { useState } from 'react';
import { Camera, CloudUpload, AlertTriangle, MessageSquare, Plus, Edit3, Trash2, Layers, ThermometerSun, BugOff, Plant } from 'lucide-react';
import { toast } from 'sonner';

interface Plot {
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

interface MonitoringEntry {
  id: string;
  date: string;
  type: 'praga' | 'doenca' | 'deficiencia' | 'outro';
  description: string;
  severity: 'baixa' | 'media' | 'alta';
  images: string[];
  comments: string;
  recommendations: string;
}

const samplePlots: Plot[] = [
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

const sampleMonitoringEntries: { [key: string]: MonitoringEntry[] } = {
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

interface PlotMapProps {
  plot: Plot;
  onAddMonitoring: () => void;
}

const PlotMap: React.FC<PlotMapProps> = ({ plot, onAddMonitoring }) => {
  const handleNotImplemented = () => {
    toast.info("Esta funcionalidade será implementada em breve!");
  };
  
  return (
    <div className="relative w-full h-64 border rounded-lg overflow-hidden">
      {/* 3D visualization placeholder */}
      <div 
        className="w-full h-full bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://i.imgur.com/XQ79TLj.jpg')" 
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Plot critical areas markers */}
        {plot.criticalAreas?.map((area, index) => (
          <div 
            key={index}
            className={`absolute w-8 h-8 flex items-center justify-center rounded-full cursor-pointer
              ${area.severity === 'alta' ? 'bg-red-500/70' : 
                area.severity === 'media' ? 'bg-yellow-500/70' : 'bg-blue-500/70'}`}
            style={{ 
              left: `${area.position.x}%`, 
              top: `${area.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={handleNotImplemented}
            title={area.description}
          >
            {area.type === 'praga' ? <BugOff size={16} color="white" /> : 
             area.type === 'doenca' ? <AlertTriangle size={16} color="white" /> : 
             area.type === 'deficiencia' ? <Plant size={16} color="white" /> :
             <AlertTriangle size={16} color="white" />}
          </div>
        ))}
      </div>
      
      {/* Controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 flex justify-between items-center">
        <div>
          <span className="font-medium">{plot.name}</span>
          <span className="text-sm ml-2">{plot.area} ha • {plot.crop}</span>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={onAddMonitoring}
            className="p-2 bg-agro-primary rounded-full hover:bg-agro-dark transition-colors"
            title="Adicionar Monitoramento"
          >
            <Plus size={16} />
          </button>
          <button 
            onClick={handleNotImplemented}
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
            title="Visualizar Drone 3D"
          >
            <Layers size={16} />
          </button>
          <button 
            onClick={handleNotImplemented}
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
            title="Editar Talhão"
          >
            <Edit3 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface MonitoringEntryCardProps {
  entry: MonitoringEntry;
}

const MonitoringEntryCard: React.FC<MonitoringEntryCardProps> = ({ entry }) => {
  const handleNotImplemented = () => {
    toast.info("Esta funcionalidade será implementada em breve!");
  };
  
  return (
    <div className={`border rounded-md p-4 my-2
      ${entry.severity === 'alta' ? 'bg-red-50 border-red-200' : 
        entry.severity === 'media' ? 'bg-yellow-50 border-yellow-200' : 
        'bg-blue-50 border-blue-200'}`}>
      <div className="flex justify-between mb-2">
        <h4 className="font-medium">
          {entry.type === 'praga' ? 'Praga: ' : 
           entry.type === 'doenca' ? 'Doença: ' : 
           entry.type === 'deficiencia' ? 'Deficiência: ' : ''}
          {entry.description}
        </h4>
        <span className="text-sm text-agro-text-light">{entry.date}</span>
      </div>
      
      {entry.images.length > 0 && (
        <div className="flex overflow-x-auto my-2 space-x-2 pb-2">
          {entry.images.map((img, idx) => (
            <img 
              key={idx} 
              src={img} 
              alt={`Monitoramento ${entry.description}`} 
              className="w-24 h-24 object-cover rounded-md cursor-pointer" 
              onClick={handleNotImplemented}
            />
          ))}
          <button 
            onClick={handleNotImplemented}
            className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Camera size={24} className="text-agro-text-light" />
          </button>
        </div>
      )}
      
      <div className="text-sm mb-2">
        <p><strong>Comentários:</strong> {entry.comments}</p>
        <p className="mt-1"><strong>Recomendações:</strong> {entry.recommendations}</p>
      </div>
      
      <div className="flex justify-end mt-2">
        <button 
          onClick={handleNotImplemented}
          className="text-sm bg-agro-primary text-white px-3 py-1 rounded hover:bg-agro-dark transition-colors"
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};

interface NewMonitoringFormProps {
  plotId: string;
  onClose: () => void;
}

const NewMonitoringForm: React.FC<NewMonitoringFormProps> = ({ plotId, onClose }) => {
  const [type, setType] = useState<'praga' | 'doenca' | 'deficiencia' | 'outro'>('praga');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'baixa' | 'media' | 'alta'>('baixa');
  const [comments, setComments] = useState('');
  
  const handleNotImplemented = () => {
    toast.success("Monitoramento adicionado com sucesso!");
    onClose();
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-agro-dark mb-4">Novo Monitoramento</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-agro-text-light mb-1">Tipo de Ocorrência</label>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="praga">Praga</option>
            <option value="doenca">Doença</option>
            <option value="deficiencia">Deficiência Nutricional</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-agro-text-light mb-1">Descrição</label>
          <input 
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Ex: Percevejo Marrom"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-agro-text-light mb-1">Severidade</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input 
                type="radio"
                checked={severity === 'baixa'}
                onChange={() => setSeverity('baixa')}
                className="mr-2"
              />
              <span>Baixa</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio"
                checked={severity === 'media'}
                onChange={() => setSeverity('media')}
                className="mr-2"
              />
              <span>Média</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio"
                checked={severity === 'alta'}
                onChange={() => setSeverity('alta')}
                className="mr-2"
              />
              <span>Alta</span>
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-agro-text-light mb-1">Fotos</label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
            <CloudUpload className="mx-auto text-agro-text-light" />
            <p className="mt-2 text-sm text-agro-text-light">Clique para adicionar ou arrastar e soltar</p>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              multiple
            />
            <button 
              onClick={handleNotImplemented}
              className="mt-2 text-sm text-agro-primary hover:underline"
            >
              Selecionar fotos
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-agro-text-light mb-1">Comentários e Observações</label>
          <textarea 
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 h-20"
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-agro-text-light hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button 
            onClick={handleNotImplemented}
            className="px-4 py-2 bg-agro-primary text-white rounded-md hover:bg-agro-dark"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

const PlotManagement: React.FC = () => {
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
  const [showNewMonitoringForm, setShowNewMonitoringForm] = useState(false);
  const [view, setView] = useState<'list' | 'new'>('list');
  
  const handleAddPlot = () => {
    toast.info("A funcionalidade de adicionar novos talhões será implementada em breve!");
  };
  
  const handleAddMonitoring = () => {
    setShowNewMonitoringForm(true);
  };
  
  const handleCloseMonitoringForm = () => {
    setShowNewMonitoringForm(false);
  };
  
  const plot = selectedPlot ? samplePlots.find(p => p.id === selectedPlot) : null;
  const monitoringEntries = selectedPlot ? sampleMonitoringEntries[selectedPlot] || [] : [];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Monitoramento de Talhões</h2>
      
      {!selectedPlot && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Talhões Disponíveis</h3>
            <button 
              onClick={() => setView('new')}
              className="px-3 py-1 bg-agro-primary text-white rounded-md text-sm hover:bg-agro-dark transition-colors flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Novo Talhão
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {samplePlots.map(plot => (
              <div 
                key={plot.id}
                className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedPlot(plot.id)}
              >
                <div 
                  className="h-32 bg-cover bg-center" 
                  style={{ 
                    backgroundImage: "url('https://i.imgur.com/XQ79TLj.jpg')" 
                  }}
                >
                  <div className="h-full w-full flex items-end p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="text-white">
                      <h4 className="font-medium">{plot.name}</h4>
                      <p className="text-sm">{plot.area} ha • {plot.crop}</p>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex justify-between text-sm">
                    <span>Saúde da Plantação:</span>
                    <span 
                      className={
                        plot.healthIndex > 80 ? "text-green-600" : 
                        plot.healthIndex > 60 ? "text-yellow-600" : 
                        "text-red-600"
                      }
                    >
                      {plot.healthIndex}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        plot.healthIndex > 80 ? "bg-green-500" : 
                        plot.healthIndex > 60 ? "bg-yellow-500" : 
                        "bg-red-500"
                      }`}
                      style={{ width: `${plot.healthIndex}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm text-agro-text-light">
                    <span>Última Atualização: {plot.lastUpdated}</span>
                    <div className={`px-2 py-0.5 rounded-full text-xs text-white
                      ${plot.status === 'plantio' ? 'bg-dashboard-plantio' : 
                        plot.status === 'crescimento' ? 'bg-dashboard-pulverizacao-terrestre' :
                        plot.status === 'maturacao' ? 'bg-dashboard-pulverizacao-aerea' :
                        plot.status === 'colheita' ? 'bg-dashboard-colheita' :
                        'bg-gray-500'}`}
                    >
                      {plot.status === 'plantio' ? 'Plantio' : 
                       plot.status === 'crescimento' ? 'Crescimento' : 
                       plot.status === 'maturacao' ? 'Maturação' : 
                       plot.status === 'colheita' ? 'Colheita' : 
                       plot.status === 'preparo' ? 'Preparo' : plot.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div 
              className="border border-dashed rounded-lg h-48 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={handleAddPlot}
            >
              <div className="text-center">
                <Plus size={24} className="mx-auto text-agro-text-light" />
                <p className="mt-2 text-agro-text-light">Adicionar Novo Talhão</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedPlot && plot && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => setSelectedPlot(null)}
              className="text-agro-primary hover:underline flex items-center"
            >
              ← Voltar para a Lista de Talhões
            </button>
            <div className="flex space-x-2">
              <button 
                onClick={handleAddMonitoring}
                className="px-3 py-1 bg-agro-primary text-white rounded-md text-sm hover:bg-agro-dark transition-colors"
              >
                Novo Monitoramento
              </button>
            </div>
          </div>
          
          <h3 className="font-medium mb-2">{plot.name} - {plot.crop}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <PlotMap plot={plot} onAddMonitoring={handleAddMonitoring} />
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Informações do Talhão</h4>
                <div className="border rounded-md p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-agro-text-light">Área:</span>
                      <span className="ml-1">{plot.area} hectares</span>
                    </div>
                    <div>
                      <span className="text-agro-text-light">Cultura:</span>
                      <span className="ml-1">{plot.crop}</span>
                    </div>
                    <div>
                      <span className="text-agro-text-light">Status:</span>
                      <span className="ml-1">
                        {plot.status === 'plantio' ? 'Plantio' : 
                         plot.status === 'crescimento' ? 'Crescimento' : 
                         plot.status === 'maturacao' ? 'Maturação' : 
                         plot.status === 'colheita' ? 'Colheita' : 
                         plot.status === 'preparo' ? 'Preparo' : plot.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-agro-text-light">Índice de Saúde:</span>
                      <span 
                        className={`ml-1 ${
                          plot.healthIndex > 80 ? "text-green-600" : 
                          plot.healthIndex > 60 ? "text-yellow-600" : 
                          "text-red-600"
                        }`}
                      >
                        {plot.healthIndex}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Histórico de Monitoramento</h4>
              {monitoringEntries.length > 0 ? (
                <div className="space-y-2">
                  {monitoringEntries.map(entry => (
                    <MonitoringEntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              ) : (
                <div className="border rounded-md p-6 bg-gray-50 text-center">
                  <AlertTriangle className="mx-auto text-agro-text-light" />
                  <p className="mt-2 text-agro-text-light">Nenhum monitoramento registrado para este talhão.</p>
                  <button 
                    onClick={handleAddMonitoring}
                    className="mt-3 px-3 py-1 bg-agro-primary text-white rounded-md text-sm hover:bg-agro-dark transition-colors"
                  >
                    Adicionar Primeiro Monitoramento
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* New monitoring modal */}
      {showNewMonitoringForm && selectedPlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <NewMonitoringForm 
            plotId={selectedPlot} 
            onClose={handleCloseMonitoringForm} 
          />
        </div>
      )}
    </div>
  );
};

export default PlotManagement;
