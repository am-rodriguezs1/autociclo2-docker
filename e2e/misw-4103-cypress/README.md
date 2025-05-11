# Proyecto Base: Pruebas End to End con Cypress

Cypress es un framework moderno y fácil de usar para realizar pruebas End-to-End (E2E) en aplicaciones web. Ofrece:

- Una interfaz intuitiva para escribir y depurar tests.
- Esperas automáticas y _time travel_ para diagnóstico en tiempo real.
- Integración nativa con navegadores reales.

Este repositorio contiene la configuración base de Cypress, ahora extendida para soportar escenarios escritos en Gherkin mediante Cucumber.

### Integración con Cucumber (Gherkin)

[Cucumber](https://cucumber.io/) es una herramienta que permite escribir tests de aceptación en un lenguaje legible (Gherkin), facilitando la colaboración entre desarrolladores y stakeholders. Para usar Cucumber con Cypress se incorporan:

- **@badeball/cypress-cucumber-preprocessor:**:Plugin que parsea y vincula archivos .feature con los step definitions.

- **@bahmutov/cypress-esbuild-preprocessor:**:Bundler rápido que compila los tests escritos en ESNext.

- **esbuild:**:Motor de bundling ultra rápido.


---

## Requisitos Básicos

- **Node.js** (v20 o superior)  
- **npm** o **yarn** para la gestión de dependencias  
- **Cypress** instalado en el dispositivo
- **Chrome, Chromium o Firefox** si deseas ejecutar las pruebas en navegadores distintos a Electron

---

## Ejecución de Pruebas

Para ejecutar las pruebas de Cypress en este proyecto, sigue los siguientes pasos:

### 1. Instalar los módulos necesarios
Primero, instala los módulos ejecutando desde la raiz del proyecto *202512-proyecto-equipo-6* el siguiente comando en la terminal:
```bash
npm ci --prefix ./e2e/misw-4103-cypress
```
Alternativamente, puedes entrar primero al directorio `./e2e/misw-4103-cypress` y luego ejecutar:
```bash
npm ci --prefix ./
```

### 2. Navegar al directorio de Cypress
Una vez instalados los módulos, navega al directorio `./e2e/misw-4103-cypress`:

```bash
cd ./e2e/misw-4103-cypress
```

### 3. Preparación de Ghost

Para ejecutar las pruebas, necesitas tener una instancia de **Ghost** corriendo.

Las pruebas están organizadas por funcionalidad. Según la funcionalidad que desees probar, debes preparar Ghost de una forma específica:

- **Si vas a probar la creación del sitio**, necesitas una instancia **sin configuración inicial**.
- **Para cualquier otra prueba**, necesitas un sitio de Ghost **ya creado y con acceso disponible (usuario y contraseña).**

Puedes preparar Ghost de dos formas:

#### Opción 1: Usar Docker (más rápido y fácil)

> Requiere tener **Docker instalado** previamente.

1. Descarga la imagen de Ghost (reemplaza `VERSION` por la versión que necesites, por ejemplo `5.71`):

   ```bash
   docker image pull ghost:VERSION
   ```

2. Crea y ejecuta el contenedor de Ghost:

```bash
docker run -d --name some-ghost \
  -e NODE_ENV=development \
  -e url=http://localhost:3001 \
  -p 3001:2368 \
  ghost:VERSION
```

3. Abre tu navegador y entra a: http://localhost:3001

  - Para acceder al panel de administración, añade /ghost al final de la URL: http://localhost:3001/ghost

  #### Opción 2: Usar npm (Ghost CLI)

> Esta opción requiere más pasos y puede requerir cambiar de versión de Node.js según la versión de Ghost.

1. Instala la herramienta de línea de comandos de Ghost:  
   `npm install -g ghost-cli`

2. Crea una carpeta para tu instalación de Ghost y entra en ella con la terminal:  
   `mkdir ghost-site`  
   `cd ghost-site`

3. Instala Ghost de forma local (reemplaza `VERSION` por la versión deseada):  
   `ghost install VERSION --no-prompt --no-start --local`  
   (Si la versión está deprecada, puedes necesitar añadir el parámetro `--force`)

4. Inicia Ghost:  
   `ghost start`

   Por defecto, Ghost estará disponible en:  
   `http://localhost:2368`

   Para acceder al panel de administración:  
   `http://localhost:2368/ghost`

### 4. Estructura del directorio
La estructura de la carpeta `misw-4103-cypress` es la siguiente:

```
📦 cypress
┣---- 📂 e2e
┃ ┣---- 📜 Example.feature
┃
┣---- 📂 escenarios
┃ ┣---- 📂 autenticar_usuario
┃ ┃ ┣---- 📜 ESC017.feature
┃ ┃ ┣---- 📜 ESC018.feature
┃ ┃ ┣---- 📜 ESC019.feature
┃ ┃ ┣---- 📜 ESC020.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_miembro
┃ ┃ ┣---- 📜 ESC009.feature
┃ ┃ ┣---- 📜 ESC010.feature
┃ ┃ ┣---- 📜 ESC011.feature
┃ ┃ ┣---- 📜 ESC012.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_publicacion
┃ ┃ ┣---- 📜 ESC001.feature
┃ ┃ ┣---- 📜 ESC002.feature
┃ ┃ ┣---- 📜 ESC003.feature
┃ ┃ ┣---- 📜 ESC004.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_sitio
┃ ┃ ┣---- 📜 ESC013.feature
┃ ┃ ┣---- 📜 ESC014.feature
┃ ┃ ┣---- 📜 ESC015.feature
┃ ┃ ┣---- 📜 ESC016.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_tag
┃ ┃ ┣---- 📜 ESC005.feature
┃ ┃ ┣---- 📜 ESC006.feature
┃ ┃ ┣---- 📜 ESC007.feature
┃ ┃ ┣---- 📜 ESC008.feature
┃ ┃ ┗---- 📜 step.js
┃
┃
┣---- 📂 escenarios_base
┃ ┣---- 📂 autenticar_usuario
┃ ┃ ┣---- 📜 ESC019.feature
┃ ┃ ┣---- 📜 ESC020.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_miembro
┃ ┃ ┣---- 📜 ESC010.feature
┃ ┃ ┣---- 📜 ESC011.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_publicacion
┃ ┃ ┣---- 📜 ESC003.feature
┃ ┃ ┣---- 📜 ESC004.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_sitio
┃ ┃ ┣---- 📜 ESC000.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_tag
┃ ┃ ┣---- 📜 ESC007.feature
┃ ┃ ┣---- 📜 ESC008.feature
┃ ┃ ┗---- 📜 step.js
┃
┣---- 📂 page_object
┃ ┣---- 📜 NewMemberPage.js
┃ ┣---- 📜 SignInPage.js
┃
┣---- 📂 support
┃ ┣---- 📂 step_definition
┃ ┃ ┗---- 📜 steps.js
┃
┗---- 📜 cypressRunner.js
```


- **Example.feature**: Este archivo corresponde al *feature* que se ejecutará. Su contenido debe ser reemplazado antes de ejecutar cada prueba.
- **escenarios**: Contiene 5 subcarpetas, cada una correspondiente a una funcionalidad del sistema. Dentro de cada subcarpeta encontrarás:
  - 4 archivos `.feature` (escenarios de prueba).
  - Un archivo `step.js` con los pasos asociados a esa funcionalidad.
- **escenarios_base**: Contiene 5 subcarpetas, cada una correspondiente a una funcionalidad del sistema. Dentro de cada subcarpeta encontrarás:
  - 2 archivos `.feature` (escenarios de prueba). Excepto en crear_sitio que es la configuracion para la versión base y solo es la configuracion inicial.
  - Un archivo `step.js` con los pasos asociados a esa funcionalidad.
- **page_object**: Contiene la configuración para el patrón Page Object de las funcionalidades en las que fue aplicado.
- **support/step_definitions**: Contiene los archivos `step.js` que se ejecutan durante las pruebas.

### 5. Preparar el escenario de prueba

Para ejecutar un escenario de prueba manualmente, sigue estos pasos:

1. Elige el escenario que deseas probar.
2. Copia el contenido del archivo `.feature` correspondiente al escenario.
3. Pega ese contenido en el archivo `Example.feature`, ubicado en la carpeta `e2e`.
4. Copia el contenido del archivo `step.js` del escenario (dentro de su carpeta correspondiente) y pégalo en el archivo `step.js` dentro de `support/step_definitions`.

#### Ejecución de todos los escenarios

Si quieres ejecutar **todos los escenarios de prueba** disponibles para la versión 5.114.1 de Ghost:

- Ejecuta:  
  `npm run test:all`  
  o  
  `node cypressRunner.js`

Esto ejecutará automáticamente todos los escenarios en:  
`e2e/misw-4103-cypress/cypress/escenarios`

> ⚠️ **Importante:** Para esta ejecución, **la instancia de Ghost no debe estar configurada** (es decir, no debe haberse creado el sitio aún).


#### Escenarios para Ghost 4.5

Si deseas ejecutar los escenarios de prueba diseñados para Ghost 4.5:

- Asegúrate de tener una instancia de Ghost **versión 4.5** corriendo y **sin configurar**.
- Ejecuta:  
  `npm run test:base`  
  o  
  `node cypressRunner.js escenarios_base`

Esto ejecutará los escenarios en:  
`e2e/misw-4103-cypress/cypress/escenarios_base`


#### Opción alternativa: GitHub Action

Existe un **GitHub Action** que puedes usar para preparar y ejecutar automáticamente los escenarios de prueba y subir los resultados como artifact.

- Esta opción solo está disponible para los escenarios de la versión **5.114.1**.


### 6. Configurar las variables de entorno

Antes de ejecutar las pruebas, asegúrate de configurar las variables de entorno necesarias en el archivo `cypress.config.js`.

Debes reemplazar los siguientes valores con los datos que usarás durante las pruebas:

- **URL**: la dirección donde está corriendo Ghost (por ejemplo: http://localhost:3001/ghost/#)
- **EMAIL**: el correo electrónico del usuario administrador (por ejemplo: admin@gmail.com)
- **PASSWORD**: la contraseña del usuario (por ejemplo: 12345678910*)


#### Si usas GitHub Actions

Si decides ejecutar las pruebas a través del workflow en GitHub Actions:

- Se te pedirá ingresar el correo y la contraseña que deseas utilizar.
- Asegúrate de usar:
  - Un correo válido.
  - Una contraseña válida para Ghost (de al menos 10 caracteres).

**Recomendación:** Puedes usar las credenciales por defecto indicadas arriba para evitar problemas.


### 7. Ejecutar las pruebas

Una vez que hayas configurado las variables de entorno y preparado el escenario de prueba, puedes ejecutar las pruebas con los siguientes comandos:

- **Para ejecutar un escenario sin interfaz gráfica (modo headless):**  
  Usa el comando `npm run test`.

- **Para ejecutar un escenario con interfaz gráfica (modo interactivo):**  
  Usa el comando `npm run test:ui`.

- **Para ejecutar todos los escenarios sin interfaz gráfica:**  
  Usa el comando `npm run test:all`.


#### Ejecución con GitHub Actions

También puedes usar el workflow llamado **Run Cypress Test**.

- Asegúrate de **no cambiar la versión de Ghost** que aparece por defecto.
- Ingresa un **correo electrónico válido** y una **contraseña válida** (de al menos 10 caracteres) para que la ejecución funcione correctamente. Recomendamos usar las que se dejan por defecto.

### Estructura de Archivos

- _cypress/e2e/Example.feature: Escenario escrito en Gherkin.
- _cypress/support/step_definitions/step.js: Definición en JS que implementan los pasos.

###Configuración en _cypress.config.js_
```javascript
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

module.exports = defineConfig({
  projectId: "monkey-cypress.io.github.thesoftwaredesignlab",
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    reportFilename: `cypress-report-${timestamp}`,
    overwrite: false,
    json: true,
    charts: true, 
  },
  e2e: {
   // 1) Incluye todas las .feature
   specPattern: "cypress/e2e/**/*.feature",
   // 2) Haz async para await en el plugin de Cucumber
   async setupNodeEvents(on, config) {
     // a) Registro del plugin de Cucumber
     await addCucumberPreprocessorPlugin(on, config);
     // b) Registro de Esbuild con el plugin de Gherkin
     on(
       "file:preprocessor",
       createBundler({
         plugins: [createEsbuildPlugin(config)],
       })
     );
     return config;
   },
    baseUrl: "http://localhost:3001",
  },
  env: {
    URL: "http://localhost:3001/ghost/#",
    EMAIL: "admin@gmail.com",
    PASSWORD: "12345678910*",
  },
  pageLoadTimeout: 120000,
  screenshotsFolder: "cypress/results/screenshots",
  videosFolder: "cypress/results/videos",
  video: true,
  videoCompression: 32,
});
```



