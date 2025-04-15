import React, { useState } from 'react';
import { 
  Tractor, 
  Sprout, 
  PlaneTakeoff, 
  Wheat,
  LineChart,
  Cloud,
  Droplets,
  ThermometerSun,
  Calendar,
  MapPin,
  BarChart3,
  Settings,
  MessageSquare,
  Users,
  ClipboardList,
  CloudRain
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import FarmMap from '../components/FarmMap';
import ImportDataModal from '../components/ImportDataModal';

const Dashboard: React.FC = () => {
  const [activeModule, setActiveModule] = useState('overview');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const openImportModal = () => {
    setIsImportModalOpen(true);
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex">
      {/* Sidebar */}
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-agro-primary p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Sistema Agrícola Inteligente</h1>
            <div className="flex items-center space-x-2">
              <span className="text-white">Olá, Produtor</span>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-agro-primary">
                <span>P</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Welcome Area with Map */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-agro-dark mb-4">🌾 Bem-vindo, produtor! Vamos cuidar da sua fazenda juntos?</h2>
              
              <div className="h-64 mb-6">
                <FarmMap />
              </div>

              {/* Conditional Module Content */}
              {activeModule === 'overview' && <OverviewModule />}
              {activeModule === 'financial' && <FinancialModule />}
              {activeModule === 'planning' && <PlanningModule />}
              {activeModule === 'weather' && <WeatherModule />}
              {activeModule === 'market' && <MarketModule />}
              {activeModule === 'machines' && <MachinesModule />}
              {activeModule === 'map' && <MapModule />}
              {activeModule === 'monitoring' && <MonitoringModule openImportModal={openImportModal} />}
              {activeModule === 'assistance' && <AssistanceModule />}
              {activeModule === 'settings' && <SettingsModule />}
            </div>
          </div>
        </div>
      </div>

      {/* Import Data Modal */}
      <ImportDataModal isOpen={isImportModalOpen} onClose={closeImportModal} />
    </div>
  );
};

// Module Card Component
const ModuleCard = ({ title, icon, isActive, onClick }: { 
  title: string; 
  icon: React.ReactNode; 
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div 
      className={`p-3 rounded-lg shadow-sm cursor-pointer transition-colors ${
        isActive ? 'bg-agro-primary text-white' : 'bg-gray-50 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isActive ? 'bg-white' : 'bg-white'
        }`}>
          {icon}
        </div>
        <span className="mt-2 text-sm font-medium">{title}</span>
      </div>
    </div>
  );
};

// Navigation Button Component
const NavButton = ({ icon, isActive, onClick }: {
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button 
      className={`flex items-center justify-center h-full w-full ${
        isActive ? 'text-agro-primary' : 'text-agro-text-light'
      }`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

// Dashboard Modules
const OverviewModule = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Trabalhos de Campo */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Trabalhos de Campo</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
            <div className="flex items-center">
              <Sprout className="mr-3 text-dashboard-plantio" />
              <span>Plantio Soja</span>
            </div>
            <span className="text-sm text-agro-text-light">Em andamento</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
            <div className="flex items-center">
              <Tractor className="mr-3 text-dashboard-pulverizacao-terrestre" />
              <span>Pulverização Terrestre</span>
            </div>
            <span className="text-sm text-agro-text-light">Agendado</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-md">
            <div className="flex items-center">
              <PlaneTakeoff className="mr-3 text-dashboard-pulverizacao-aerea" />
              <span>Pulverização Aérea</span>
            </div>
            <span className="text-sm text-agro-text-light">Pendente</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-md">
            <div className="flex items-center">
              <Wheat className="mr-3 text-dashboard-colheita" />
              <span>Colheita Milho</span>
            </div>
            <span className="text-sm text-agro-text-light">Planejado</span>
          </div>
        </div>
      </div>

      {/* Status dos Talhões */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Status dos Talhões</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Talhão 1 - Soja</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">
                <span className="text-agro-text-light">Área:</span>
                <span className="ml-2">50 hectares</span>
              </div>
              <div className="text-sm">
                <span className="text-agro-text-light">Fase:</span>
                <span className="ml-2">Vegetativo</span>
              </div>
            </div>
          </div>
          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Talhão 2 - Milho</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">
                <span className="text-agro-text-light">Área:</span>
                <span className="ml-2">30 hectares</span>
              </div>
              <div className="text-sm">
                <span className="text-agro-text-light">Fase:</span>
                <span className="ml-2">Colheita</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Previsão do Tempo */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Previsão do Tempo</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
            <div className="flex items-center">
              <Cloud className="mr-3 text-blue-500" />
              <span>Hoje</span>
            </div>
            <div className="flex items-center">
              <ThermometerSun className="mr-2 text-orange-500" />
              <span>28°C</span>
              <Droplets className="ml-4 mr-2 text-blue-500" />
              <span>60%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-agro-text-light">Amanhã</p>
              <div className="flex items-center justify-center mt-2">
                <Cloud className="mr-2 text-blue-500" />
                <span>25°C</span>
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-agro-text-light">Depois</p>
              <div className="flex items-center justify-center mt-2">
                <Cloud className="mr-2 text-blue-500" />
                <span>27°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mercado */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">
          Mercado
          <span className="text-sm font-normal text-agro-text-light ml-2">Preços Atuais</span>
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border-b">
            <span>Soja</span>
            <div className="flex items-center text-financial-income">
              <LineChart className="w-4 h-4 mr-2" />
              <span>R$ 168,50/saca</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 border-b">
            <span>Milho</span>
            <div className="flex items-center text-financial-expense">
              <LineChart className="w-4 h-4 mr-2" />
              <span>R$ 75,20/saca</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3">
            <span>Algodão</span>
            <div className="flex items-center text-financial-income">
              <LineChart className="w-4 h-4 mr-2" />
              <span>R$ 198,30/arroba</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas e Notificações */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Alertas e Notificações</h2>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 text-red-700 rounded-md">
            <p className="text-sm">Alerta de pragas no Talhão 1 - Verificar urgente</p>
          </div>
          <div className="p-3 bg-yellow-50 text-yellow-700 rounded-md">
            <p className="text-sm">Previsão de chuva forte - Planejar atividades</p>
          </div>
          <div className="p-3 bg-green-50 text-green-700 rounded-md">
            <p className="text-sm">Momento ideal para aplicação de fertilizantes</p>
          </div>
        </div>
      </div>

      {/* Próximas Atividades */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Próximas Atividades</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border-b">
            <div>
              <p className="font-medium">Manutenção de Equipamentos</p>
              <p className="text-sm text-agro-text-light">Segunda-feira, 8:00</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 border-b">
            <div>
              <p className="font-medium">Reunião com Agrônomo</p>
              <p className="text-sm text-agro-text-light">Terça-feira, 14:00</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3">
            <div>
              <p className="font-medium">Entrega de Insumos</p>
              <p className="text-sm text-agro-text-light">Quarta-feira, 10:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Financial Module
const FinancialModule = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Gestão Financeira</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md bg-green-50">
            <h3 className="font-medium mb-2">Receitas Totais</h3>
            <p className="text-2xl font-bold text-financial-income">R$ 750.000,00</p>
            <p className="text-sm text-agro-text-light">Safra 2024/2025</p>
          </div>
          <div className="p-4 border rounded-md bg-red-50">
            <h3 className="font-medium mb-2">Despesas Totais</h3>
            <p className="text-2xl font-bold text-financial-expense">R$ 450.000,00</p>
            <p className="text-sm text-agro-text-light">Safra 2024/2025</p>
          </div>
          <div className="p-4 border rounded-md bg-blue-50">
            <h3 className="font-medium mb-2">Resultado</h3>
            <p className="text-2xl font-bold text-financial-income">R$ 300.000,00</p>
            <p className="text-sm text-agro-text-light">Margem: 40%</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-medium mb-2">Despesas por Categoria</h3>
          <div className="border rounded-md">
            <div className="flex items-center justify-between p-3 border-b">
              <span>Insumos</span>
              <div className="flex items-center text-financial-expense">
                <span>R$ 250.000,00</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border-b">
              <span>Maquinário</span>
              <div className="flex items-center text-financial-expense">
                <span>R$ 120.000,00</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3">
              <span>Mão de Obra</span>
              <div className="flex items-center text-financial-expense">
                <span>R$ 80.000,00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-agro-primary text-white px-4 py-2 rounded-md">Adicionar Receita</button>
          <button className="bg-dashboard-error text-white px-4 py-2 rounded-md">Adicionar Despesa</button>
          <button className="bg-gray-200 text-agro-dark px-4 py-2 rounded-md">Exportar Relatório</button>
        </div>
      </div>
    </div>
  );
};

// Planning Module
const PlanningModule = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Planejamento de Safras</h2>
      <div className="space-y-4">
        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Calendário Agrícola - Soja</h3>
          <div className="grid grid-cols-6 gap-2 text-center">
            <div className="p-2 bg-gray-100 rounded">
              <span className="text-sm font-medium">Set</span>
              <p className="text-xs mt-1">Preparo</p>
            </div>
            <div className="p-2 bg-green-100 rounded">
              <span className="text-sm font-medium">Out</span>
              <p className="text-xs mt-1">Plantio</p>
            </div>
            <div className="p-2 bg-blue-100 rounded">
              <span className="text-sm font-medium">Nov</span>
              <p className="text-xs mt-1">Crescimento</p>
            </div>
            <div className="p-2 bg-blue-100 rounded">
              <span className="text-sm font-medium">Dez</span>
              <p className="text-xs mt-1">Crescimento</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded">
              <span className="text-sm font-medium">Jan</span>
              <p className="text-xs mt-1">Maturação</p>
            </div>
            <div className="p-2 bg-orange-100 rounded">
              <span className="text-sm font-medium">Fev</span>
              <p className="text-xs mt-1">Colheita</p>
            </div>
          </div>
        </div>
        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Histórico Produtivo - Talhão 1</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>Safra 2023/2024</span>
              <span className="font-medium">62 sc/ha</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>Safra 2022/2023</span>
              <span className="font-medium">58 sc/ha</span>
            </div>
            <div className="flex justify-between p-2 bg-gray-50 rounded">
              <span>Safra 2021/2022</span>
              <span className="font-medium">65 sc/ha</span>
            </div>
          </div>
        </div>
        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Metas para Safra 2024/2025</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Produtividade Soja</span>
              <span className="font-medium">70 sc/ha</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-agro-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs text-right text-agro-text-light">62 sc/ha atuais (85% da meta)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Weather Module
const WeatherModule = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Previsão do Tempo</h2>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <div className="flex-shrink-0 mr-4">
              <Cloud className="h-16 w-16 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium text-xl">Hoje - Fazenda Central</h3>
              <div className="flex items-center mt-2">
                <ThermometerSun className="text-orange-500 mr-2" />
                <span className="text-2xl font-bold">28°C</span>
                <span className="text-sm text-agro-text-light mx-2">min: 22°C / max: 30°C</span>
              </div>
              <div className="flex items-center mt-2">
                <Droplets className="text-blue-500 mr-2" />
                <span>Probabilidade de chuva: 60%</span>
              </div>
            </div>
          </div>
          
          <h3 className="font-medium mt-4">Próximos Dias</h3>
          <div className="grid grid-cols-4 gap-2">
            <div className="p-3 bg-gray-50 rounded-md text-center">
              <p className="text-sm font-medium">Amanhã</p>
              <Cloud className="h-8 w-8 mx-auto my-2 text-blue-500" />
              <p className="text-sm">25°C</p>
              <p className="text-xs text-blue-500">40%</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md text-center">
              <p className="text-sm font-medium">Quinta</p>
              <Cloud className="h-8 w-8 mx-auto my-2 text-blue-500" />
              <p className="text-sm">27°C</p>
              <p className="text-xs text-blue-500">30%</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md text-center">
              <p className="text-sm font-medium">Sexta</p>
              <CloudRain className="h-8 w-8 mx-auto my-2 text-blue-500" />
              <p className="text-sm">24°C</p>
              <p className="text-xs text-blue-500">80%</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md text-center">
              <p className="text-sm font-medium">Sábado</p>
              <CloudRain className="h-8 w-8 mx-auto my-2 text-blue-500" />
              <p className="text-sm">23°C</p>
              <p className="text-xs text-blue-500">75%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Monitoramento do Solo</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Umidade do Solo</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-agro-text-light">Talhão 1</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Temperatura do Solo</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-agro-text-light">Talhão 1</span>
                <span className="font-medium">24°C</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Registro de Chuvas</h3>
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>15/04/2025</span>
                <span className="font-medium">12mm</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>10/04/2025</span>
                <span className="font-medium">8mm</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>05/04/2025</span>
                <span className="font-medium">25mm</span>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-agro-primary text-white py-2 rounded-md mt-4">
            Registrar Nova Medição
          </button>
        </div>
      </div>
    </div>
  );
};

// Market Module
const MarketModule = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Comercialização e Mercado</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Preços Atuais das Commodities</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço Atual</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variação</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tendência</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Soja</td>
                  <td className="px-6 py-4 whitespace-nowrap">R$ 168,50/saca</td>
                  <td className="px-6 py-4 whitespace-nowrap text-financial-income">+2,5%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <LineChart className="inline text-financial-income" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Milho</td>
                  <td className="px-6 py-4 whitespace-nowrap">R$ 75,20/saca</td>
                  <td className="px-6 py-4 whitespace-nowrap text-financial-expense">-1,8%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <LineChart className="inline text-financial-expense" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Algodão</td>
                  <td className="px-6 py-4 whitespace-nowrap">R$ 198,30/arroba</td>
                  <td className="px-6 py-4 whitespace-nowrap text-financial-income">+3,2%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <LineChart className="inline text-financial-income" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Contratos Ativos</h3>
          <div className="border rounded-md">
            <div className="p-4 border-b">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Contrato #1245 - Soja</h4>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Ativo</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-agro-text-light">Quantidade:</span>
                  <span className="ml-1">2.000 sacas</span>
                </div>
                <div>
                  <span className="text-agro-text-light">Preço:</span>
                  <span className="ml-1">R$ 170,00/saca</span>
                </div>
                <div>
                  <span className="text-agro-text-light">Entrega:</span>
                  <span className="ml-1">Fev/2026</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Contrato #1198 - Milho</h4>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pendente</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-agro-text-light">Quantidade:</span>
                  <span className="ml-1">1.500 sacas</span>
                </div>
                <div>
                  <span className="text-agro-text-light">Preço:</span>
                  <span className="ml-1">R$ 76,50/saca</span>
                </div>
                <div>
                  <span className="text-agro-text-light">Entrega:</span>
                  <span className="ml-1">Mar/2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center space-x-4">
          <button className="bg-agro-primary text-white px-4 py-2 rounded-md">Novo Contrato</button>
          <button className="bg-gray-200 text-agro-dark px-4 py-2 rounded-md">Buscar Compradores</button>
        </div>
      </div>
    </div>
  );
};

