import React from 'react';
import { Wind } from 'lucide-react';

const FiltrosTurboSection = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const getColorClass = (color) => {
    switch(color) {
      case 'Verde':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'Amarillo':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'Rojo':
        return 'bg-red-100 border-red-500 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-3 mb-6 border-b-2 border-blue-500 pb-2">
        <Wind className="w-7 h-7 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Filtros de Turbo</h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Indicá el estado visual de cada filtro de turbo según el código de colores.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Filtro 1 */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtro 1</h3>
          
          <div className="space-y-3">
            <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition hover:bg-white">
              <input
                type="radio"
                value="Verde"
                checked={data.filtro1 === 'Verde'}
                onChange={(e) => handleChange('filtro1', e.target.value)}
                className="mr-3 w-5 h-5"
              />
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-500 border-2 border-green-700"></span>
                <span className="font-semibold text-gray-700">Verde - Óptimo</span>
              </span>
            </label>

            <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition hover:bg-white">
              <input
                type="radio"
                value="Amarillo"
                checked={data.filtro1 === 'Amarillo'}
                onChange={(e) => handleChange('filtro1', e.target.value)}
                className="mr-3 w-5 h-5"
              />
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-600"></span>
                <span className="font-semibold text-gray-700">Amarillo - Precaución</span>
              </span>
            </label>

            <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition hover:bg-white">
              <input
                type="radio"
                value="Rojo"
                checked={data.filtro1 === 'Rojo'}
                onChange={(e) => handleChange('filtro1', e.target.value)}
                className="mr-3 w-5 h-5"
              />
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-500 border-2 border-red-700"></span>
                <span className="font-semibold text-gray-700">Rojo - Crítico</span>
              </span>
            </label>
          </div>

          {data.filtro1 && (
            <div className={`mt-4 p-3 rounded-lg border-2 ${getColorClass(data.filtro1)}`}>
              <p className="text-sm font-semibold">Estado seleccionado: {data.filtro1}</p>
            </div>
          )}
        </div>

        {/* Filtro 2 */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtro 2</h3>
          
          <div className="space-y-3">
            <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition hover:bg-white">
              <input
                type="radio"
                value="Verde"
                checked={data.filtro2 === 'Verde'}
                onChange={(e) => handleChange('filtro2', e.target.value)}
                className="mr-3 w-5 h-5"
              />
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-500 border-2 border-green-700"></span>
                <span className="font-semibold text-gray-700">Verde - Óptimo</span>
              </span>
            </label>

            <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition hover:bg-white">
              <input
                type="radio"
                value="Amarillo"
                checked={data.filtro2 === 'Amarillo'}
                onChange={(e) => handleChange('filtro2', e.target.value)}
                className="mr-3 w-5 h-5"
              />
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-600"></span>
                <span className="font-semibold text-gray-700">Amarillo - Precaución</span>
              </span>
            </label>

            <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition hover:bg-white">
              <input
                type="radio"
                value="Rojo"
                checked={data.filtro2 === 'Rojo'}
                onChange={(e) => handleChange('filtro2', e.target.value)}
                className="mr-3 w-5 h-5"
              />
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-500 border-2 border-red-700"></span>
                <span className="font-semibold text-gray-700">Rojo - Crítico</span>
              </span>
            </label>
          </div>

          {data.filtro2 && (
            <div className={`mt-4 p-3 rounded-lg border-2 ${getColorClass(data.filtro2)}`}>
              <p className="text-sm font-semibold">Estado seleccionado: {data.filtro2}</p>
            </div>
          )}
        </div>
      </div>

      {/* Resumen visual */}
      {(data.filtro1 || data.filtro2) && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-gray-800 mb-2">Resumen de Estados:</h4>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Filtro 1:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getColorClass(data.filtro1)}`}>
                {data.filtro1 || 'Sin seleccionar'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Filtro 2:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getColorClass(data.filtro2)}`}>
                {data.filtro2 || 'Sin seleccionar'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltrosTurboSection;