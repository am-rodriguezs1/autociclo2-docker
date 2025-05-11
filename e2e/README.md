# Pruebas End to End (E2E)

Las pruebas End to End (E2E) son un tipo de prueba de software que valida el funcionamiento completo de una aplicación, desde el inicio hasta el final, asegurando que todos los componentes interactúan correctamente. Este tipo de pruebas simula el comportamiento real de los usuarios para garantizar que el sistema funcione como se espera en un entorno de producción.


## Frameworks Utilizados

En este proyecto, se utilizarán los siguientes frameworks para realizar las pruebas E2E:

- **Cypress**: es un framework moderno y fácil de usar para realizar pruebas E2E. Ofrece una interfaz intuitiva y herramientas integradas para depuración. Es ideal para pruebas en aplicaciones web modernas.
- **Playwright**: es un framework que permite realizar pruebas automatizadas en múltiples navegadores (Chromium, Firefox, WebKit). Es conocido por su capacidad de manejar escenarios complejos y su soporte para pruebas en dispositivos móviles.
- **Puppeteer**: es una biblioteca que proporciona una API de alto nivel para controlar navegadores basados en Chromium. Es útil para pruebas E2E y tareas de scraping.


## Configuración

El archivo `setup_frameworks.yml` es un flujo de trabajo de GitHub Actions diseñado para configurar automáticamente los frameworks necesarios para las pruebas E2E en un entorno de integración continua (CI).

Pasos para usarlo:

1. Diríjase al repositorio en GitHub.
2. Seleccione la pestaña _Actions_. Una vez la página haya cargado, encontrará un flujo llamado "Setup Frameworks Automatización", el cual debe seleccionar.
3. Abra el dropdown _Run Workflow_ (ver imagen), seleccione el framework que desea utilizar para el proyecto y oprima el botón para ejecutar el flujo
![Screenshot 2025-03-31 at 6 43 59 PM](https://github.com/user-attachments/assets/0a50a966-1b96-4ff3-94d8-89bb0a6992b2)
4. Una vez el flujo termine su ejecución, podrá ver los resultados en la lista. Del mismo modo, el repositorio deberá tener un nuevo commit con el módulo del framework seleccionado
![Screenshot 2025-03-31 at 7 43 25 PM](https://github.com/user-attachments/assets/a34a06c2-1fa0-43e1-847d-fbd86157eafb)

Este flujo descarga el módulo _base_ del framework que haya seleccionado en su repositorio, y actualiza el `package.json` para incluir scripts de ejecución. Una vez la ejecución haya finalizado, debe utilizar el comando `git pull` en su ambiente local para que los cambios se vean reflejados

> [!IMPORTANT]
> La configuración solamente descarga el módulo _base_ del framework, pero no instala las dependencias ni librerias de manera local. Una vez haya utilizado el comando `git pull` usted deberá hacer la instalación de dependencias.


### Requisitos Básicos

- Node.js (versión 20 o superior). Recomendamos utilizar la versión `lts/iron`
- npm o yarn para la gestión de dependencias

### Instalación de Dependencias

Antes de ejecutar las pruebas, deben instalar todas las dependencias necesarias. Para ello, dirígase al README de la raíz del repositorio y revise la sección "_Cómo Contribuir_".
