
import React from 'react';
import { BugOff, AlertTriangle, Sprout, Plus, Edit3, Layers } from 'lucide-react';
import { toast } from 'sonner';
import { Plot } from '../../types/plot';

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
      <div 
        className="w-full h-full bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://i.imgur.com/XQ79TLj.jpg')" 
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        
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
             area.type === 'deficiencia' ? <Sprout size={16} color="white" /> :
             <AlertTriangle size={16} color="white" />}
          </div>
        ))}
      </div>
      
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

export default PlotMap;

