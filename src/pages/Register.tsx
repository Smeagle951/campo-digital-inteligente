
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [userType, setUserType] = useState<'agricultor' | 'empresa'>('agricultor');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    farmName: '',
    location: '',
    size: '',
    mainCrop: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (userType === 'agricultor') {
      if (!formData.fullName || !formData.email || !formData.password || !formData.farmName || !formData.location || !formData.size) {
        setError('Por favor, preencha todos os campos obrigatórios');
        return;
      }
    }
    
    // For demo purposes, we'll just redirect to dashboard
    // In a real app, you would register the user in Supabase here
    console.log('Cadastro:', { userType, ...formData });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-[#2d3748] mb-6 text-center">
          Criar Conta
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        
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

        <form onSubmit={handleSubmit}>
          {userType === 'agricultor' && (
            <>
              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">E-mail</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">Senha</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">Nome da Fazenda</label>
                <input 
                  type="text" 
                  name="farmName"
                  value={formData.farmName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">Localidade</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                  placeholder="Estado / Cidade" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">Tamanho da Fazenda (hectares)</label>
                <input 
                  type="number" 
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#2d3748] mb-2">Cultura Principal</label>
                <input 
                  type="text" 
                  name="mainCrop"
                  value={formData.mainCrop}
                  onChange={handleChange}
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
        
        <div className="text-center mt-4">
          <a href="/" className="text-[#3a7e4f] hover:underline">
            Já tem uma conta? Faça login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
