const { After, Before } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');

// Argumentos de lanzamiento de Chrome, principalmente para compatibilidad con Docker/CI.
// Estos argumentos generalmente no causan problemas en ejecuciones locales.
const chromeLaunchArgs = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu', // Útil en entornos headless.
    // '--window-size=1200,900', // Descomentar si necesitas un tamaño de ventana específico.
];

// Log para depurar el valor de PUPPETEER_EXECUTABLE_PATH al inicio del script.
console.log(`[hooks.js] Nivel superior: process.env.PUPPETEER_EXECUTABLE_PATH = ${process.env.PUPPETEER_EXECUTABLE_PATH}`);

Before(async function() {
  // Log para depurar dentro del hook Before.
  console.log(`[hooks.js Before] Iniciando para userId: ${this.userId}`);
  console.log(`[hooks.js Before] process.env.PUPPETEER_EXECUTABLE_PATH = ${process.env.PUPPETEER_EXECUTABLE_PATH}`);

  // Construir las opciones para goog:chromeOptions.
  // Siempre incluimos los args.
  const currentChromeOptions = {
    args: chromeLaunchArgs,
  };

  // Solo añadimos la propiedad 'binary' a goog:chromeOptions si PUPPETEER_EXECUTABLE_PATH está definido.
  // Si PUPPETEER_EXECUTABLE_PATH no está definido (ej., ejecución local en Windows/macOS, o GHA por defecto),
  // no establecemos 'binary', permitiendo que Puppeteer intente la auto-detección.
  if (process.env.PUPPETEER_EXECUTABLE_PATH && process.env.PUPPETEER_EXECUTABLE_PATH !== "") {
    console.log(`[hooks.js Before] Usando ruta de binario explícita: ${process.env.PUPPETEER_EXECUTABLE_PATH}`);
    currentChromeOptions.binary = process.env.PUPPETEER_EXECUTABLE_PATH;
  } else {
    console.log("[hooks.js Before] No se especificó PUPPETEER_EXECUTABLE_PATH, se intentará auto-detección de Chrome.");
    // No se añade currentChromeOptions.binary, dejando que Puppeteer maneje la detección.
  }

  const webClientOptions = {
    'goog:chromeOptions': currentChromeOptions
  };

  console.log('[hooks.js Before] Opciones finales para WebClient:', JSON.stringify(webClientOptions, null, 2));

  this.deviceClient = new WebClient('chrome', webClientOptions, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  console.log('[hooks.js Before] Driver iniciado.');
});

After(async function() {
  console.log(`[hooks.js After] Iniciando para userId: ${this.userId}`);
  if (this.deviceClient) {
    await this.deviceClient.stopKrakenForUserId(this.userId);
    console.log('[hooks.js After] Driver detenido.');
  } else {
    console.log('[hooks.js After] deviceClient no estaba definido, no se puede detener.');
  }
});
