
import React, { useState } from 'react';
import { CloudUpload, X } from 'lucide-react';
import { toast } from 'sonner';

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

export default NewMonitoringForm;