// Machines Module
const MachinesModule = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Gestão de Máquinas</h2>
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Máquina</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horímetro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Trator</td>
                <td className="px-6 py-4 whitespace-nowrap">John Deere 8R 310</td>
                <td className="px-6 py-4 whitespace-nowrap">2.450 h</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Operacional</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-500 hover:underline">Detalhes</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Colheitadeira</td>
                <td className="px-6 py-4 whitespace-nowrap">Case IH 8250</td>
                <td className="px-6 py-4 whitespace-nowrap">1.850 h</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Manutenção Pendente</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-500 hover:underline">Detalhes</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Pulverizador</td>
                <td className="px-6 py-4 whitespace-nowrap">Jacto Uniport 3030</td>
                <td className="px-6 py-4 whitespace-nowrap">980 h</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Em Manutenção</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-500 hover:underline">Detalhes</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Manutenções Programadas</h3>
          <div className="border rounded-md">
            <div className="p-4 border-b">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Troca de Óleo - Trator John Deere</h4>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Em 3 dias</span>
              </div>
              <p className="text-sm text-agro-text-light">Programado para: 18/04/2025</p>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Revisão Geral - Colheitadeira Case</h4>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Atrasado</span>
              </div>
              <p className="text-sm text-agro-text-light">Programado para: 10/04/2025</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center space-x-4">
          <button className="bg-agro-primary text-white px-4 py-2 rounded-md">Adicionar Máquina</button>
          <button className="bg-dashboard-warning text-white px-4 py-2 rounded-md">Agendar Manutenção</button>
        </div>
      </div>
    </div>
  );
};

