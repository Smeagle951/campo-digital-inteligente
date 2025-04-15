
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    // For demo purposes, we'll just redirect to dashboard
    // In a real app, you would verify credentials against Supabase here
    console.log('Login com:', { email, password });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-[#2d3748] mb-6 text-center">
          🌾 Bem-vindo, produtor!
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#2d3748] mb-2">E-mail / Usuário</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#2d3748] mb-2">Senha</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3a7e4f]" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
