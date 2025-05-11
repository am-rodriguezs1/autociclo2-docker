# Cypress Random Tester (Monkey)

Este repositorio contiene el código para un monkey aleatorio desarrollado utilizando [Cypress](https://www.cypress.io/), un ejecutor de pruebas End to End construido sobre JavaScript. Usamos esta tecnología debido a la facilidad para gestionar páginas web en una variedad de navegadores, incluyendo Chrome, Canary, Edge, Electron, etc., y su funcionalidad de grabar y reproducir. La idea del primer monkey es realizar una prueba completamente aleatoria en una aplicación web, inspirado en un monkey similar, el [Android Monkey](https://developer.android.com/studio/test/monkey). El segundo monkey existe debido a la alta tasa de errores y la baja probabilidad de obtener eventos que cambien el estado de la aplicación del monkey Monkey.

Este repositorio está basado en la implementación de [TheSoftwareDesignLab/monkey-cypress](https://github.com/TheSoftwareDesignLab/monkey-cypress).

## Requisitos

- Node.js (v20 o superior). Recomendamos usar lts/iron.
- npm o yarn para la gestión de dependencias.

## Cómo ejecutar
Para usar el monkey, debes seguir estos pasos:

- **Instalar los módulos requeridos**
     ```bash
    # Usando npm
    npm install --install-strategy=nested
    ```

Esto instalará las dependencias necesarias para ejecutar las pruebas.

- **Configurar los parámetros deseados**: La carpeta raíz del repositorio contiene los archivos de configuración de Cypress (`cypress.config.js`). El archivo `cypress.config.js` es donde se definen todos los parámetros de configuración, incluyendo las credenciales y otros valores necesarios. Aquí debes agregar los valores de las credenciales de login y los valores por defecto de las demás configuraciones:

    ```javascript

    const { defineConfig } = require("cypress");

    module.exports = defineConfig({
        // ...
        e2e: {
            // ...
            baseUrl: "http://localhost:3001/ghost/#",
        },
        env: {
            email: "tu-email@dominio.com", // Login credentials
            password: "tu-contraseña-segura", //Login credentials
            seed: 0xf1ae533d,   // Test seed intended to allow for consistent values in tests
            delay: 1000,        // Delay between action executions
            
            actions: {
                click: 0,       // Hovers and clicks (single, double, right) on a random position
                scroll: 0,      // srolls (horizontal and verticall)
                keypress: 0,    // alphanumeric and special keys
                viewport: 0,    // Change in viewports and orientation
                navigation: 0,  // reload, go back, go forward

                smartClick: 0,      // Hovers and clicks (single, double, right) on clickable elements
                smartCleanup: 0,    // Clears inputs, cookies and local storage
                smartInput: 0,      // Fills input tags with fake data (multi-character)
            },
        },
        // ...
    });

    ```
    **Configurar pruebas específicas:**<br>
    Existen 8 archivos de prueba, cada uno ejecutando un test sobre un path diferente. En cada uno de estos archivos, se debe usar la configuración definida en el archivo cypress.config.js. En las pruebas 3, 4, 6 y 8, se sobreescriben algunos valores de configuración como la semilla y los actions.

    ```javascript
    const testConfiguration = {
        seed: 0xf1ae533b,
        delay: Cypress.env('delay'),
        email: Cypress.env('email'),
        password: Cypress.env('password'),
        actions: {
        click: 0,
        scroll: 0,
        keypress: 0,
        viewport: 0,
        navigation: 0,

        smartClick: 0,
        smartCleanup: 0,
        smartInput: 0,
        },
    }
    ```

- **Ejecutar el monkey**: Los comandos para ejecutar las pruebas deben ejecutarse desde la carpeta raíz.

    ```bash
    npm run monkey:ui
    # Ejecución en modo headless
    npm run monkey:test
    ```
    Nota: El navegador predeterminado es Electron 78 en modo headless. Para probar con otro navegador, agrega la opción `--browser <nombre-o-ruta-del-navegador>` al comando de ejecución, indicando cuál de los [navegadores soportados](https://docs.cypress.io/guides/guides/launching-browsers.html#Browsers) deseas usar.


## Configuración

Después de evaluar una serie de posibles eventos, definimos las siguientes 5 categorías básicas en las que los eventos podrían agruparse:

- **Eventos de Clic Aleatorio**: Clic izquierdo, derecho o doble clic, así como desplazamientos (_mouseover_) realizados a un elemento desde una posición aleatoria.
- **Eventos de Desplazamiento**: Desplazar la página hacia arriba, abajo, a la izquierda o a la derecha.
- **Eventos de Teclado**: Introducir un carácter (alfanumérico) o un carácter especial (`Enter`, `Supr`, `Esc`, `Backspace`, `Flechas`) con modificadores (`Shift`, `Alt` o `Ctrl`) dentro de un elemento enfocado. Es equivalente a presionar una tecla del teclado al enfocar un elemento.
- **Eventos de Navegación de Página**: Navegación típica que un usuario podría realizar, como ir a la página anterior o a la siguiente en la pila de navegación.
- **Eventos del Navegador**: Eventos que cambian la configuración del navegador, como cambiar el tamaño de la ventana.

Adicionalmente, hay 3 categorías _más inteligentes_ que pueden incluirse en las ejecuciones:

- **Eventos de Clic Aleatorio Inteligente**: Clic izquierdo, derecho o doble clic, así como desplazamientos (_mouseover_) realizados a un elemento _clickeable_ (`<a>`, `<button>`, `<input>`).
- **Eventos de Limpieza Inteligente**: Eventos que limpian la configuración del navegador (cookies, almacenamiento local) o limpian un campo `<input>`.
- **Entrada Inteligente**: Introduce diferentes tipos de valores (frases, correos electrónicos, contraseñas, fechas, números) en un campo `<input>` dependiendo de su tipo.

## Cambios realizados

- En el archivo `page.js` de `cypress\support\commands`, se modificó la función `clearInput` para reemplazar `cy.get('input')` por `cy.document().then(doc => doc.body.querySelectorAll('input'))`. Esto se hizo para evitar que las pruebas fallaran cuando no se encontraban elementos de tipo `input` en el DOM, permitiendo una ejecución más robusta sin interrupciones. Además, se añadió un filtro para seleccionar solo los inputs visibles, utilizando `!Cypress.dom.isHidden(candidate)`, lo cual mejora la estabilidad de las pruebas al evitar la interacción con elementos invisibles. <br> En el mismo archivo, se modificó el comando `Cypress.Commands.add("rCleanup")` para eliminar la limpieza de cookies, ya que esta acción provocaba un cierre de sesión y causaba errores de autenticación en las pruebas.
- En el archivo `keyboard.js` dentro de `cypress\support\commands`, se implementaron los mismos cambios que en `page.js` en el comando `Cypress.Commands.add("rInput")`, para garantizar una ejecución más estable al interactuar con inputs.
- En `mouse.js` de `cypress\support\commands`, se añadieron validaciones para evitar la interacción con enlaces `mailto:` que causaban que el navegador perdiera control durante la ejecución de las pruebas. Además, se implementaron validaciones para evitar clics en elementos `<select>`, ya que no son bien soportados por Cypress. También se introdujeron las funciones `wrapAndAct` y `wrapAndTrigger` para manejar casos en los que se reciben múltiples elementos, asegurando que las acciones se apliquen únicamente al primer elemento encontrado.
- Para mejorar la reutilización del código y facilitar la ejecución de pruebas en diferentes rutas de la aplicación, se crearon nuevos archivos que apuntan a estas rutas y se extrajeron funciones base al archivo `monkey.js` en `cypress\utils`. Este archivo es responsable de la configuración de listeners, la ejecución de login y la configuración de los monkeys. Además, se implementó un evento para redirigir al monkey a la funcionalidad específica que se desea probar en caso de que se desvíe de la ruta asignada.

## Reportes

El monkey está configurado para usar [Mochawesome](https://www.npmjs.com/package/cypress-mochawesome-reporter) como herramienta de reporte. Por defecto, el reporte contendrá la secuencia de eventos intentados que se ejecutaron y un video de la ejecución.

> [!NOTE]
> - El reporte solo se genera para ejecuciones en modo headless.
> - Para ejecuciones largas, el video puede deshabilitarse en la configuración de Cypress (`video: false`), o la compresión puede modificarse para reducir el tamaño del archivo (`videoCompression`).
