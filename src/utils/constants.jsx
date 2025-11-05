export const LOCOMOTORAS = Array.from({ length: 21 }, (_, i) => 953 + i);

export const UBICACIONES = [
  'Refugio',
  'Vía tanque',
  'Cambio 17',
  'Cochera',
  'Via 3Ra Plataforma',
  'Via 4Ta Plataforma'
];

export const NIVELES_OPCIONES = ['Mínimo', '¼', '½', '¾', 'Completo'];

// Usuarios autorizados
export const USUARIOS = {
  '13096': { legajo: '13096', password: 'Segura123', nombre: 'Administrador Gil Cristian' },
  '13106': { legajo: '13106', password: '1004', nombre: 'Conductor Schimpf Carlos' }
};

export const INITIAL_CABINA_STATE = {
  manometros: '',
  ventiladores: '',
  pisoGoma: '',
  pisoMadera: '',
  luzCabecera: '',
  luzBlanca: '',
  luzRoja: '',
  pava: '',
  perchero: '',
  limpiaparabrisas: '',
  fotos: [],  // NUEVO
  observaciones: ''
};

export const INITIAL_EXTINTOR_STATE = {
  estado: '',
  conCarga: false,
  precinto: '',
  chaveta: ''
};

export const INITIAL_EXTINTORES_STATE = {
  cabina1: { ...INITIAL_EXTINTOR_STATE },
  cabina2: { ...INITIAL_EXTINTOR_STATE },
  motorDiesel: { ...INITIAL_EXTINTOR_STATE }
};

export const INITIAL_NIVELES_STATE = {
  combustible: '',
  cajaInc1: '',
  cajaInc2: '',
  bombaHidro: '',
  compresor: '',
  tanqueAgua: '',
  carterMD: ''
};