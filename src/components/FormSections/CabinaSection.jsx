import React from 'react';

const CabinaSection = ({ numero, data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
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
            <option value="Todos">Todos</option>
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
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Observaciones
        </label>
        <textarea
          value={data.observaciones}
          onChange={(e) => handleChange('observaciones', e.target.value)}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese observaciones adicionales..."
        />
      </div>
    </div>
  );
};

export default CabinaSection;