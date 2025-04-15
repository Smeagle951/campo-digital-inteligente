
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fa] p-8">
      <h1 className="text-3xl font-bold text-[#2d3748] mb-6">Painel do Agricultor</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Trabalhos de Campo</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="mr-2 text-green-600">🌱</span>
              <span>Plantio</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-blue-600">🚜</span>
              <span>Pulverização Terrestre</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-yellow-600">✈️</span>
              <span>Pulverização Aérea</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-orange-600">🌾</span>
              <span>Colheita</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Talhões</h2>
          <p>Visão de mapa com detalhes dos talhões</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#3a7e4f] mb-4">Mercado</h2>
          <p>Anúncios e ofertas de produtos agrícolas</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
