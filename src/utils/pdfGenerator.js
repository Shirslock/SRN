export const generatePDF = (locomotora, ubicacion, cabina1, cabina2, extintores, niveles, usuario) => {
  const now = new Date();
  const fecha = now.toLocaleDateString('es-AR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
  const hora = now.toLocaleTimeString('es-AR', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registro Locomotora ${locomotora}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Arial', sans-serif; 
          padding: 40px; 
          line-height: 1.6; 
          color: #1e293b;
          background: white;
        }
        .header { 
          text-align: center; 
          border-bottom: 4px solid #2563eb; 
          padding-bottom: 20px; 
          margin-bottom: 30px; 
        }
        .header h1 { 
          color: #1e40af; 
          margin: 0 0 10px 0; 
          font-size: 28px; 
          font-weight: bold;
        }
        .header p { 
          color: #64748b; 
          margin: 5px 0; 
          font-size: 14px;
        }
        .info-box { 
          background: #f1f5f9; 
          padding: 20px; 
          border-radius: 8px; 
          margin-bottom: 25px;
          border-left: 4px solid #3b82f6;
        }
        .info-box p { 
          margin: 8px 0; 
          font-size: 14px;
        }
        .info-box strong { 
          color: #1e40af; 
          font-weight: 600;
          display: inline-block;
          min-width: 150px;
        }
        .section { 
          margin: 25px 0; 
          page-break-inside: avoid; 
        }
        .section-title { 
          background: #2563eb; 
          color: white; 
          padding: 12px 15px; 
          border-radius: 6px; 
          margin-bottom: 15px; 
          font-size: 18px;
          font-weight: bold;
        }
        .field { 
          margin: 8px 0; 
          padding: 10px 12px; 
          background: #f8fafc; 
          border-left: 3px solid #3b82f6;
          border-radius: 4px;
        }
        .field-label { 
          font-weight: 600; 
          color: #475569; 
          display: inline-block;
          min-width: 180px;
        }
        .field-value { 
          color: #1e293b; 
          margin-left: 10px;
        }
        .observaciones {
          background: #fef3c7;
          border-left: 3px solid #f59e0b;
          padding: 12px;
          margin-top: 10px;
          border-radius: 4px;
        }
        .observaciones .field-label {
          color: #92400e;
        }
        .footer { 
          margin-top: 50px; 
          padding-top: 25px; 
          border-top: 2px solid #e2e8f0; 
        }
        .signature-box { 
          background: #f1f5f9; 
          padding: 25px; 
          border-radius: 8px; 
          margin-top: 20px;
          border: 2px solid #cbd5e1;
        }
        .signature-box h3 {
          color: #1e40af;
          margin-bottom: 15px;
          font-size: 16px;
        }
        .signature-box p {
          margin: 8px 0;
          font-size: 14px;
        }
        .timestamp { 
          color: #64748b; 
          font-size: 12px; 
          margin-top: 15px;
          text-align: center;
          font-style: italic;
        }
        .extintor-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-top: 15px;
        }
        .extintor-item {
          background: #f8fafc;
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }
        .extintor-item h4 {
          color: #1e40af;
          margin-bottom: 10px;
          font-size: 14px;
          border-bottom: 2px solid #3b82f6;
          padding-bottom: 5px;
        }
        .extintor-item p {
          margin: 5px 0;
          font-size: 13px;
        }
        @media print {
          body { padding: 20px; }
          .section { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚂 REGISTRO TÉCNICO DE LOCOMOTORA</h1>
        <p>Sistema Ferroviario de Inspección Operativa</p>
      </div>

      <div class="info-box">
        <p><strong>Número de Locomotora:</strong> ${locomotora}</p>
        <p><strong>Ubicación Actual:</strong> ${ubicacion}</p>
        <p><strong>Fecha de Inspección:</strong> ${fecha}</p>
        <p><strong>Hora de Inspección:</strong> ${hora}</p>
      </div>

      <!-- CABINA 1 -->
      <div class="section">
        <div class="section-title">CABINA 1</div>
        <div class="field">
          <span class="field-label">Manómetros sin luz:</span>
          <span class="field-value">${cabina1.manometros || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Ventiladores no funcionan:</span>
          <span class="field-value">${cabina1.ventiladores || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Estado piso de goma:</span>
          <span class="field-value">${cabina1.pisoGoma || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Estado piso de madera:</span>
          <span class="field-value">${cabina1.pisoMadera || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Luz de cabecera:</span>
          <span class="field-value">${cabina1.luzCabecera || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Luz auxiliar blanca:</span>
          <span class="field-value">${cabina1.luzBlanca || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Luz auxiliar roja:</span>
          <span class="field-value">${cabina1.luzRoja || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Pava eléctrica:</span>
          <span class="field-value">${cabina1.pava || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Perchero:</span>
          <span class="field-value">${cabina1.perchero || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Limpiaparabrisas:</span>
          <span class="field-value">${cabina1.limpiaparabrisas || 'N/A'}</span>
        </div>
        ${cabina1.observaciones ? `
        <div class="observaciones">
          <div class="field-label">Observaciones:</div>
          <div class="field-value">${cabina1.observaciones}</div>
        </div>
        ` : ''}
      </div>

      <!-- CABINA 2 -->
      <div class="section">
        <div class="section-title">CABINA 2</div>
        <div class="field">
          <span class="field-label">Manómetros sin luz:</span>
          <span class="field-value">${cabina2.manometros || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Ventiladores no funcionan:</span>
          <span class="field-value">${cabina2.ventiladores || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Estado piso de goma:</span>
          <span class="field-value">${cabina2.pisoGoma || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Estado piso de madera:</span>
          <span class="field-value">${cabina2.pisoMadera || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Luz de cabecera:</span>
          <span class="field-value">${cabina2.luzCabecera || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Luz auxiliar blanca:</span>
          <span class="field-value">${cabina2.luzBlanca || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Luz auxiliar roja:</span>
          <span class="field-value">${cabina2.luzRoja || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Pava eléctrica:</span>
          <span class="field-value">${cabina2.pava || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Perchero:</span>
          <span class="field-value">${cabina2.perchero || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Limpiaparabrisas:</span>
          <span class="field-value">${cabina2.limpiaparabrisas || 'N/A'}</span>
        </div>
        ${cabina2.observaciones ? `
        <div class="observaciones">
          <div class="field-label">Observaciones:</div>
          <div class="field-value">${cabina2.observaciones}</div>
        </div>
        ` : ''}
      </div>

      <!-- EXTINTORES -->
      <div class="section">
        <div class="section-title">EXTINTORES</div>
        <div class="extintor-grid">
          <div class="extintor-item">
            <h4>Cabina 1</h4>
            <p><strong>Estado:</strong> ${extintores.cabina1.estado || 'N/A'}</p>
            <p><strong>Carga:</strong> ${extintores.cabina1.conCarga ? 'Con carga' : 'Sin carga'}</p>
            <p><strong>Precinto:</strong> ${extintores.cabina1.precinto || 'N/A'}</p>
            <p><strong>Chaveta:</strong> ${extintores.cabina1.chaveta || 'N/A'}</p>
          </div>
          <div class="extintor-item">
            <h4>Cabina 2</h4>
            <p><strong>Estado:</strong> ${extintores.cabina2.estado || 'N/A'}</p>
            <p><strong>Carga:</strong> ${extintores.cabina2.conCarga ? 'Con carga' : 'Sin carga'}</p>
            <p><strong>Precinto:</strong> ${extintores.cabina2.precinto || 'N/A'}</p>
            <p><strong>Chaveta:</strong> ${extintores.cabina2.chaveta || 'N/A'}</p>
          </div>
          <div class="extintor-item">
            <h4>Motor Diesel</h4>
            <p><strong>Estado:</strong> ${extintores.motorDiesel.estado || 'N/A'}</p>
            <p><strong>Carga:</strong> ${extintores.motorDiesel.conCarga ? 'Con carga' : 'Sin carga'}</p>
            <p><strong>Precinto:</strong> ${extintores.motorDiesel.precinto || 'N/A'}</p>
            <p><strong>Chaveta:</strong> ${extintores.motorDiesel.chaveta || 'N/A'}</p>
          </div>
        </div>
      </div>

      <!-- NIVELES -->
      <div class="section">
        <div class="section-title">NIVELES</div>
        <div class="field">
          <span class="field-label">Combustible:</span>
          <span class="field-value">${niveles.combustible ? niveles.combustible + ' litros' : 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Caja Incrementadora 1:</span>
          <span class="field-value">${niveles.cajaInc1 || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Caja Incrementadora 2:</span>
          <span class="field-value">${niveles.cajaInc2 || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Bomba hidroestática:</span>
          <span class="field-value">${niveles.bombaHidro || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Compresor:</span>
          <span class="field-value">${niveles.compresor || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Tanque compensador de agua:</span>
          <span class="field-value">${niveles.tanqueAgua || 'N/A'}</span>
        </div>
        <div class="field">
          <span class="field-label">Carter del MD:</span>
          <span class="field-value">${niveles.carterMD || 'N/A'}</span>
        </div>
      </div>

      <!-- FOOTER CON FIRMA -->
      <div class="footer">
        <div class="signature-box">
          <h3>DATOS DEL INSPECTOR</h3>
          <p><strong>Legajo:</strong> ${usuario.legajo}</p>
          <p><strong>Nombre:</strong> ${usuario.nombre}</p>
          <p><strong>Fecha y Hora de Revisión:</strong> ${fecha} - ${hora}</p>
          
          <div class="timestamp">
            Documento generado electrónicamente por Sistema de Registro de Novedades
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Crear blob y descargar
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Registro_Locomotora_${locomotora}_${fecha.replace(/\//g, '-')}_${hora.replace(/:/g, '-')}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  // Nota: El archivo HTML se puede abrir en el navegador y desde ahí 
  // usar "Imprimir > Guardar como PDF" para obtener el PDF final
  alert('Archivo descargado. Ábrilo en tu navegador y usa "Imprimir > Guardar como PDF" para obtener el PDF final.');
};