# Playwirght Random Tester (GUI Ripper)

Este repositorio contiene el código para un GUI Ripper desarrollado utilizando [Playwright](https://playwright.dev/) un ejecutor de pruebas End to End construido sobre JavaScript.

Este repositorio está basado en la implementación de [TheSoftwareDesignLab/RIPuppetCoursera](https://github.com/TheSoftwareDesignLab/RIPuppetCoursera).

## Requisitos

- Node.js (v20 o superior). Recomendamos usar lts/iron.
- npm o yarn para la gestión de dependencias.

## Cómo ejecutar

Para usar el GUI Ripper, debes seguir estos pasos:

- **Instalar los módulos requeridos**

  ```bash
  npm install
  npm prepare
  ```

- **Configurar los parámetros deseados**: La carpeta raíz del repositorio contiene los archivos de configuración del GUI Ripper (`config.json`)

Es necesario que antes de lanzar el ripper se sigan los siguientes pasos:
1. Levantar la aplicacion GHOST en un contenedor.
2. se debe crear una cuenta en la siguiente url: [Setup page](localhost:2368/ghost/#/setup)  para poder hacer el login automatico y empezar la exploración.
3. Establezca las credenciales creadas anteriormente en el siguiente archivo de configuracion:

  ```javascript
  {
      /** Base URL to initiate the exploration */
      "url": "http://localhost:2368/ghost/#/",
      /** indicates weheter the execution will be on headless mode */
      "headless": true,
      /** Ripper tree exploration level */
      "depthLevels": 1,
      /** indicates whether to use the data from values' */
      "inputValues": false,

      /** Key-value pairs containing the html ID (key) and input (value) to be used by the ripper */
      "values": {
            "identification": "user@user.com",
            "password": "password"
      },

      /** list of browser to use for the execution */
      "browsers": ["chromium"]
  }
  ```

- **Ejecutar el GUI Ripper**: Los comandos para ejecutar las pruebas deben ejecutarse desde la carpeta raíz.

  ```bash
  npm run test
  ```

## Reportes

El GUI Ripper genera un reporte con la exploración realizada por cada uno de los browsers definidos en la configuración. Cada reporte contiene un un archivo `.html` y una serie de archivos `.json` con el grafo de exploración.

### Cambios realizados

## Resumen de los cambios:

1. **Inicio de sesión automático**:
   - Se utiliza la función `loginToGhost(page)` para iniciar sesión en la aplicación Ghost.

2. **Exploración de rutas específicas**:
   - Se recorre la lista `ghostPages` para navegar a las principales secciones de la aplicación Ghost.

3. **Construcción de URLs completas**:
   - Se genera la URL completa combinando `baseUrl` con cada ruta de `ghostPages`.

4. **Exploración recursiva**:
   - Se llama a `recursiveExploration` para analizar cada página, capturar su DOM y explorar enlaces internos.

5. **Manejo de errores**:
   - Si ocurre un error al explorar una página, el script continúa con la siguiente ruta sin detenerse.