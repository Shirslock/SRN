// src/services/driveService.js

const CLIENT_ID = '867044050164-2rt3jlifr3j6phlo03qfrteoaj5dncg2.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

let gapiLoaded = false;
let tokenClient = null;

export const driveService = {
  // Inicializar Google Identity Services
  init: () => {
    return new Promise((resolve) => {
      if (gapiLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: '', // Se define al momento de usar
        });
        gapiLoaded = true;
        resolve();
      };
      script.onerror = () => {
        console.error('Error al cargar Google Identity Services');
        resolve(); // Resolver igual para no bloquear
      };
      document.body.appendChild(script);
    });
  },

  // Subir PDF a Google Drive
  uploadPDF: (pdfBlob, fileName) => {
    return new Promise((resolve, reject) => {
      if (!tokenClient) {
        reject(new Error('Google Drive no está inicializado'));
        return;
      }

      tokenClient.callback = async (response) => {
        if (response.error) {
          reject(response);
          return;
        }

        const metadata = {
          name: fileName,
          mimeType: 'application/pdf'
        };

        const formData = new FormData();
        formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        formData.append('file', pdfBlob);

        try {
          const uploadResponse = await fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
            {
              method: 'POST',
              headers: { Authorization: `Bearer ${response.access_token}` },
              body: formData
            }
          );

          if (!uploadResponse.ok) {
            throw new Error('Error en la subida a Google Drive');
          }

          const result = await uploadResponse.json();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      // Solicitar token de acceso
      tokenClient.requestAccessToken({ prompt: 'consent' });
    });
  },

  // Verificar si está inicializado
  isReady: () => gapiLoaded && tokenClient !== null
};