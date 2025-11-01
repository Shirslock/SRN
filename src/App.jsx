import React, { useState } from 'react';
import { Download } from 'lucide-react';
import Login from './components/Auth/Login';
import Header from './components/Layout/Header';
import CabinaSection from './components/FormSections/CabinaSection';
import ExtintoresSection from './components/FormSections/ExtintoresSection';
import NivelesSection from './components/FormSections/NivelesSection';
import FotografiasSection from './components/FormSections/FotografiasSection';
import ObservacionesSection from './components/FormSections/ObservacionesSection';
import { generatePDF } from './utils/pdfGenerator';
import {
  LOCOMOTORAS,
  UBICACIONES,
  INITIAL_CABINA_STATE,
  INITIAL_EXTINTORES_STATE,
  INITIAL_NIVELES_STATE
} from './utils/constants';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [locomotora, setLocomotora] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  
  const [cabina1, setCabina1] = useState(INITIAL_CABINA_STATE);
  const [cabina2, setCabina2] = useState(INITIAL_CABINA_STATE);
  const [extintores, setExtintores] = useState(INITIAL_EXTINTORES_STATE);
  const [niveles, setNiveles] = useState(INITIAL_NIVELES_STATE);
  const [fotografias, setFotografias] = useState([]);
  const [observacionesGenerales, setObservacionesGenerales] = useState('');

  const handleLogin = (userData) => {
    setUsuario(userData);
  };

  const handleLogout = () => {
    setUsuario(null);
    setLocomotora('');
    setUbicacion('');
    setCabina1(INITIAL_CABINA_STATE);
    setCabina2(INITIAL_CABINA_STATE);
    setExtintores(INITIAL_EXTINTORES_STATE);
    setNiveles(INITIAL_NIVELES_STATE);
    setFotografias([]);
    setObservacionesGenerales('');
  };

  const handleGeneratePDF = () => {
    generatePDF(
      locomotora, 
      ubicacion, 
      cabina1, 
      cabina2, 
      extintores, 
      niveles, 
      fotografias,
      observacionesGenerales,
      usuario
    );
  };

  if (!usuario) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        locomotora={locomotora} 
        ubicacion={ubicacion} 
        usuario={usuario}
        onLogout={handleLogout} 
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
            Datos de la Locomotora
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de Locomotora *
              </label>
              <select
                value={locomotora}
                onChange={(e) => setLocomotora(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar locomotora...</option>
                {LOCOMOTORAS.map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ubicación Actual *
              </label>
              <select
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar ubicación...</option>
                {UBICACIONES.map(ubi => (
                  <option key={ubi} value={ubi}>{ubi}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {locomotora && ubicacion && (
          <>
            <CabinaSection numero={1} data={cabina1} onChange={setCabina1} />
            <CabinaSection numero={2} data={cabina2} onChange={setCabina2} />
            <ExtintoresSection data={extintores} onChange={setExtintores} />
            <NivelesSection data={niveles} onChange={setNiveles} />
            <FotografiasSection data={fotografias} onChange={setFotografias} />
            <ObservacionesSection data={observacionesGenerales} onChange={setObservacionesGenerales} />

            <div className="flex justify-center mb-8">
              <button
                onClick={handleGeneratePDF}
                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition duration-200 transform hover:scale-105"
              >
                <Download className="w-6 h-6" />
                Descargar Registro PDF
              </button>
            </div>
          </>
        )}

        {(!locomotora || !ubicacion) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Por favor seleccioná el número de locomotora y la ubicación para continuar con el registro.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm">Sistema de Registro de Novedades © 2025</p>
          <p className="text-xs text-gray-400 mt-1">
            Usuario activo: {usuario.nombre} (Legajo: {usuario.legajo})
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;