// Map Module
const MapModule = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Talhões no Mapa</h2>
      <div className="space-y-4">
        <div className="relative w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-agro-text-light">Mapa de talhões será exibido aqui</span>
          {/* Placeholder para o mapa real */}
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Informações dos Talhões</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md bg-green-50">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Talhão 1</h4>
                <span className="text-sm bg-dashboard-plantio text-white px-2 py-1 rounded">Soja</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-agro-text-light">Área:</span>
                  <span className="ml-1">50 hectares</span>
                </div>
                <div>
                  <span className="text-agro-text-light">Variedade:</span>
                  <span className="ml-1">BMX Potência</span>
                </div>
                <div>
                  <span className="text-agro-text-light">Plantio:</span>
                  <span className="ml-1">10/10/2024</span>
                </div>
                <div>
                  <span className="text-agro-text-light">Ciclo:</span>
                  <span className="ml-1">2024/2025</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-md bg-yellow-50">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Talhão 2</h4>
                <span className="text-sm bg-dashboard-colheita text-white px-2 py-1 rounded">Milho</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-agro-text-light">Área:</span>
                  <span className="ml-1">30 hectares</span>
                </div>
                <div>
                  <span className="text-agro-text-light">Variedade:</span>
                  <span className="ml-1">DKB 390</span>
                </div>
                <div>
                  <span className="text-agro-text-light">Plantio:</span>
                  <span className="ml-1">15/09/2024</span>
                </div>
                <div>
                  <span className="text-agro-text-light">Ciclo:</span>
                  <span className="ml-1">2024/2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center space-x-4">
          <button className="bg-agro-primary text-white px-4 py-2 rounded-md">Adicionar Talhão</button>
          <button className="bg-gray-200 text-agro-dark px-4 py-2 rounded-md">Editar Limites</button>
        </div>
      </div>
    </div>
  );
};

