
import React from 'react';
import { 
  BarChart3, 
  LineChart, 
  Calendar, 
  CloudRain, 
  Tractor, 
  MapPin, 
  ClipboardList, 
  MessageSquare, 
  Settings,
  ShoppingCart
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const menuItems = [
    { id: 'overview', title: 'Visão Geral', icon: <BarChart3 size={20} /> },
    { id: 'financial', title: 'Gestão Financeira', icon: <LineChart size={20} /> },
    { id: 'planning', title: 'Planejamento', icon: <Calendar size={20} /> },
    { id: 'weather', title: 'Clima & Solo', icon: <CloudRain size={20} /> },
    { id: 'market', title: 'Comercialização', icon: <ShoppingCart size={20} /> },
    { id: 'machines', title: 'Máquinas', icon: <Tractor size={20} /> },
    { id: 'map', title: 'Talhões no Mapa', icon: <MapPin size={20} /> },
    { id: 'monitoring', title: 'Monitoramento', icon: <ClipboardList size={20} /> },
    { id: 'assistance', title: 'Assistência', icon: <MessageSquare size={20} /> },
    { id: 'settings', title: 'Configurações', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-agro-primary">Sistema Agrícola</h2>
        <p className="text-sm text-agro-text-light">Fazenda Esperança</p>
      </div>
      <div className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center p-3 rounded-md text-left transition-colors ${
                  activeModule === item.id
                    ? 'bg-agro-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
