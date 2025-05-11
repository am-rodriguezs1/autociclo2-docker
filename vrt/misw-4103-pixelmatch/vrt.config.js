// vrt/misw-4103-pixelmatch/vrt.config.js
const path = require('path');

// --- Variables de Entorno (el workflow de GitHub Actions las establecerá) ---
const ghostVersionV5 = process.env.GHOST_VERSION_V5_FOR_VRT || '5.114.1';
const ghostVersionV4 = process.env.GHOST_VERSION_V4_FOR_VRT || '4.5.0';

// Determinar si estamos en GitHub Actions
const isGitHubActions = !!process.env.GITHUB_WORKSPACE;

// --- Configuración de Rutas ---
let baseScreenshotsPath; // Para Ghost v4 (considerado "old" o "base")
let rcScreenshotsPath;   // Para Ghost v5 (considerado "new" o "release candidate")
let outputDir;

if (isGitHubActions) {
    console.log("[VRT Config] Detectado entorno de GitHub Actions.");
    // En GitHub Actions, los artefactos se descargan en la raíz del workspace,
    // y dentro de esas carpetas de descarga (ej: ./screenshots-v4)
    // ya está la carpeta de versión (ej: v4.5.0).
    baseScreenshotsPath = path.resolve(process.cwd(), `./screenshots-v4/v${ghostVersionV4}`);
    rcScreenshotsPath = path.resolve(process.cwd(), `./screenshots-v5/v${ghostVersionV5}`);
    outputDir = path.resolve(process.cwd(), "./VRTReportPixelmatch"); // Directorio de salida para reportes en Actions
} else {
    console.log("[VRT Config] Detectado entorno Local.");
    // Rutas para ejecución LOCAL
    // Asume que este archivo (vrt.config.js) está en 'vrt/misw-4103-pixelmatch/'
    baseScreenshotsPath = path.resolve(__dirname, `../../e2e/misw-4103-kraken/screenshots/v${ghostVersionV4}`);
    rcScreenshotsPath = path.resolve(__dirname, `../../e2e/misw-4103-kraken/screenshots/v${ghostVersionV5}`);
    outputDir = path.resolve(__dirname, "./results"); // Tu configuración local para output
}

console.log(`[VRT Config] Base (Old - Ghost v4 - ${ghostVersionV4}) Screenshots Path: ${baseScreenshotsPath}`);
console.log(`[VRT Config] RC (New - Ghost v5 - ${ghostVersionV5}) Screenshots Path: ${rcScreenshotsPath}`);
console.log(`[VRT Config] Output Directory: ${outputDir}`);

module.exports = {
    pixelOptions: {
        threshold: 0.1,
        includeAA: true,
        alpha: 0.5,
        aaColor: [0, 255, 0],
        diffColor: [255, 0, 0]
    },
    baseScreenshotsPath,
    rcScreenshotsPath,
    output: outputDir
};
