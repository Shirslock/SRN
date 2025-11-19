import React, { useState } from 'react';
import { Download } from 'lucide-react';
import Login from './components/Auth/Login';
import Header from './components/Layout/Header';
import CabinaSection from './components/FormSections/CabinaSection';
import ExtintoresSection from './components/FormSections/ExtintoresSection';
import NivelesSection from './components/FormSections/NivelesSection';
import FiltrosTurboSection from './components/FormSections/FiltrosTurboSection';
import FotografiasSection from './components/FormSections/FotografiasSection';
import ObservacionesSection from './components/FormSections/ObservacionesSection';
import UserManagement from './components/Admin/UserManagement';
import { generatePDF } from './utils/pdfGenerator';
import { authService } from './services/authService';
import {
  LOCOMOTORAS,
  UBICACIONES,
  AREAS_POR_UBICACION,
  INITIAL_CABINA_STATE,
  INITIAL_EXTINTORES_STATE,
  INITIAL_NIVELES_STATE,
  INITIAL_FILTROS_TURBO_STATE
} from './utils/constants';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [vistaActual, setVistaActual] = useState('registro');
  const [locomotora, setLocomotora] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [area, setArea] = useState('');
  
  const [cabina1, setCabina1] = useState(INITIAL_CABINA_STATE);
  const [cabina2, setCabina2] = useState(INITIAL_CABINA_STATE);
  const [extintores, setExtintores] = useState(INITIAL_EXTINTORES_STATE);
  const [niveles, setNiveles] = useState(INITIAL_NIVELES_STATE);
  const [filtrosTurbo, setFiltrosTurbo] = useState(INITIAL_FILTROS_TURBO_STATE);
  const [fotografias, setFotografias] = useState([]);
  const [fotografiasObservaciones, setFotografiasObservaciones] = useState([]);
  const [observacionesGenerales, setObservacionesGenerales] = useState('');

  const handleLogin = (userData) => {
    setUsuario(userData);
  };

  const handleLogout = () => {
    setUsuario(null);
    setVistaActual('registro');
    setLocomotora('');
    setUbicacion('');
    setArea('');
    setCabina1(INITIAL_CABINA_STATE);
    setCabina2(INITIAL_CABINA_STATE);
    setExtintores(INITIAL_EXTINTORES_STATE);
    setNiveles(INITIAL_NIVELES_STATE);
    setFiltrosTurbo(INITIAL_FILTROS_TURBO_STATE);
    setFotografias([]);
    setFotografiasObservaciones([]);
    setObservacionesGenerales('');
  };

  const handleUbicacionChange = (newUbicacion) => {
    setUbicacion(newUbicacion);
    setArea(''); // Resetear área al cambiar ubicación
  };

  const handleGeneratePDF = () => {
    generatePDF(
      locomotora, 
      ubicacion,
      area,
      cabina1, 
      cabina2, 
      extintores, 
      niveles,
      filtrosTurbo,
      fotografias,
      fotografiasObservaciones,
      observacionesGenerales,
      usuario
    );
  };

  if (!usuario) {
    return <Login onLogin={handleLogin} />;
  }

  const isAdmin = authService.isAdmin(usuario);
  const areasDisponibles = ubicacion ? AREAS_POR_UBICACION[ubicacion] || [] : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        locomotora={locomotora} 
        ubicacion={ubicacion}
        area={area}
        usuario={usuario}
        onLogout={handleLogout} 
      />

      {isAdmin && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex gap-4">
              <button
                onClick={() => setVistaActual('registro')}
                className={`px-6 py-3 font-semibold transition ${
                  vistaActual === 'registro'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                📋 Registro de Locomotoras
              </button>
              <button
                onClick={() => setVistaActual('admin')}
                className={`px-6 py-3 font-semibold transition ${
                  vistaActual === 'admin'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                👥 Gestión de Usuarios
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        {vistaActual === 'admin' ? (
          <UserManagement />
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
                Datos de la Locomotora
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    Ubicación *
                  </label>
                  <select
                    value={ubicacion}
                    onChange={(e) => handleUbicacionChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar ubicación...</option>
                    {UBICACIONES.map(ubi => (
                      <option key={ubi} value={ubi}>{ubi}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Área *
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    disabled={!ubicacion}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {ubicacion ? 'Seleccionar área...' : 'Primero seleccione ubicación'}
                    </option>
                    {areasDisponibles.map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              </div>

              {ubicacion && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Ubicación seleccionada:</span> {ubicacion}
                    {area && <span className="ml-2">→ <span className="font-semibold">{area}</span></span>}
                  </p>
                </div>
              )}
            </div>

            {locomotora && ubicacion && area && (
              <>
                <CabinaSection numero={1} data={cabina1} onChange={setCabina1} />
                <CabinaSection numero={2} data={cabina2} onChange={setCabina2} />
                <ExtintoresSection data={extintores} onChange={setExtintores} />
                <NivelesSection data={niveles} onChange={setNiveles} />
                <FiltrosTurboSection data={filtrosTurbo} onChange={setFiltrosTurbo} />
                <FotografiasSection data={fotografias} onChange={setFotografias} />
                <ObservacionesSection data={observacionesGenerales} onChange={setObservacionesGenerales} fotografias={fotografiasObservaciones}
                  onFotografiasChange={setFotografiasObservaciones} />

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

            {(!locomotora || !ubicacion || !area) && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 font-semibold mb-1">
                      Complete los datos requeridos para continuar:
                    </p>
                    <ul className="text-sm text-yellow-700 list-disc list-inside">
                      {!locomotora && <li>Seleccione el número de locomotora</li>}
                      {!ubicacion && <li>Seleccione la ubicación</li>}
                      {!area && ubicacion && <li>Seleccione el área</li>}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm">Sistema de Registro de Novedades © 2025</p>
          <p className="text-xs text-gray-400 mt-1">
            Usuario activo: {usuario.nombre} (Legajo: {usuario.legajo}) - {usuario.rol === 'admin' ? 'Administrador' : 'Conductor'}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;