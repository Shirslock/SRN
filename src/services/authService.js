// Usuarios hardcoded (sin base de datos)
const USUARIOS_LOCAL = {
  '13096': { legajo: '13096', password: 'Elcoloteagarra1881', nombre: 'Administrador Principal', rol: 'admin' },
  '13106': { legajo: '13106', password: '1004', nombre: 'Schimpf Carlos', rol: 'Conductor' },
  '3467': { legajo: '3467', password: '8477', nombre: 'Rosales Norberto', rol: 'Inspector' },
  '3453': { legajo: '3453', password: 'jose123', nombre: 'Maldonado Jose', rol: 'Conductor' }
  
};

export const authService = {
  // Login de usuario (sin BD)
  async login(legajo, password) {
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const usuario = USUARIOS_LOCAL[legajo];
      
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      
      if (usuario.password !== password) {
        throw new Error('Contraseña incorrecta');
      }

      return {
        success: true,
        usuario: {
          id: legajo,
          legajo: usuario.legajo,
          nombre: usuario.nombre,
          rol: usuario.rol
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Verificar si es admin
  isAdmin(usuario) {
    return usuario && usuario.rol === 'admin';
  }
};