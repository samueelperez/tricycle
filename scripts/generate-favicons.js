import favicons from 'favicons';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const source = path.join(projectRoot, 'public', 'logo.svg');
const configuration = {
  path: '/',
  appName: 'Tricycle',
  appShortName: 'Tricycle',
  appDescription: 'Tricycle - Expertos en Comercialización de Materiales Reciclables',
  background: 'transparent',
  theme_color: '#1946ba',
  icons: {
    android: {
      background: false,
      mask: true,
      overlayGlow: false
    },
    appleIcon: {
      background: false,
      mask: true
    },
    favicons: true,
    windows: {
      background: false
    }
  }
};

(async () => {
  try {
    const response = await favicons(source, configuration);
    
    // Crear directorio si no existe
    await fs.mkdir(path.join(projectRoot, 'public', 'icons'), { recursive: true });
    
    // Guardar los archivos
    await Promise.all(
      response.images.map(image => 
        fs.writeFile(path.join(projectRoot, 'public', image.name), image.contents)
      )
    );
    
    console.log('Favicons generados correctamente');
  } catch (error) {
    console.error('Error generando favicons:', error);
  }
})(); 