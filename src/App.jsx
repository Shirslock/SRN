import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import Login from './components/Auth/Login';
import Header from './components/Layout/Header';
import WelcomeModal from './components/Layout/WelcomeModal';
import CabinaSection from './components/FormSections/CabinaSection';
import ExtintoresSection from './components/FormSections/ExtintoresSection';
import NivelesSection from './components/FormSections/NivelesSection';
import FiltrosTurboSection from './components/FormSections/FiltrosTurboSection';
import FotografiasSection from './components/FormSections/FotografiasSection';
import ObservacionesSection from './components/FormSections/ObservacionesSection';
import UserManagement from './components/Admin/UserManagement';
import { generatePDF } from './utils/pdfGenerator';
import { authService } from './services/authService';
import { driveService } from './services/driveService';
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
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
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

  // Estado de Google Drive
  const [driveReady, setDriveReady] = useState(false);
  const [uploadingToDrive, setUploadingToDrive] = useState(false);

  // Inicializar Google Drive
  useEffect(() => {
    const initDrive = async () => {
      try {
        await driveService.init();
        setDriveReady(true);
        console.log('✅ Google Drive inicializado correctamente');
      } catch (error) {
        console.error('❌ Error al inicializar Google Drive:', error);
        setDriveReady(false);
      }
    };

    initDrive();
  }, []);

  const handleLogin = (userData) => {
    setUsuario(userData);
    setShowWelcomeModal(true);
  };

  const handleLogout = () => {
    setUsuario(null);
    setShowWelcomeModal(false);
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
    setArea('');
  };

  const handleGeneratePDF = async () => {
    try {
      // Generar PDF
      const { blob, fileName, doc } = await generatePDF(
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

      // Preguntar si quiere subir a Drive (solo si está inicializado)
      if (driveReady) {
        const confirmUpload = window.confirm(
          '¿Deseas subir el PDF a Google Drive?\n\n' +
          '✅ SÍ: Subir a Drive y descargar localmente\n' +
          '❌ NO: Solo descargar localmente'
        );

        if (confirmUpload) {
          setUploadingToDrive(true);
          
          try {
            // Subir a Google Drive
            const result = await driveService.uploadPDF(blob, fileName);
            
            alert(
              `✅ ¡PDF subido exitosamente a Google Drive!\n\n` +
              `📄 Nombre: ${fileName}\n` +
              `🆔 ID: ${result.id}\n\n` +
              `El archivo también se descargará localmente.`
            );
            
            // Abrir el archivo en Google Drive
            window.open(`https://drive.google.com/file/d/${result.id}/view`, '_blank');
            
          } catch (error) {
            console.error('Error al subir a Drive:', error);
            alert(
              '❌ Error al subir a Google Drive.\n\n' +
              'El PDF se descargará solo localmente.\n' +
              'Verifica tu conexión e intenta nuevamente.'
            );
          } finally {
            setUploadingToDrive(false);
          }
        }
      }

      // Descargar localmente SIEMPRE
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('❌ Error al generar el PDF. Revisa la consola para más detalles.');
    }
  };

  if (!usuario) {
    return <Login onLogin={handleLogin} />;
  }

  const isAdmin = authService.isAdmin(usuario);
  const areasDisponibles = ubicacion ? AREAS_POR_UBICACION[ubicacion] || [] : [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* MODAL DE BIENVENIDA */}
      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onClose={() => setShowWelcomeModal(false)}
        usuario={usuario}
      />

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
                <ObservacionesSection 
                  data={observacionesGenerales} 
                  onChange={setObservacionesGenerales}
                  fotografias={fotografiasObservaciones}
                  onFotografiasChange={setFotografiasObservaciones}
                />

                <div className="flex flex-col items-center gap-4 mb-8">
                  <button
                    onClick={handleGeneratePDF}
                    disabled={uploadingToDrive}
                    className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition duration-200 transform hover:scale-105 ${
                      uploadingToDrive 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    <Download className="w-6 h-6" />
                    {uploadingToDrive ? 'Subiendo a Drive...' : 'Descargar Registro PDF'}
                  </button>
                  
                  {/* Indicador de estado de Google Drive */}
                  {driveReady && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Google Drive listo
                    </div>
                  )}
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
                      Completa los datos requeridos para continuar:
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