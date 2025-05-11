// ./vrt/misw-4103-pixelmatch/vrt.config.js
const path = require('path');

// --- Variables de Entorno (el workflow de GitHub Actions las establecerá) ---
// Se espera que estas variables NO tengan el prefijo 'v'
const ghostVersionV5_raw = process.env.GHOST_VERSION_V5_FOR_VRT || '5.114.1';
const ghostVersionV4_raw = process.env.GHOST_VERSION_V4_FOR_VRT || '4.5.0';

// Determinar si estamos en GitHub Actions
const isGitHubActions = !!process.env.GITHUB_WORKSPACE;

// --- Configuración de Rutas ---
let baseScreenshotsPath; // Para Ghost v4 (considerado "old" o "base")
let rcScreenshotsPath;   // Para Ghost v5 (considerado "new" o "release candidate")
let outputDir;

if (isGitHubActions) {
    console.log("[VRT Config] Detectado entorno de GitHub Actions.");
    const workspaceDir = process.env.GITHUB_WORKSPACE; // Usar GITHUB_WORKSPACE directamente

    // En GitHub Actions, los artefactos se descargan en carpetas (ej: ./screenshots-v4)
    // y DENTRO de ellas, se espera que Kraken haya creado una carpeta de versión con el prefijo 'v'.
    // Ejemplo: ./screenshots-v4/v4.5.0/
    baseScreenshotsPath = path.join(workspaceDir, 'screenshots-v4', `v${ghostVersionV4_raw}`);
    rcScreenshotsPath = path.join(workspaceDir, 'screenshots-v5', `v${ghostVersionV5_raw}`);
    outputDir = path.join(workspaceDir, "VRTReportPixelmatch");

    console.log(`[VRT Config - GHA] CWD: ${process.cwd()}`);
    console.log(`[VRT Config - GHA] Workspace: ${workspaceDir}`);

} else {
    console.log("[VRT Config] Detectado entorno Local.");
    // Rutas para ejecución LOCAL
    // Asume que este archivo (vrt.config.js) está en 'vrt/misw-4103-pixelmatch/'
    // y que Kraken crea las carpetas de versión con el prefijo 'v' localmente también.
    baseScreenshotsPath = path.resolve(__dirname, `../../e2e/misw-4103-kraken/screenshots/v${ghostVersionV4_raw}`);
    rcScreenshotsPath = path.resolve(__dirname, `../../e2e/misw-4103-kraken/screenshots/v${ghostVersionV5_raw}`);
    outputDir = path.resolve(__dirname, "./results"); // Tu configuración local para output
}

console.log(`[VRT Config] Base (Old - Ghost v4 - ${ghostVersionV4_raw}) Screenshots Path: ${baseScreenshotsPath}`);
console.log(`[VRT Config] RC (New - Ghost v5 - ${ghostVersionV5_raw}) Screenshots Path: ${rcScreenshotsPath}`);
console.log(`[VRT Config] Output Directory: ${outputDir}`);

module.exports = {
    pixelOptions: {
        threshold: 0.1,
        includeAA: true, // Booleano
        alpha: 0.5,      // Número
        aaColor: [0, 255, 0], // Array de números
        diffColor: [255, 0, 0] // Array de números
    },
    baseScreenshotsPath,
    rcScreenshotsPath,
    output: outputDir // Asegúrate de que 'outputDir' se exporte como 'output'
};