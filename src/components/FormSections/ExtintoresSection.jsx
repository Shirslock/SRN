import React from 'react';

const ExtintoresSection = ({ data, onChange }) => {
  const handleChange = (ubicacion, field, value) => {
    onChange({
      ...data,
      [ubicacion]: { ...data[ubicacion], [field]: value }
    });
  };

  const ExtintorItem = ({ titulo, ubicacion }) => (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-4">{titulo}</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Estado</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Vigente"
                checked={data[ubicacion].estado === 'Vigente'}
                onChange={(e) => handleChange(ubicacion, 'estado', e.target.value)}
                className="mr-2"
              />
              Vigente
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Vencido"
                checked={data[ubicacion].estado === 'Vencido'}
                onChange={(e) => handleChange(ubicacion, 'estado', e.target.value)}
                className="mr-2"
              />
              Vencido
            </label>
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data[ubicacion].conCarga}
              onChange={(e) => handleChange(ubicacion, 'conCarga', e.target.checked)}
              className="mr-2"
            />
            Con carga
          </label>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Precinto</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Con precinto"
                checked={data[ubicacion].precinto === 'Con precinto'}
                onChange={(e) => handleChange(ubicacion, 'precinto', e.target.value)}
                className="mr-2"
              />
              Con precinto
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Sin precinto"
                checked={data[ubicacion].precinto === 'Sin precinto'}
                onChange={(e) => handleChange(ubicacion, 'precinto', e.target.value)}
                className="mr-2"
              />
              Sin precinto
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Chaveta</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Con chaveta"
                checked={data[ubicacion].chaveta === 'Con chaveta'}
                onChange={(e) => handleChange(ubicacion, 'chaveta', e.target.value)}
                className="mr-2"
              />
              Con chaveta
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Sin chaveta"
                checked={data[ubicacion].chaveta === 'Sin chaveta'}
                onChange={(e) => handleChange(ubicacion, 'chaveta', e.target.value)}
                className="mr-2"
              />
              Sin chaveta
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
        Extintores
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ExtintorItem titulo="Cabina 1" ubicacion="cabina1" />
        <ExtintorItem titulo="Cabina 2" ubicacion="cabina2" />
        <ExtintorItem titulo="Motor Diesel" ubicacion="motorDiesel" />
      </div>
    </div>
  );
};

export default ExtintoresSection;