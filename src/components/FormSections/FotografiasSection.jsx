import React from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const FotografiasSection = ({ data, onChange }) => {
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...data, {
          name: file.name,
          data: reader.result,
          size: file.size
        }];
        onChange(newImages);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = data.filter((_, i) => i !== index);
    onChange(newImages);
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
        <ImageIcon className="w-7 h-7 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Fotografías Generales</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Adjunte fotografías generales de la locomotora, exteriores, detalles importantes o cualquier elemento que requiera documentación visual.
      </p>
      
      <div className="flex items-center gap-4 mb-6">
        <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer transition shadow-md">
          <Upload className="w-5 h-5" />
          <span className="font-semibold">Agregar Fotografías</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
            {data.length} foto(s)
          </div>
          {data.length > 0 && (
            <span className="text-sm text-gray-500">
              Total: {formatFileSize(data.reduce((acc, foto) => acc + foto.size, 0))}
            </span>
          )}
        </div>
      </div>

      {data.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No hay fotografías cargadas</p>
          <p className="text-sm text-gray-400">Haga clic en "Agregar Fotografías" para comenzar</p>
        </div>
      )}

      {data.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.map((foto, index) => (
            <div key={index} className="relative group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <img
                src={foto.data}
                alt={foto.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition flex items-center justify-center">
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition transform hover:scale-110"
                  title="Eliminar foto"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                #{index + 1}
              </div>
              <div className="p-2 bg-gray-50">
                <p className="text-xs text-gray-600 truncate" title={foto.name}>{foto.name}</p>
                <p className="text-xs text-gray-400">{formatFileSize(foto.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FotografiasSection;