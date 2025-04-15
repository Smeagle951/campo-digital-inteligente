
import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-[#2d3748] mb-6 text-center">
          🌾 Bem-vindo, produtor!
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-[#2d3748] mb-2">E-mail / Usuário</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#2d3748] mb-2">Senha</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#3a7e4f] text-white py-2 rounded-md hover:bg-[#2e6740] transition-colors"
          >
            Entrar
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/register" className="text-[#3a7e4f] hover:underline">
            Criar conta
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
