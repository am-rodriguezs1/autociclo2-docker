// vrt/misw-4103-pixelmatch/vrt.config.js
const path = require('path');

// --- Variables de Entorno (el workflow de GitHub Actions las establecerá) ---
// GHOST_VERSION_V5_FOR_VRT: La versión de Ghost v5 (ej: '5.114.1')
// GHOST_VERSION_V4_FOR_VRT: La versión de Ghost v4 (ej: '4.5.0')
// BASE_SCREENSHOTS_PATH_FOR_VRT: Ruta a la carpeta de screenshots de Ghost v4 en Actions
// RC_SCREENSHOTS_PATH_FOR_VRT: Ruta a la carpeta de screenshots de Ghost v5 en Actions
// OUTPUT_PATH_FOR_VRT: Ruta para guardar los reportes de VRT en Actions

// Determinar si estamos en GitHub Actions (una forma simple es ver si GITHUB_WORKSPACE está definido)
const isGitHubActions = !!process.env.GITHUB_WORKSPACE;

// --- Configuración de Rutas ---
let baseScreenshotsPath;
let rcScreenshotsPath;
let outputDir;

// Versiones de Ghost
// El workflow pasará estas como variables de entorno.
// Para local, si no se pasan, usamos valores por defecto o los que tenías.
const ghostVersionV4 = process.env.GHOST_VERSION_V4_FOR_VRT || '4.5.0'; // Tu default para v4
const ghostVersionV5 = process.env.GHOST_VERSION_V5_FOR_VRT || '5.114.1'; // Tu default para v5

if (isGitHubActions) {
    console.log("[VRT Config] Detectado entorno de GitHub Actions.");
    // En GitHub Actions, los artefactos se descargan en la raíz del workspace.
    // Y dentro de ellos, está la estructura /screenshots/vX.Y.Z/
    baseScreenshotsPath = process.env.BASE_SCREENSHOTS_PATH_FOR_VRT || path.resolve(process.cwd(), `./screenshots-v4/screenshots/v${ghostVersionV4}`);
    rcScreenshotsPath = process.env.RC_SCREENSHOTS_PATH_FOR_VRT || path.resolve(process.cwd(), `./screenshots-v5/screenshots/v${ghostVersionV5}`);
    outputDir = process.env.OUTPUT_PATH_FOR_VRT || path.resolve(process.cwd(), "./VRTReportPixelmatch");
} else {
    console.log("[VRT Config] Detectado entorno Local.");
    // Rutas para ejecución LOCAL
    // Asume que este archivo (vrt.config.js) está en 'vrt/misw-4103-pixelmatch/'
    // y que el script index.js se ejecuta desde esa misma carpeta o desde la raíz del proyecto.
    // Tus rutas relativas "../../e2e/..." sugieren que se ejecuta desde 'vrt/misw-4103-pixelmatch/'
    baseScreenshotsPath = path.resolve(__dirname, `../../e2e/misw-4103-kraken/screenshots/v${ghostVersionV4}`);
    rcScreenshotsPath = path.resolve(__dirname, `../../e2e/misw-4103-kraken/screenshots/v${ghostVersionV5}`);
    outputDir = path.resolve(__dirname, "./results"); // Tu configuración local para output
}

console.log(`[VRT Config] Base (Old - Ghost v4 - ${ghostVersionV4}) Screenshots Path: ${baseScreenshotsPath}`);
console.log(`[VRT Config] RC (New - Ghost v5 - ${ghostVersionV5}) Screenshots Path: ${rcScreenshotsPath}`);
console.log(`[VRT Config] Output Directory: ${outputDir}`);

module.exports = {
    pixelOptions: { // Tus opciones de pixelmatch
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
