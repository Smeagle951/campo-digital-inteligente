import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Plot } from '../types/plot';
import { samplePlots, sampleMonitoringEntries } from '../data/samplePlots';
import PlotMap from './plot/PlotMap';
import MonitoringEntryCard from './plot/MonitoringEntryCard';
import NewMonitoringForm from './plot/NewMonitoringForm';

const PlotManagement: React.FC = () => {
  const [plots, setPlots] = useState<Plot[]>(samplePlots);
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
  const [showNewMonitoringForm, setShowNewMonitoringForm] = useState(false);
  const [view, setView] = useState<'list' | 'new'>('list');
  
  useEffect(() => {
    // Get plots from EnhancedFarmMap component's data
    const farmMapPlots = localStorage.getItem('farmPlots');
    if (farmMapPlots) {
      try {
        const parsedPlots = JSON.parse(farmMapPlots);
        setPlots((currentPlots) => {
          // Merge existing monitoring data with farm map plots
          const mergedPlots = parsedPlots.map((farmPlot: any) => {
            const existingPlot = currentPlots.find(p => p.id === farmPlot.id);
            return {
              ...farmPlot,
              healthIndex: existingPlot?.healthIndex || 85,
              status: existingPlot?.status || 'preparo',
              lastUpdated: existingPlot?.lastUpdated || new Date().toISOString().split('T')[0],
              criticalAreas: existingPlot?.criticalAreas || []
            };
          });
          return mergedPlots;
        });
      } catch (error) {
        console.error('Error parsing farm plots:', error);
      }
    }
  }, []);

  const handleAddPlot = () => {
    toast.info("A funcionalidade de adicionar novos talhões será implementada em breve!");
  };
  
  const handleAddMonitoring = () => {
    setShowNewMonitoringForm(true);
  };
  
  const handleCloseMonitoringForm = () => {
    setShowNewMonitoringForm(false);
  };
  
  const plot = selectedPlot ? plots.find(p => p.id === selectedPlot) : null;
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
            {plots.map(plot => (
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