// Monitoring Module
const MonitoringModule = ({ openImportModal }: { openImportModal: () => void }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Monitoramento de Campo</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Ocorrências Recentes</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-red-50">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium text-red-700">Praga: Percevejo</h4>
                <span className="text-sm">12/04/2025</span>
              </div>
              <p className="text-sm mb-2">Talhão 1 - Soja</p>
              <p className="text-sm mb-2">Alta infestação de percevejos no lado leste do talhão. Necessária intervenção imediata.</p>
              <div className="flex justify-end">
                <button className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">Ver Detalhes</button>
              </div>
            </div>
            
            <div className="p-4 border rounded-md bg-yellow-50">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium text-yellow-700">Doença: Ferrugem</h4>
                <span className="text-sm">10/04/2025</span>
              </div>
              <p className="text-sm mb-2">Talhão 1 - Soja</p>
              <p className="text-sm mb-2">Primeiros sinais de ferrugem asiática detectados. Recomendação de aplicação preventiva.</p>
              <div className="flex justify-end">
                <button className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Ver Detalhes</button>
              </div>
            </div>
            
            <div className="p-4 border rounded-md bg-blue-50">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium text-blue-700">Deficiência: Potássio</h4>
                <span className="text-sm">08/04/2025</span>
              </div>
              <p className="text-sm mb-2">Talhão 2 - Milho</p>
              <p className="text-sm mb-2">Sintomas de deficiência de potássio observados nas bordas das folhas.</p>
              <div className="flex justify-end">
                <button className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Ver Detalhes</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center space-x-4">
          <button className="bg-agro-primary text-white px-4 py-2 rounded-md">Registrar Nova Ocorrência</button>
          <button 
            onClick={openImportModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <Cloud className="mr-2" size={18} />
            Importar Dados
          </button>
          <button className="bg-gray-200 text-agro-dark px-4 py-2 rounded-md">Ver Histórico Completo</button>
        </div>
      </div>
    </div>
  );
};

