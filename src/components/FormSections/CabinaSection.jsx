import React from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const CabinaSection = ({ numero, data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

    const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const currentImages = data.fotos || [];
    
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
      handleChange('fotos', [...currentImages, ...newImages]);
    });
  }

  const handleRemoveImage = (index) => {
    const newImages = (data.fotos || []).filter((_, i) => i !== index);
    handleChange('fotos', newImages);
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
        Cabina {numero}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Manómetros sin luz
          </label>
          <select
            value={data.manometros}
            onChange={(e) => handleChange('manometros', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar...</option>
            <option value="Manómetro 1">Manómetro 1</option>
            <option value="Manómetro 2">Manómetro 2</option>
            <option value="Manómetro 3">Manómetro 3</option>
            <option value="Todos">Todos SIN luces</option>
            <option value="Todos con Luces">Todos CON luces</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ventiladores no funcionan
          </label>
          <select
            value={data.ventiladores}
            onChange={(e) => handleChange('ventiladores', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar...</option>
            <option value="LC">LC</option>
            <option value="LA">LA</option>
            <option value="Ambos">Ambos</option>
            <option value="Todos Funcionan">Todos Funcionan</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Estado del piso de goma
          </label>
          <select
            value={data.pisoGoma}
            onChange={(e) => handleChange('pisoGoma', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar...</option>
            <option value="Despegado">Despegado</option>
            <option value="Fisurado">Fisurado</option>
            <option value="En condiciones">En condiciones</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Estado del piso de madera
          </label>
          <select
            value={data.pisoMadera}
            onChange={(e) => handleChange('pisoMadera', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar...</option>
            <option value="Hundido lado conductor">Hundido lado conductor</option>
            <option value="Hundido lado ayudante">Hundido lado ayudante</option>
            <option value="En condiciones">En condiciones</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Luz de cabecera
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Funciona"
                checked={data.luzCabecera === 'Funciona'}
                onChange={(e) => handleChange('luzCabecera', e.target.value)}
                className="mr-2"
              />
              Funciona
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="No funciona"
                checked={data.luzCabecera === 'No funciona'}
                onChange={(e) => handleChange('luzCabecera', e.target.value)}
                className="mr-2"
              />
              No funciona
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Luz auxiliar blanca
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Funciona"
                checked={data.luzBlanca === 'Funciona'}
                onChange={(e) => handleChange('luzBlanca', e.target.value)}
                className="mr-2"
              />
              Funciona
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="No funciona"
                checked={data.luzBlanca === 'No funciona'}
                onChange={(e) => handleChange('luzBlanca', e.target.value)}
                className="mr-2"
              />
              No funciona
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Luz auxiliar roja
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Funciona"
                checked={data.luzRoja === 'Funciona'}
                onChange={(e) => handleChange('luzRoja', e.target.value)}
                className="mr-2"
              />
              Funciona
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="No funciona"
                checked={data.luzRoja === 'No funciona'}
                onChange={(e) => handleChange('luzRoja', e.target.value)}
                className="mr-2"
              />
              No funciona
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Pava eléctrica
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Posee"
                checked={data.pava === 'Posee'}
                onChange={(e) => handleChange('pava', e.target.value)}
                className="mr-2"
              />
              Posee
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="No posee"
                checked={data.pava === 'No posee'}
                onChange={(e) => handleChange('pava', e.target.value)}
                className="mr-2"
              />
              No posee
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Perchero
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Posee"
                checked={data.perchero === 'Posee'}
                onChange={(e) => handleChange('perchero', e.target.value)}
                className="mr-2"
              />
              Posee
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="No posee"
                checked={data.perchero === 'No posee'}
                onChange={(e) => handleChange('perchero', e.target.value)}
                className="mr-2"
              />
              No posee
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Limpiaparabrisas
          </label>
          <select
            value={data.limpiaparabrisas}
            onChange={(e) => handleChange('limpiaparabrisas', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar...</option>
            <option value="Lado conductor no funciona">Lado conductor no funciona</option>
            <option value="Lado ayudante no funciona">Lado ayudante no funciona</option>
            <option value="Funcionan">Funcionan</option>
          </select>
        </div>
          <div className="md:col-span-2 border-t pt-4 mt-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            ATS (Sistema de Seguridad)
          </label>
          <div className="flex gap-6 items-start">
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Habilitado"
                  checked={data.ats === 'Habilitado'}
                  onChange={(e) => handleChange('ats', e.target.value)}
                  className="mr-2"
                />
                Habilitado
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="No habilitado"
                  checked={data.ats === 'No habilitado'}
                  onChange={(e) => handleChange('ats', e.target.value)}
                  className="mr-2"
                />
                No habilitado
              </label>
            </div>

            {data.ats === 'Habilitado' && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Precinto
                </label>
                <input
                  type="text"
                  value={data.atsPrecinto || ''}
                  onChange={(e) => handleChange('atsPrecinto', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese el número de precinto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      

      {/* SECCIÓN DE FOTOS */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Fotografías de la Cabina
        </label>
        
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
            {(data.fotos || []).length} foto(s) cargada(s)
          </span>
        </div>

        {data.fotos && data.fotos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.fotos.map((foto, index) => (
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

      {/* OBSERVACIONES AL FINAL */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Observaciones
        </label>
        <textarea
          value={data.observaciones}
          onChange={(e) => handleChange('observaciones', e.target.value)}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese observaciones adicionales sobre el estado de la cabina..."
        />
      </div>
    </div>
  );
};

export default CabinaSection;