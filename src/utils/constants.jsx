export const LOCOMOTORAS = [950, ...Array.from({ length: 21 }, (_, i) => 953 + i)];

// Ubicaciones principales
export const UBICACIONES = ['José C. Paz', 'Retiro'];

// Áreas por ubicación
export const AREAS_POR_UBICACION = {
  'José C. Paz': [
    'Refugio',
    'Vía tanque',
    'Cambio 17',
    'Cochera',
    'Vía 3ra Plataforma',
    'Vía 4ta Plataforma'
  ],
  'Retiro': [
    'Vía 1ra Deposito',
    'Vía 2da Deposito',
    'Vía 3ra Deposito',
    'Vía 4ta Deposito',
    'Casa del Planchita'
  ]
};

export const NIVELES_OPCIONES = ['Mínimo', '¼', '½', '¾', 'Completo'];

export const FILTRO_TURBO_OPCIONES = ['Verde', 'Amarillo', 'Rojo'];

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
  ats: '',              // NUEVO
  atsPrecinto: '',
  fotos: [],
  observaciones: ''
};

export const INITIAL_EXTINTOR_STATE = {
  estado: '',
  conCarga: false,
  precinto: '',
  chaveta: '',
  vencimiento: ''
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

export const INITIAL_FILTROS_TURBO_STATE = {
  filtro1: '',
  filtro2: ''
};