// Assistance Module
const AssistanceModule = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Assistência Técnica e Comunidade</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Chat com Técnicos</h3>
            <div className="border rounded-md h-72 flex flex-col">
              <div className="flex-grow p-4 bg-gray-50 overflow-y-auto">
                <div className="mb-3 max-w-3/4">
                  <div className="bg-gray-200 rounded-lg p-3 inline-block">
                    <p className="text-sm">Bom dia! Como posso ajudar com sua lavoura hoje?</p>
                  </div>
                  <p className="text-xs text-agro-text-light mt-1">Técnico João, 09:30</p>
                </div>
                
                <div className="mb-3 max-w-3/4 ml-auto">
                  <div className="bg-agro-primary text-white rounded-lg p-3 inline-block">
                    <p className="text-sm">Estou com dúvidas sobre o manejo de pragas na soja.</p>
                  </div>
                  <p className="text-xs text-agro-text-light mt-1 text-right">Você, 09:32</p>
                </div>
                
                <div className="mb-3 max-w-3/4">
                  <div className="bg-gray-200 rounded-lg p-3 inline-block">
                    <p className="text-sm">Claro! Que tipo específico de praga está afetando sua lavoura?</p>
                  </div>
                  <p className="text-xs text-agro-text-light mt-1">Técnico João, 09:35</p>
                </div>
              </div>
              
              <div className="p-3 border-t flex">
                <input type="text" className="flex-grow border rounded-l-md px-3 py-2" placeholder="Digite sua mensagem..." />
                <button className="bg-agro-primary text-white px-4 py-2 rounded-r-md">Enviar</button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Biblioteca de Conhecimento</h3>
            <div className="border rounded-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h4 className="font-medium">Guias e Manuais</h4>
              </div>
              <div className="p-4 space-y-3">
                <div className="p-3 bg-blue-50 rounded-md">
                  <h5 className="font-medium">Manejo Integrado de Pragas na Soja</h5>
                  <p className="text-sm text-agro-text-light mt-1">Manual completo sobre identificação e controle de pragas</p>
                  <button className="text-sm text-blue-600 mt-2">Download PDF</button>
                </div>
                
                <div className="p-3 bg-green-50 rounded-md">
                  <h5 className="font-medium">Calibração de Pulverizadores</h5>
                  <p className="text-sm text-agro-text-light mt-1">Guia prático para calibragem eficiente de equipamentos</p>
                  <button className="text-sm text-blue-600 mt-2">Download PDF</button>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-md">
                  <h5 className="font-medium">Boas Práticas de Plantio do Milho</h5>
                  <p className="text-sm text-agro-text-light mt-1">Técnicas para maximizar a produtividade do milho</p>
                  <button className="text-sm text-blue-600 mt-2">Download PDF</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Fórum da Comunidade</h3>
          <div className="border rounded-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h4 className="font-medium">Tópicos Recentes</h4>
              <button className="text-sm bg-agro-primary text-white px-3 py-1 rounded-md">Novo Tópico</button>
            </div>
            <div className="divide-y">
              <div className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between mb-1">
                  <h5 className="font-medium">Controle de Lagarta do Cartucho</h5>
                  <span className="text-sm text-agro-text-light">12 respostas</span>
                </div>
                <p className="text-sm text-agro-text-light">Iniciado por Carlos Silva, 11/04/2025</p>
              </div>
              
              <div className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between mb-1">
                  <h5 className="font-medium">Qual a melhor variedade de soja para o Centro-Oeste?</h5>
                  <span className="text-sm text-agro-text-light">8 respostas</span>
                </div>
                <p className="text-sm text-agro-text-light">Iniciado por Ana Pereira, 09/04/2025</p>
              </div>
              
              <div className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between mb-1">
                  <h5 className="font-medium">Dicas para manejo de solo em áreas de expansão</h5>
                  <span className="text-sm text-agro-text-light">15 respostas</span>
                </div>
                <p className="text-sm text-agro-text-light">Iniciado por Marcos Oliveira, 05/04/2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Module
const SettingsModule = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Configurações</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-4">Informações da Fazenda</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-agro-text-light mb-1">Nome da Fazenda</label>
              <input type="text" className="w-full border rounded-md px-3 py-2" defaultValue="Fazenda Esperança" />
            </div>
            <div>
              <label className="block text-agro-text-light mb-1">Proprietário</label>
              <input type="text" className="w-full border rounded-md px-3 py-2" defaultValue="João da Silva" />
            </div>
            <div>
              <label className="block text-agro-text-light mb-1">Localização</label>
              <input type="text" className="w-full border rounded-md px-3 py-2" defaultValue="Sorriso, MT" />
            </div>
            <div>
              <label className="block text-agro-text-light mb-1">Área Total (hectares)</label>
              <input type="number" className="w-full border rounded-md px-3 py-2" defaultValue="850" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Preferências do Sistema</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Tema Escuro</h4>
                <p className="text-sm text-agro-text-light">Ativar modo noturno para uso à noite</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-agro-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notificações Push</h4>
                <p className="text-sm text-agro-text-light">Receber alertas importantes no celular</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-agro-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Unidades de Medida</h4>
                <p className="text-sm text-agro-text-light">Sistema de unidades utilizadas no aplicativo</p>
              </div>
              <select className="border rounded-md px-3 py-2">
                <option>Métrico (ha, mm, kg)</option>
                <option>Imperial (acre, in, lb)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Informações da Conta</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-agro-text-light mb-1">E-mail</label>
              <input type="email" className="w-full border rounded-md px-3 py-2" defaultValue="joao.silva@email.com" />
            </div>
            <div>
              <label className="block text-agro-text-light mb-1">Senha</label>
              <input type="password" className="w-full border rounded-md px-3 py-2" defaultValue="********" />
            </div>
            <div className="flex space-x-4 mt-6">
              <button className="bg-agro-primary text-white px-4 py-2 rounded-md">Salvar Alterações</button>
              <button className="bg-gray-200 text-agro-dark px-4 py-2 rounded-md">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
