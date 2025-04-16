
import React, { useState } from 'react';
import { toast } from 'sonner';
import Sidebar from '../components/Sidebar';
import FarmMap from '../components/FarmMap';
import ImportDataModal from '../components/ImportDataModal';

// Import modules
import EnhancedFarmMap from '../components/EnhancedFarmMap';
import PlotManagement from '../components/PlotManagement';
import MachineManagement from '../components/MachineManagement';
import RainTracker from '../components/RainTracker';
import CropPlanning from '../components/CropPlanning';

// Import remaining modules from previous implementation
import {
  OverviewModule,
  FinancialModule,
  AssistanceModule,
  SettingsModule
} from './DashboardModules';

const Dashboard: React.FC = () => {
  const [activeModule, setActiveModule] = useState('overview');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const openImportModal = () => {
    setIsImportModalOpen(true);
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
  };

  const handleNotImplemented = () => {
    toast.info("Esta funcionalidade será implementada em breve!");
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
              {activeModule === 'overview' && <OverviewModule handleNotImplemented={handleNotImplemented} />}
              {activeModule === 'financial' && <FinancialModule handleNotImplemented={handleNotImplemented} />}
              {activeModule === 'planning' && <CropPlanning />}
              {activeModule === 'weather' && <RainTracker />}
              {activeModule === 'market' && (
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <h3 className="font-medium text-xl mb-2">Módulo de Comercialização e Mercado</h3>
                  <p className="text-agro-text-light mb-4">
                    Funcionalidade será implementada em breve. Acompanhe preços de commodities, contratos e tendências de mercado.
                  </p>
                  <button
                    onClick={handleNotImplemented}
                    className="px-4 py-2 bg-agro-primary text-white rounded-md hover:bg-agro-dark"
                  >
                    Visualizar Demonstração
                  </button>
                </div>
              )}
              {activeModule === 'machines' && <MachineManagement />}
              {activeModule === 'map' && <EnhancedFarmMap />}
              {activeModule === 'monitoring' && <PlotManagement />}
              {activeModule === 'assistance' && <AssistanceModule handleNotImplemented={handleNotImplemented} />}
              {activeModule === 'settings' && <SettingsModule handleNotImplemented={handleNotImplemented} />}
            </div>
          </div>
        </div>
      </div>

      {/* Import Data Modal */}
      <ImportDataModal isOpen={isImportModalOpen} onClose={closeImportModal} />
    </div>
  );
};

export default Dashboard;
