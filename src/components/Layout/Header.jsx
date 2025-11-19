import React from 'react';
import { Train, LogOut, User } from 'lucide-react';

const Header = ({ locomotora, ubicacion, area, usuario, onLogout }) => {
  return (
    <div className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Train className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">Sistema de Registro de Novedades</h1>
            {locomotora && (
              <p className="text-sm text-blue-100">
                Locomotora {locomotora} - {ubicacion}
                {area && <span className="ml-1">({area})</span>}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded-lg">
            <User className="w-4 h-4" />
            <div className="text-sm">
              <div className="font-medium">{usuario.nombre}</div>
              <div className="text-blue-200 text-xs">Legajo: {usuario.legajo}</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;