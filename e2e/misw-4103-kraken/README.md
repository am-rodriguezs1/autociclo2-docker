# Proyecto Base: Pruebas End to End con Kraken

## ¿Qué es Kraken-Node?

Kraken es un framework moderno y fácil de usar para realizar pruebas E2E (End-to-End). Ofrece una interfaz intuitiva y herramientas integradas para depuración, lo que lo hace ideal para pruebas en aplicaciones web modernas. Este repositorio cuenta con la configuración base de Kraken para la automatización de pruebas E2E.

[Kraken-Node](https://www.npmjs.com/package/kraken-node) es una herramienta diseñada para facilitar la creación y ejecución de pruebas E2E. Utiliza una arquitectura basada en escenarios definidos en Gherkin y ejecutados con Cucumber.js. Esto permite a los equipos de desarrollo y pruebas trabajar de manera colaborativa en la definición de casos de prueba.

### Características principales:

- **Soporte para múltiples navegadores**: Ejecuta pruebas en Chrome, Firefox, y más.
- **Modo headless**: Ideal para integraciones en pipelines de CI/CD.
- **Integración con Gherkin**: Define escenarios de prueba en un lenguaje legible por humanos.
- **Depuración sencilla**: Herramientas integradas para identificar y resolver problemas rápidamente.

## Requisitos Básicos

- **Node.js** (versión 20 o superior). Recomendamos utilizar la versión `lts/iron`.
- **npm** o **yarn** para la gestión de dependencias.
- Para el correcto funcionamiento de Kraken, también debe tener instalados los siguientes programas:
  - Java
  - Android SDK
  - Android ADB
  - Appium



## Ejecución de Pruebas

Para ejecutar las pruebas de kraken en este proyecto, sigue los siguientes pasos:

### 1. Instalar los módulos necesarios
Primero, instala los módulos ejecutando los siguientes comandos en la terminal desde la raíz del repositorio `./202512-proyecto-equipo-6:`

```bash
npm install kraken-node -g
npm ci --prefix ./e2e/misw-4103-kraken
```

Alternativamente, puedes entrar primero al directorio `./e2e/misw-4103-kraken` y luego ejecutar:
```bash
npm ci --prefix ./
```

Segundo, verificar que los requisitos adicionales estén correctamente instalados ejecutando el comando kraken-node doctor. El resultado esperado debería ser similar al siguiente:

```
Checking dependencies...
Android SDK [Installed] (Required only for mobile testing - ANDROID_HOME)
Android ADB [Installed] (Required only for mobile testing - ANDROID_HOME/tools and ANDROID_HOME/platform-tools)
"aapt" no se reconoce como un comando interno o externo,
programa o archivo por lotes ejecutable.
Android AAPT [Not installed] (Required only for Kraken's info command - ANDROID_HOME/build-tools/:version)
Appium [Installed] (Required only for mobile testing)
Java [Installed] (JAVA_HOME)
Done.
```

Para mayor información de como resolver problemas por la libreria kraken dirigaje al respositorio oficial: [Krake](https://github.com/TheSoftwareDesignLab/Kraken)


### 2. Navegar al directorio de Kraken
Una vez instalados los módulos, navega al directorio `./e2e/misw-4103-kraken`:

```bash
cd ./e2e/misw-4103-kraken
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
La estructura de la carpeta `misw-4103-kraken` es la siguiente:

```
┣---- 📂 e2e
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
┣---- 📂 features
┃ ┣---- 📂 mobile
┃ ┣---- 📂 web
┃ ┃ ┣---- 📂 page_object
┃ ┃ ┃ ┣---- 📜 NewMemberPage.js
┃ ┃ ┃ ┣---- 📜 SignInPage.js
┃ ┃ ┣---- 📂 step_definition
┃ ┃ ┃ ┣---- 📜 steps.js
┃ ┃ ┣---- 📂 support
┃ ┣---- 📜 Example.feature
┃
```


- **Example.feature**: Este archivo corresponde al *feature* que se ejecutará. Su contenido debe ser reemplazado antes de ejecutar cada prueba.
- **escenarios**: Contiene 5 subcarpetas, cada una correspondiente a una funcionalidad del sistema. Dentro de cada subcarpeta encontrarás:
  - 4 archivos `.feature` (escenarios de prueba).
  - Un archivo `step.js` con los pasos asociados a esa funcionalidad.
- **escenarios_base**: Contiene 5 subcarpetas, cada una correspondiente a una funcionalidad del sistema. Dentro de cada subcarpeta encontrarás:
  - 2 archivos `.feature` (escenarios de prueba). Excepto en crear_sitio que es la configuracion para la versión base y solo es la configuracion inicial.
  - Un archivo `step.js` con los pasos asociados a esa funcionalidad.
- **page_object**: Contiene la configuración para el patrón Page Object de las funcionalidades en las que fue aplicado.
- **features/web/step_definition**: Contiene el archivo `step.js` que se ejecuta durante las pruebas.

### 5. Preparar el escenario de prueba
Para ejecutar un escenario de prueba, sigue estos pasos:

1. Escoge el escenario que deseas probar.
2. Copia el contenido del archivo `.feature` correspondiente al escenario.
3. Pega el contenido copiado en el archivo `Example.feature` ubicado en la carpeta `features`.
4. Copia el contenido del archivo `step.js` correspondiente al escenario (en la carpeta de la funcionalidad seleccionada) y pégalo en el archivo `step.js` dentro de la carpeta `features/web/step_definition`.

#### Ejecución de todos los escenarios

Si quieres ejecutar **todos los escenarios de prueba** disponibles para la versión 5.114.1 de Ghost:

- Ejecuta:  
  `npm run test:all`  
  o  
  `node krakenRunner.js`

Esto ejecutará automáticamente todos los escenarios en:  
`e2e/misw-4103-kraken/escenarios`

> ⚠️ **Importante:** Para esta ejecución, **la instancia de Ghost no debe estar configurada** (es decir, no debe haberse creado el sitio aún).


#### Escenarios para Ghost 4.5

Si deseas ejecutar los escenarios de prueba diseñados para Ghost 4.5:

- Asegúrate de tener una instancia de Ghost **versión 4.5** corriendo y **sin configurar**.
- Ejecuta:  
  `npm run test:base`  
  o  
  `node krakenRunner.js escenarios_base`

Esto ejecutará los escenarios en:  
`e2e/misw-4103-kraken/escenarios_base`


#### Opción alternativa: GitHub Action

Existe un **GitHub Action** que puedes usar para preparar y ejecutar automáticamente los escenarios de prueba y subir los resultados como artifact.

- Esta opción solo está disponible para los escenarios de la versión **5.114.1**.


### 6. Configurar las variables de entorno
Antes de ejecutar las pruebas, asegúrate de configurar las variables de entorno necesarias en el archivo `properties.json`.

Debes reemplazar los siguientes valores con los datos que usarás durante las pruebas:

- **URL**: la dirección donde está corriendo Ghost (por ejemplo: http://localhost:3001/ghost/#)
- **EMAIL**: el correo electrónico del usuario administrador (por ejemplo: admin@gmail.com)
- **PASSWORD**: la contraseña del usuario (por ejemplo: 12345678910*)
- **SITE_TITLE**: el nombre del sitio que se va a crear (por ejemplo: Mi sitio de prueba)
- **FULL_NAME**: el nombre del usuario (por ejemplo: Example Name)

#### Si usas GitHub Actions

Si decides ejecutar las pruebas a través del workflow en GitHub Actions:

- Se te pedirá ingresar el correo y la contraseña que deseas utilizar.
- Asegúrate de usar:
  - Un correo válido.
  - Una contraseña válida para Ghost (de al menos 10 caracteres).

**Recomendación:** Puedes usar las credenciales por defecto indicadas arriba para evitar problemas.

### 7. Ejecutar las pruebas
Una vez que hayas configurado las variables de entorno y preparado el escenario de prueba, puedes ejecutar las pruebas con los siguientes comandos:

- **Para ejecutar un escenario con interfaz gráfica:**  
  Usa el comando `npm run test`.

- **Para ejecutar todos los escenarios con interfaz gráfica:**  
  Usa el comando `npm run test:all`.

#### Ejecución con GitHub Actions

También puedes usar el workflow llamado **Run Kraken Test**.

- Asegúrate de **no cambiar la versión de Ghost** que aparece por defecto.
- Ingresa un **correo electrónico válido** y una **contraseña válida** (de al menos 10 caracteres) para que la ejecución funcione correctamente. Recomendamos usar las que se dejan por defecto.

**Consideraciones Adicionales**

Al momento de ejecutar las pruebas con Kraken, pueden surgir varios problemas relacionados con las dependencias internas de la librería, como Appium y Cucumber. Para garantizar que ambas sean accesibles en su entorno de ejecución, siga las siguientes recomendaciones.

1. Conflictos de Dependencias Locales y Globales

Es posible que se encuentre con un error relacionado con conflictos internos en el manejo de librerías a nivel local y global por parte de npm. Un posible mensaje de error podría ser el siguiente:

```
Error: 
      You appear to be executing an install of cucumber (most likely a global install)
      that is different from your local install (the one required in your support files).
      For cucumber to work, you need to execute the same install that is required in your support files.
      Please execute the locally installed version to run your tests.
```

Este problema se puede solucionar instalando localmente la herramienta `kraken-node` en el directorio  `./e2e/misw-4103-kraken`. Para hacerlo, ejecute el siguiente comando:

```bash
npm install kraken-node
```

Una vez instalada, deberá ejecutar los comandos de `kraken-node` indicando la ruta relativa de la librería instalada en el directorio node_modules. Para ejecutar la prueba, el comando debe ser:

```bash
node ./node_modules/kraken-node/bin/kraken-node run
```

De este modo, se asegura que la librería tenga acceso local a sus dependencias de Cucumber.

2. Error de Reconocimiento del Comando appium

Otro posible error es que el comando appium no sea reconocido por el sistema operativo, lo que impide que Kraken lo utilice. Si esto sucede, instale Appium globalmente con el siguiente comando:

```bash
npm install -g appium
```


## Configuración

El archivo `package.json` incluye la configuración básica para ejecutar pruebas con Kraken. A continuación, se detalla su contenido relevante:

```json
"scripts": {
    "test": "npx kraken-node run"
},
"dependencies": {
    "@faker-js/faker": "^9.6.0",
    "chai": "^5.2.0",
    "kraken-node": "^1.0.24"
}
```

Además, el archivo `properties.json` contiene las credenciales necesarias para las pruebas automatizadas. Este archivo debe ser configurado con los valores adecuados para tu entorno:

```json
{
  "URL": "http://localhost:2368/ghost/#",
  "EMAIL": "example@email.com",
  "PASSWORD": "examplePassword",
  "SITE_TITLE": "Example Test site E2E",
  "FULL_NAME": "Example Name"
}
```
