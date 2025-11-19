import React from 'react';
import { FileText, Upload, X, Image as ImageIcon } from 'lucide-react';

const ObservacionesSection = ({ data, onChange, fotografias, onFotografiasChange }) => {
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const currentImages = fotografias || [];
    
    // Procesar todos los archivos seleccionados
    const promises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            name: file.name,
            data: reader.result,
            size: file.size
          });
        };
        reader.readAsDataURL(file);
      });
    });

    // Esperar a que todas las imágenes se carguen
    Promise.all(promises).then(newImages => {
      onFotografiasChange([...currentImages, ...newImages]);
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = fotografias.filter((_, i) => i !== index);
    onFotografiasChange(newImages);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

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

      {/* SECCIÓN DE FOTOS DE OBSERVACIONES */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <ImageIcon className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Fotografías de Observaciones</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Adjunte fotografías relacionadas con las observaciones generales registradas.
        </p>
        
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition">
            <Upload className="w-5 h-5" />
            <span>Subir Fotos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <span className="text-sm text-gray-500">
            {(fotografias || []).length} foto(s) cargada(s)
          </span>
        </div>

        {fotografias && fotografias.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fotografias.map((foto, index) => (
              <div key={index} className="relative group border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={foto.data}
                  alt={foto.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center">
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="opacity-0 group-hover:opacity-100 bg-red-600 text-white p-2 rounded-full transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-2 bg-gray-50">
                  <p className="text-xs text-gray-600 truncate">{foto.name}</p>
                  <p className="text-xs text-gray-400">{formatFileSize(foto.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ObservacionesSection;