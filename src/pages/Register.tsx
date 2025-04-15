
import React, { useState } from 'react';

const Register: React.FC = () => {
  const [userType, setUserType] = useState<'agricultor' | 'empresa'>('agricultor');

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-[#2d3748] mb-6 text-center">
          Criar Conta
        </h2>
        
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => setUserType('agricultor')}
            className={`mr-4 px-4 py-2 rounded-md ${
              userType === 'agricultor' 
              ? 'bg-[#3a7e4f] text-white' 
              : 'bg-gray-200 text-gray-700'
            }`}
          >
            👤 Agricultor
          </button>
          <button 
            onClick={() => setUserType('empresa')}
            className={`px-4 py-2 rounded-md ${
              userType === 'empresa' 
              ? 'bg-[#3a7e4f] text-white' 
              : 'bg-gray-200 text-gray-700'
            }`}
          >
            🏢 Empresa
          </button>
        </div>

        <form>
          {userType === 'agricultor' && (
            <>
              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">E-mail</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">Senha</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">Nome da Fazenda</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">Localidade</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                  placeholder="Estado / Cidade" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">Tamanho da Fazenda (hectares)</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">Cultura Principal</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                  placeholder="Ex: Soja, Milho, Café" 
                />
              </div>
            </>
          )}

          <button 
            type="submit" 
            className="w-full bg-[#3a7e4f] text-white py-2 rounded-md hover:bg-[#2e6740] transition-colors mt-4"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
