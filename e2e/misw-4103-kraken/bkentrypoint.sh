#!/bin/bash
set -e # Salir inmediatamente si un comando falla

GHOST_USER_HOME="/home/ghostuser"

# Asegurarse de que el directorio .config exista y sea propiedad de ghostuser
if [ -d "${GHOST_USER_HOME}" ]; then
    sudo mkdir -p "${GHOST_USER_HOME}/.config"
    sudo chown -R ghostuser:ghostuser "${GHOST_USER_HOME}/.config"
else
    echo "Advertencia: El directorio home ${GHOST_USER_HOME} no existe."
fi

echo "--- Iniciando Ghost ---"
# Ejecutar los comandos de Ghost como 'ghostuser', asegurando que HOME apunte a /home/ghostuser.
sudo -u ghostuser \
    HOME="${GHOST_USER_HOME}" \
    PATH="${PATH}:/usr/local/bin:/home/ghostuser/.npm-global/bin" \
    NODE_ENV=production \
    ghost start --dir /var/www/ghost --no-enable-stackdriver

echo "--- Esperando que Ghost esté listo (máximo 60 segundos) ---"
GHOST_READY=false
for i in {1..12}; do
  if curl -s --fail http://localhost:2368/ghost/ > /dev/null; then
    echo "Ghost está listo!"
    GHOST_READY=true
    break
  fi
  echo "Aún esperando a Ghost (intento $i)..."
  sleep 5
done

if [ "$GHOST_READY" != "true" ]; then
  echo "Error: Ghost no inició a tiempo."
  echo "Mostrando logs de Ghost:"
  sudo -u ghostuser \
      HOME="${GHOST_USER_HOME}" \
      PATH="${PATH}:/usr/local/bin:/home/ghostuser/.npm-global/bin" \
      NODE_ENV=production \
      ghost P.S. --dir /var/www/ghost
  exit 1
fi

echo "--- Configurando entorno para Kraken ---"
# Navegar al directorio de la aplicación Kraken donde está el package.json y krakenRunner.js
cd /app

# Establecer variables de entorno necesarias para la ejecución headless
export DISPLAY=:99
# Aunque PUPPETEER_LAUNCH_ARGS no parezca ser usado por kraken-node directamente para las flags,
# lo mantenemos por si algún sub-proceso lo necesitara.
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
export PUPPETEER_LAUNCH_ARGS="--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage --remote-debugging-port=9222"

echo "Variables de entorno para Puppeteer/Kraken:"
echo "PUPPETEER_EXECUTABLE_PATH: ${PUPPETEER_EXECUTABLE_PATH}"
echo "PUPPETEER_LAUNCH_ARGS: ${PUPPETEER_LAUNCH_ARGS}"
echo "DISPLAY: ${DISPLAY}"

echo "--- Ejecutando pruebas de Kraken con krakenRunner ---"
# Comando local es `npm run test:all`, que a su vez ejecuta `node krakenRunner.js`.
# Ejecutamos `node krakenRunner.js` directamente aquí.
# `xvfb-run` es crucial para el entorno headless en Docker.
xvfb-run -a --server-args="-screen 0 1280x1024x24" npm run test:all
KRAKEN_EXIT_CODE=$?

echo "Las pruebas de Kraken finalizaron con el código de salida: $KRAKEN_EXIT_CODE"

echo "--- Deteniendo Ghost ---"
sudo -u ghostuser \
    HOME="${GHOST_USER_HOME}" \
    PATH="${PATH}:/usr/local/bin:/home/ghostuser/.npm-global/bin" \
    NODE_ENV=production \
    ghost stop --dir /var/www/ghost || echo "Fallo al detener Ghost o no estaba corriendo."

exit $KRAKEN_EXIT_CODE
