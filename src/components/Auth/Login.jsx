import React, { useState } from 'react';
import { Train, Loader } from 'lucide-react';
import { authService } from '../../services/authService';

const Login = ({ onLogin }) => {
  const [legajo, setLegajo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authService.login(legajo, password);
      
      if (result.success) {
        onLogin(result.usuario);
      } else {
        setError(result.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full">
            <Train className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Bienvenido a SRN
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sistema de Registro de Novedades
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Legajo
            </label>
            <input
              type="text"
              value={legajo}
              onChange={(e) => setLegajo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su legajo"
              autoComplete="username"
              disabled={loading}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
              disabled={loading}
              required
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Usuarios Registrados : 13106, 13096, 13106, 3467,6453,8465.
  
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;