
import React from 'react';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';
import { MonitoringEntry } from '../../types/plot';

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

export default MonitoringEntryCard;

