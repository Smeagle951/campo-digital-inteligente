
import React, { useState } from 'react';
import { Cloud, Bluetooth } from 'lucide-react';

interface ImportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportDataModal: React.FC<ImportDataModalProps> = ({ isOpen, onClose }) => {
  const [importMethod, setImportMethod] = useState<'cloud' | 'bluetooth' | null>(null);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Importar Dados</h2>
        
        <div className="space-y-4">
          <button 
            onClick={() => setImportMethod('cloud')}
            className={`w-full flex items-center p-4 border rounded-lg ${
              importMethod === 'cloud' ? 'border-agro-primary bg-blue-50' : 'border-gray-200'
            }`}
          >
            <Cloud className="text-blue-500 mr-4" size={24} />
            <div className="text-left">
              <h3 className="font-medium">Importar via Nuvem</h3>
              <p className="text-sm text-gray-500">Conecte-se aos serviços de armazenamento em nuvem</p>
            </div>
          </button>
          
          <button 
            onClick={() => setImportMethod('bluetooth')}
            className={`w-full flex items-center p-4 border rounded-lg ${
              importMethod === 'bluetooth' ? 'border-agro-primary bg-blue-50' : 'border-gray-200'
            }`}
          >
            <Bluetooth className="text-blue-800 mr-4" size={24} />
            <div className="text-left">
              <h3 className="font-medium">Importar via Bluetooth</h3>
              <p className="text-sm text-gray-500">Conecte-se a um dispositivo próximo via Bluetooth</p>
            </div>
          </button>
        </div>
        
        <div className="flex justify-end mt-6 space-x-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            Cancelar
          </button>
          <button 
            disabled={!importMethod}
            className={`px-4 py-2 rounded-md text-white ${
              importMethod ? 'bg-agro-primary' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportDataModal;
