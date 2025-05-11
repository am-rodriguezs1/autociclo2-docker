# Usa una imagen base de Ubuntu 20.04
FROM ubuntu:20.04

# Argumento para la versión de Ghost, con un valor por defecto
ARG GHOST_VERSION_ARG=5.114.1
# Variables de entorno
ENV GHOST_VERSION=${GHOST_VERSION_ARG}
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
# Flags importantes para ejecutar Puppeteer/Chrome en Docker
ENV PUPPETEER_LAUNCH_ARGS="--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage --remote-debugging-port=9222"
ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_ENV=production

# 1. Instalar paquetes del sistema necesarios
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg \
    unzip \
    sudo \
    xvfb \
    android-tools-adb \
    libnss3 \
    libatk-bridge2.0-0 \
    libxss1 \
    libgbm1 \
    libasound2 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgtk-3-0 \
    libdrm2 \
    libu2f-udev \
    fonts-liberation \
    libappindicator3-1 \
    ca-certificates \
    apt-transport-https \
    && rm -rf /var/lib/apt/lists/*

# 2. Instalar Node.js v20.x
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && \
    sudo apt-get install -y nodejs && \
    echo "Node version: $(node -v)" && \
    echo "NPM version: $(npm -v)"

# 3. Instalar Google Chrome Stable
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    sudo dpkg -i google-chrome-stable_current_amd64.deb || sudo apt-get install -fy && \
    rm google-chrome-stable_current_amd64.deb && \
    echo "Chrome version: $(google-chrome-stable --version)"

# 4. Crear un usuario no-root para Ghost
# El UID/GID 1000 es común para el primer usuario no-root.
RUN useradd --create-home --shell /bin/bash --uid 1000 ghostuser && \
    usermod -aG sudo ghostuser && \
    echo 'ghostuser ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# 5. Crear directorio de la aplicación Kraken (/app) y copiar el contenido
WORKDIR /app
COPY . .
# Asegurar que el entrypoint sea ejecutable (se copiará a /app/entrypoint.sh)
RUN chmod +x /app/entrypoint.sh

# 6. Instalar Ghost CLI globalmente (como root, ya que es una herramienta global)
RUN npm install -g ghost-cli && ghost --version

# 7. Crear directorio para la instalación de Ghost y darle permisos al ghostuser
RUN mkdir -p /var/www/ghost && \
    chown -R ghostuser:ghostuser /var/www/ghost

# 8. Cambiar al usuario ghostuser para instalar Ghost
USER ghostuser
WORKDIR /var/www/ghost # Directorio de trabajo para la instalación de Ghost

# Instalar Ghost como ghostuser
# Usamos sudo para que ghost-cli pueda realizar algunas acciones si es necesario,
# pero la instalación se hará como ghostuser en su directorio.
# El flag --no-setup-linux-user es importante ya que ya creamos el usuario.
# El flag --allow-root ya no es necesario porque no somos root.
# Ghost CLI puede necesitar escribir en ~/.config, asegúrate de que el home de ghostuser exista.
RUN ghost install ${GHOST_VERSION} \
    --no-prompt \
    --no-start \
    --local \
    --db sqlite3 \
    --no-setup-linux-user \
    --dir /var/www/ghost \
    --process local

# 9. Volver al usuario root para instalar dependencias de Kraken (si es necesario)
# O, idealmente, dar permisos a ghostuser para el directorio /app y ejecutar npm ci como ghostuser.
# Por simplicidad, volvemos a root.
USER root
WORKDIR /app
RUN npm ci

# Establecer el script de entrada para el contenedor
ENTRYPOINT ["/app/entrypoint.sh"]
CMD []
