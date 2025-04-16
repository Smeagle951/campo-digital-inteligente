
import React from 'react';
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
  Settings,
  MessageSquare,
  Users,
  ClipboardList,
  Upload,
  Bluetooth
} from 'lucide-react';

interface ModuleProps {
  handleNotImplemented: () => void;
}

// Overview Module
export const OverviewModule: React.FC<ModuleProps> = ({ handleNotImplemented }) => {
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
            <button 
              onClick={handleNotImplemented}
              className="text-sm text-agro-text-light hover:text-agro-primary"
            >
              Ver detalhes
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
            <div className="flex items-center">
              <Tractor className="mr-3 text-dashboard-pulverizacao-terrestre" />
              <span>Pulverização Terrestre</span>
            </div>
            <button 
              onClick={handleNotImplemented}
              className="text-sm text-agro-text-light hover:text-agro-primary"
            >
              Ver detalhes
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-md">
            <div className="flex items-center">
              <PlaneTakeoff className="mr-3 text-dashboard-pulverizacao-aerea" />
              <span>Pulverização Aérea</span>
            </div>
            <button 
              onClick={handleNotImplemented}
              className="text-sm text-agro-text-light hover:text-agro-primary"
            >
              Ver detalhes
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-md">
            <div className="flex items-center">
              <Wheat className="mr-3 text-dashboard-colheita" />
              <span>Colheita Milho</span>
            </div>
            <button 
              onClick={handleNotImplemented}
              className="text-sm text-agro-text-light hover:text-agro-primary"
            >
              Ver detalhes
            </button>
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
            <button 
              onClick={handleNotImplemented}
              className="mt-2 text-sm text-agro-primary hover:underline"
            >
              Ver detalhes
            </button>
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
            <button 
              onClick={handleNotImplemented}
              className="mt-2 text-sm text-agro-primary hover:underline"
            >
              Ver detalhes
            </button>
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
          <button 
            onClick={handleNotImplemented}
            className="w-full mt-2 text-sm text-agro-primary hover:underline"
          >
            Ver previsão completa
          </button>
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
          <button 
            onClick={handleNotImplemented}
            className="w-full mt-2 text-sm text-agro-primary hover:underline"
          >
            Ver todos os preços
          </button>
        </div>
      </div>

      {/* Alertas e Notificações */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Alertas e Notificações</h2>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 text-red-700 rounded-md">
            <p className="text-sm">Alerta de pragas no Talhão 1 - Verificar urgente</p>
            <button 
              onClick={handleNotImplemented}
              className="mt-1 text-xs text-red-600 hover:underline"
            >
              Ver detalhes
            </button>
          </div>
          <div className="p-3 bg-yellow-50 text-yellow-700 rounded-md">
            <p className="text-sm">Previsão de chuva forte - Planejar atividades</p>
            <button 
              onClick={handleNotImplemented}
              className="mt-1 text-xs text-yellow-600 hover:underline"
            >
              Ver detalhes
            </button>
          </div>
          <div className="p-3 bg-green-50 text-green-700 rounded-md">
            <p className="text-sm">Momento ideal para aplicação de fertilizantes</p>
            <button 
              onClick={handleNotImplemented}
              className="mt-1 text-xs text-green-600 hover:underline"
            >
              Ver detalhes
            </button>
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
            <button 
              onClick={handleNotImplemented}
              className="text-sm text-agro-primary hover:underline"
            >
              Detalhes
            </button>
          </div>
          <div className="flex items-center justify-between p-3 border-b">
            <div>
              <p className="font-medium">Reunião com Agrônomo</p>
              <p className="text-sm text-agro-text-light">Terça-feira, 14:00</p>
            </div>
            <button 
              onClick={handleNotImplemented}
              className="text-sm text-agro-primary hover:underline"
            >
              Detalhes
            </button>
          </div>
          <div className="flex items-center justify-between p-3">
            <div>
              <p className="font-medium">Entrega de Insumos</p>
              <p className="text-sm text-agro-text-light">Quarta-feira, 10:00</p>
            </div>
            <button 
              onClick={handleNotImplemented}
              className="text-sm text-agro-primary hover:underline"
            >
              Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Financial Module
export const FinancialModule: React.FC<ModuleProps> = ({ handleNotImplemented }) => {
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
          <button 
            onClick={handleNotImplemented}
            className="bg-agro-primary text-white px-4 py-2 rounded-md hover:bg-agro-dark transition-colors"
          >
            Adicionar Receita
          </button>
          <button 
            onClick={handleNotImplemented}
            className="bg-dashboard-error text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Adicionar Despesa
          </button>
          <button 
            onClick={handleNotImplemented}
            className="bg-gray-200 text-agro-dark px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Exportar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};

// Assistance Module
export const AssistanceModule: React.FC<ModuleProps> = ({ handleNotImplemented }) => {
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
                <button 
                  onClick={handleNotImplemented}
                  className="bg-agro-primary text-white px-4 py-2 rounded-r-md hover:bg-agro-dark transition-colors"
                >
                  Enviar
                </button>
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
                  <button 
                    onClick={handleNotImplemented}
                    className="text-sm text-blue-600 mt-2 hover:underline"
                  >
                    Download PDF
                  </button>
                </div>
                
                <div className="p-3 bg-green-50 rounded-md">
                  <h5 className="font-medium">Calibração de Pulverizadores</h5>
                  <p className="text-sm text-agro-text-light mt-1">Guia prático para calibragem eficiente de equipamentos</p>
                  <button 
                    onClick={handleNotImplemented}
                    className="text-sm text-blue-600 mt-2 hover:underline"
                  >
                    Download PDF
                  </button>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-md">
                  <h5 className="font-medium">Boas Práticas de Plantio do Milho</h5>
                  <p className="text-sm text-agro-text-light mt-1">Técnicas para maximizar a produtividade do milho</p>
                  <button 
                    onClick={handleNotImplemented}
                    className="text-sm text-blue-600 mt-2 hover:underline"
                  >
                    Download PDF
                  </button>
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
              <button 
                onClick={handleNotImplemented}
                className="text-sm bg-agro-primary text-white px-3 py-1 rounded-md hover:bg-agro-dark transition-colors"
              >
                Novo Tópico
              </button>
            </div>
            <div className="divide-y">
              <div 
                className="p-4 hover:bg-gray-50 cursor-pointer" 
                onClick={handleNotImplemented}
              >
                <div className="flex justify-between mb-1">
                  <h5 className="font-medium">Controle de Lagarta do Cartucho</h5>
                  <span className="text-sm text-agro-text-light">12 respostas</span>
                </div>
                <p className="text-sm text-agro-text-light">Iniciado por Carlos Silva, 11/04/2025</p>
              </div>
              
              <div 
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={handleNotImplemented}
              >
                <div className="flex justify-between mb-1">
                  <h5 className="font-medium">Qual a melhor variedade de soja para o Centro-Oeste?</h5>
                  <span className="text-sm text-agro-text-light">8 respostas</span>
                </div>
                <p className="text-sm text-agro-text-light">Iniciado por Ana Pereira, 09/04/2025</p>
              </div>
              
              <div 
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={handleNotImplemented}
              >
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
export const SettingsModule: React.FC<ModuleProps> = ({ handleNotImplemented }) => {
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
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  onChange={handleNotImplemented}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-agro-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notificações Push</h4>
                <p className="text-sm text-agro-text-light">Receber alertas importantes no celular</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="sr-only peer" 
                  onChange={handleNotImplemented}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-agro-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Unidades de Medida</h4>
                <p className="text-sm text-agro-text-light">Sistema de unidades utilizadas no aplicativo</p>
              </div>
              <select 
                className="border rounded-md px-3 py-2"
                onChange={handleNotImplemented}
              >
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
              <button 
                onClick={handleNotImplemented}
                className="bg-agro-primary text-white px-4 py-2 rounded-md hover:bg-agro-dark transition-colors"
              >
                Salvar Alterações
              </button>
              <button 
                onClick={handleNotImplemented}
                className="bg-gray-200 text-agro-dark px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
