import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const WelcomeModal = ({ isOpen, onClose, usuario }) => {
  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isAdmin = usuario?.rol === 'admin';

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 animate-fadeIn">
          {/* Header con degradado */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-3">
              <CheckCircle className="w-10 h-10" />
              <div>
                <h2 className="text-2xl font-bold">¡Bienvenido!</h2>
                <p className="text-blue-100 text-sm">Sesión iniciada correctamente</p>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6">
            {/* Información del usuario */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    {usuario?.nombre}
                  </p>
                  <p className="text-sm text-gray-600">
                    Legajo: <span className="font-medium">{usuario?.legajo}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Rol: <span className="font-medium capitalize">
                      {isAdmin ? 'Administrador' : 'Conductor'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Mensaje personalizado según el rol */}
            {isAdmin ? (
              <div className="space-y-3">
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
                  <p className="text-sm text-purple-900 font-semibold mb-2">
                    🔧 Acceso Administrativo
                  </p>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Gestión de usuarios</li>
                    <li>• Registro de locomotoras</li>
                    <li>• Acceso completo al sistema</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                <p className="text-sm text-green-900 font-semibold mb-2">
                  📋 Panel de Movedor
                </p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Crear registros de inspección</li>
                  <li>• Cargar fotografías</li>
                  <li>• Generar reportes en PDF</li>
                </ul>
              </div>
            )}

            {/* Mensaje importante */}
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
  <div className="flex items-start gap-3">
    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
    <div className="flex-1">
      <p className="text-sm font-semibold text-yellow-900 mb-3 flex items-center gap-2">
        📋 Recordatorio Importante
      </p>
      
      {/* Lista de recordatorios */}
      <div className="space-y-3">
        <div className="bg-white rounded p-2 border-l-2 border-yellow-400">
          <p className="text-xs text-gray-500 mb-1">📅 23/11/2025</p>
          <p className="text-xs text-yellow-800">
            Actualmente hay 1 sección de "Fotos Generales" que está de más (en estos días la saco), la de abajo de todo ya soporta multi foto.
          </p>
        </div>
        
        <div className="bg-white rounded p-2 border-l-2 border-blue-400">
          <p className="text-xs text-gray-500 mb-1">🔧 Sistema ATS</p>
          <p className="text-xs text-yellow-800">
            Dar click en "Habilitado" para colocar N° de precinto.
          </p>
        </div>
        
        <div className="bg-white rounded p-2 border-l-2 border-green-400">
          <p className="text-xs text-gray-500 mb-1">☁️ Google Drive</p>
          <p className="text-xs text-yellow-800">
            Actualmente solo yo puedo guardar en Drive a modo prueba hasta que tengamos mail para centralizar los docs, mientras pueden generar el PDF local.

          </p>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-yellow-200 text-right">
        <p className="text-xs text-yellow-700 italic">
          Saludos - Cristian
        </p>
      </div>
    </div>
  </div>
</div>

            {/* Información adicional */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Fecha de acceso: {new Date().toLocaleDateString('es-AR', { 
                  day: '2-digit', 
                  month: 'long', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          {/* Footer con botón */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeModal;