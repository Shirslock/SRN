import React, { useState } from 'react';
import { Users, AlertCircle } from 'lucide-react';

const UserManagement = () => {
  const [usuarios] = useState([
    { id: '1', legajo: '13096', nombre: 'Administrador Principal', rol: 'admin', activo: true, created_at: '2025-01-01' },
    { id: '2', legajo: '13106', nombre: 'Schimpf Carlos', rol: 'Conductor', activo: true, created_at: '2025-01-01' }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-blue-500 pb-4">
        <div className="flex items-center gap-3">
          <Users className="w-7 h-7 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h2>
        </div>
      </div>

      {/* Mensaje informativo */}
      <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">
              Gestión de usuarios en modo local
            </p>
            <p className="text-sm text-blue-800">
              Esta funcionalidad estará disponible cuando se implemente la base de datos. 
              Actualmente los usuarios están configurados de forma local.
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Legajo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rol</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha Creación</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{user.legajo}</td>
                <td className="px-4 py-3 text-sm">{user.nombre}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.rol === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.rol === 'admin' ? 'Administrador' : 'Operador'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.activo 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(user.created_at).toLocaleDateString('es-AR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nota al pie */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600">
          <strong>Nota:</strong> Para habilitar la gestión completa de usuarios, 
          active la integración con base de datos en la configuración del sistema.
        </p>
      </div>
    </div>
  );
};

export default UserManagement;