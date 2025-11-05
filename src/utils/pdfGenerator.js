import jsPDF from 'jspdf';

export const generatePDF = async (
  locomotora, 
  ubicacion, 
  cabina1, 
  cabina2, 
  extintores, 
  niveles, 
  fotografias,
  observacionesGenerales,
  usuario
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;

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

  // Función para agregar nueva página si es necesario
  const checkPageBreak = (requiredSpace = 20) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // Función para agregar texto con wrap
  const addWrappedText = (text, x, y, maxWidth, lineHeight = 7) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line, index) => {
      checkPageBreak();
      doc.text(line, x, y + (index * lineHeight));
    });
    return lines.length * lineHeight;
  };

  // ENCABEZADO
  doc.setFillColor(37, 99, 235); // Azul
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('REGISTRO TÉCNICO DE LOCOMOTORA', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Sistema Ferroviario de Inspección Operativa', pageWidth / 2, 30, { align: 'center' });
  
  yPos = 50;

  // INFORMACIÓN BÁSICA
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 35, 'F');
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  
  doc.text('Número de Locomotora:', margin + 5, yPos + 8);
  doc.setFont('helvetica', 'normal');
  doc.text(locomotora, margin + 60, yPos + 8);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Ubicación:', margin + 5, yPos + 16);
  doc.setFont('helvetica', 'normal');
  doc.text(ubicacion, margin + 60, yPos + 16);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Fecha:', margin + 5, yPos + 24);
  doc.setFont('helvetica', 'normal');
  doc.text(fecha, margin + 60, yPos + 24);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Hora:', margin + 110, yPos + 24);
  doc.setFont('helvetica', 'normal');
  doc.text(hora, margin + 130, yPos + 24);

  yPos += 45;

  // FUNCIÓN PARA AGREGAR SECCIÓN
  const addSection = (title) => {
    checkPageBreak(15);
    doc.setFillColor(37, 99, 235);
    doc.rect(margin, yPos, pageWidth - (margin * 2), 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin + 5, yPos + 7);
    yPos += 15;
  };

  // FUNCIÓN PARA AGREGAR CAMPO
  const addField = (label, value) => {
    checkPageBreak(10);
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, yPos, pageWidth - (margin * 2), 8, 'F');
    
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin, yPos + 8);
    
    doc.setTextColor(71, 85, 105);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(label + ':', margin + 5, yPos + 5);
    
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'normal');
    const labelWidth = doc.getTextWidth(label + ': ');
    doc.text(value || 'N/A', margin + 5 + labelWidth, yPos + 5);
    
    yPos += 10;
  };

  // FUNCIÓN PARA AGREGAR OBSERVACIONES
  const addObservaciones = (text) => {
    if (!text) return;
    
    checkPageBreak(20);
    doc.setFillColor(254, 243, 199);
    const observHeight = Math.max(15, (text.length / 80) * 5 + 10);
    doc.rect(margin, yPos, pageWidth - (margin * 2), observHeight, 'F');
    
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(1);
    doc.line(margin, yPos, margin, yPos + observHeight);
    
    doc.setTextColor(146, 64, 14);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Observaciones:', margin + 5, yPos + 5);
    
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, pageWidth - (margin * 2) - 10);
    lines.forEach((line, index) => {
      doc.text(line, margin + 5, yPos + 12 + (index * 5));
    });
    
    yPos += observHeight + 5;
  };

  // FUNCIÓN PARA AGREGAR IMÁGENES
  const addImages = (images, title) => {
    if (!images || images.length === 0) return;
    
    checkPageBreak(15);
    doc.setTextColor(30, 64, 175);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`📷 ${title}`, margin, yPos);
    yPos += 8;

    const imgWidth = 40;
    const imgHeight = 30;
    const imgsPerRow = 4;
    let imgCount = 0;

    for (const img of images) {
      const col = imgCount % imgsPerRow;
      const xPos = margin + (col * (imgWidth + 5));
      
      if (col === 0 && imgCount > 0) {
        yPos += imgHeight + 12;
        checkPageBreak(imgHeight + 12);
      }

      try {
        doc.addImage(img.data, 'JPEG', xPos, yPos, imgWidth, imgHeight);
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139);
        const truncatedName = img.name.length > 15 ? img.name.substring(0, 12) + '...' : img.name;
        doc.text(truncatedName, xPos + (imgWidth / 2), yPos + imgHeight + 4, { align: 'center' });
      } catch (error) {
        console.error('Error al agregar imagen:', error);
      }

      imgCount++;
    }

    if (imgCount > 0) {
      yPos += imgHeight + 12;
    }
  };

  // CABINA 1
  addSection('CABINA 1');
  addField('Manómetros sin luz', cabina1.manometros);
  addField('Ventiladores no funcionan', cabina1.ventiladores);
  addField('Estado piso de goma', cabina1.pisoGoma);
  addField('Estado piso de madera', cabina1.pisoMadera);
  addField('Luz de cabecera', cabina1.luzCabecera);
  addField('Luz auxiliar blanca', cabina1.luzBlanca);
  addField('Luz auxiliar roja', cabina1.luzRoja);
  addField('Pava eléctrica', cabina1.pava);
  addField('Perchero', cabina1.perchero);
  addField('Limpiaparabrisas', cabina1.limpiaparabrisas);
  
  addImages(cabina1.fotos, 'Fotografías Cabina 1');
  addObservaciones(cabina1.observaciones);

  yPos += 5;

  // CABINA 2
  addSection('CABINA 2');
  addField('Manómetros sin luz', cabina2.manometros);
  addField('Ventiladores no funcionan', cabina2.ventiladores);
  addField('Estado piso de goma', cabina2.pisoGoma);
  addField('Estado piso de madera', cabina2.pisoMadera);
  addField('Luz de cabecera', cabina2.luzCabecera);
  addField('Luz auxiliar blanca', cabina2.luzBlanca);
  addField('Luz auxiliar roja', cabina2.luzRoja);
  addField('Pava eléctrica', cabina2.pava);
  addField('Perchero', cabina2.perchero);
  addField('Limpiaparabrisas', cabina2.limpiaparabrisas);
  
  addImages(cabina2.fotos, 'Fotografías Cabina 2');
  addObservaciones(cabina2.observaciones);

  yPos += 5;

  // EXTINTORES
  addSection('EXTINTORES');
  
  checkPageBreak(35);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  
  // Cabina 1
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, yPos, 60, 25, 'F');
  doc.setTextColor(30, 64, 175);
  doc.text('Cabina 1', margin + 5, yPos + 5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.text(`Estado: ${extintores.cabina1.estado || 'N/A'}`, margin + 5, yPos + 11);
  doc.text(`Carga: ${extintores.cabina1.conCarga ? 'Con carga' : 'Sin carga'}`, margin + 5, yPos + 16);
  doc.text(`Precinto: ${extintores.cabina1.precinto || 'N/A'}`, margin + 5, yPos + 21);

  // Cabina 2
  doc.setFillColor(248, 250, 252);
  doc.rect(margin + 65, yPos, 60, 25, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(9);
  doc.text('Cabina 2', margin + 70, yPos + 5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.text(`Estado: ${extintores.cabina2.estado || 'N/A'}`, margin + 70, yPos + 11);
  doc.text(`Carga: ${extintores.cabina2.conCarga ? 'Con carga' : 'Sin carga'}`, margin + 70, yPos + 16);
  doc.text(`Precinto: ${extintores.cabina2.precinto || 'N/A'}`, margin + 70, yPos + 21);

  // Motor Diesel
  doc.setFillColor(248, 250, 252);
  doc.rect(margin + 130, yPos, 60, 25, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(9);
  doc.text('Motor Diesel', margin + 135, yPos + 5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.text(`Estado: ${extintores.motorDiesel.estado || 'N/A'}`, margin + 135, yPos + 11);
  doc.text(`Carga: ${extintores.motorDiesel.conCarga ? 'Con carga' : 'Sin carga'}`, margin + 135, yPos + 16);
  doc.text(`Precinto: ${extintores.motorDiesel.precinto || 'N/A'}`, margin + 135, yPos + 21);

  yPos += 30;

  // NIVELES
  addSection('NIVELES');
  addField('Combustible', niveles.combustible ? niveles.combustible + ' litros' : 'N/A');
  addField('Caja Incrementadora 1', niveles.cajaInc1);
  addField('Caja Incrementadora 2', niveles.cajaInc2);
  addField('Bomba hidroestática', niveles.bombaHidro);
  addField('Compresor', niveles.compresor);
  addField('Tanque compensador de agua', niveles.tanqueAgua);
  addField('Carter del MD', niveles.carterMD);

  yPos += 5;

  // FOTOGRAFÍAS GENERALES
  if (fotografias && fotografias.length > 0) {
    addSection('FOTOGRAFÍAS GENERALES');
    addImages(fotografias, 'Documentación Fotográfica');
    yPos += 5;
  }

  // OBSERVACIONES GENERALES
  if (observacionesGenerales) {
    addSection('OBSERVACIONES GENERALES');
    checkPageBreak(30);
    
    doc.setFillColor(240, 253, 244);
    const obsHeight = Math.max(25, (observacionesGenerales.length / 80) * 5 + 15);
    doc.rect(margin, yPos, pageWidth - (margin * 2), obsHeight, 'F');
    
    doc.setDrawColor(34, 197, 94);
    doc.setLineWidth(1.5);
    doc.line(margin, yPos, margin, yPos + obsHeight);
    
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Comentarios y Recomendaciones', margin + 5, yPos + 7);
    
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(observacionesGenerales, pageWidth - (margin * 2) - 10);
    lines.forEach((line, index) => {
      doc.text(line, margin + 5, yPos + 15 + (index * 5));
    });
    
    yPos += obsHeight + 5;
  }

  // FIRMA DEL INSPECTOR
  checkPageBreak(40);
  yPos += 10;
  
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 35, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 35);
  
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('DATOS DEL INSPECTOR', margin + 5, yPos + 8);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Legajo:', margin + 5, yPos + 16);
  doc.setFont('helvetica', 'normal');
  doc.text(usuario.legajo, margin + 25, yPos + 16);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Nombre:', margin + 5, yPos + 22);
  doc.setFont('helvetica', 'normal');
  doc.text(usuario.nombre, margin + 25, yPos + 22);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Fecha y Hora:', margin + 5, yPos + 28);
  doc.setFont('helvetica', 'normal');
  doc.text(`${fecha} - ${hora}`, margin + 35, yPos + 28);
  
  // Pie de página
  yPos += 40;
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'italic');
  doc.text('Documento generado electrónicamente por el Sistema Ferroviario de Registro Técnico', pageWidth / 2, yPos, { align: 'center' });

  // Descargar PDF
  const fileName = `Registro_Locomotora_${locomotora}_${fecha.replace(/\//g, '-')}_${hora.replace(/:/g, '-')}.pdf`;
  doc.save(fileName);
};