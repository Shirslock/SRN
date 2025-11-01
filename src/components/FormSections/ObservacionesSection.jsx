import React from 'react';
import { FileText } from 'lucide-react';

const ObservacionesSection = ({ data, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-3 mb-6 border-b-2 border-blue-500 pb-2">
        <FileText className="w-7 h-7 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Observaciones Generales</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Incluya aquí cualquier observación general sobre el estado de la locomotora, 
        comentarios adicionales, recomendaciones o información relevante que no haya sido 
        cubierta en las secciones anteriores.
      </p>

      <textarea
        value={data}
        onChange={(e) => onChange(e.target.value)}
        rows="8"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder="Escriba aquí las observaciones generales sobre la inspección de la locomotora...&#10;&#10;Ejemplo:&#10;- Estado general de la unidad&#10;- Recomendaciones de mantenimiento&#10;- Novedades detectadas&#10;- Trabajos pendientes&#10;- Cualquier información relevante"
      />

      <div className="mt-2 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {data.length} caracteres
        </span>
        {data.length > 500 && (
          <span className="text-xs text-green-600 font-semibold">
            ✓ Observación detallada
          </span>
        )}
      </div>
    </div>
  );
};

export default ObservacionesSection;