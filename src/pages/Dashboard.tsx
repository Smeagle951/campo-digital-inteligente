
import React from 'react';
import { 
  Tractor, 
  Sprout, 
  PlaneTakeoff, 
  Wheat,
  LineChart,
  Cloud,
  Droplets,
  ThermometerSun
} from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fa] p-8">
      <h1 className="text-3xl font-bold text-[#2d3748] mb-6">Painel do Agricultor</h1>
      
      {/* Grid principal */}
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
    </div>
  );
};

export default Dashboard;
