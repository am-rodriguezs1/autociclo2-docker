# Pruebas de Regresión Visual

Las pruebas de regresión visual son un tipo de prueba automatizada que se utiliza para detectar cambios no deseados en la apariencia de una aplicación. Estas pruebas comparan capturas de pantalla de la interfaz gráfica de usuario (GUI) tomadas en diferentes momentos, identificando discrepancias visuales que podrían haber sido introducidas por cambios en el código, actualizaciones de dependencias o modificaciones en el diseño.

El objetivo principal de estas pruebas es garantizar que los cambios realizados en el sistema no afecten negativamente la experiencia del usuario ni introduzcan errores visuales. Son especialmente útiles en proyectos con interfaces complejas o en aquellos que experimentan actualizaciones frecuentes. Estas pruebas son una herramienta clave para garantizar la calidad visual de las aplicaciones modernas, especialmente en entornos ágiles o de desarrollo continuo.


## Configuración

El archivo `setup_vrt.yml` es un flujo de trabajo de GitHub Actions diseñado para configurar automáticamente las herramientas necesarias para las pruebas de regresión visual.

Pasos para usarlo:

1. Diríjase al repositorio en GitHub.
2. Seleccione la pestaña _Actions_. Una vez la página haya cargado, encontrará un flujo llamado "Setup VRT", el cual debe seleccionar.
3. Abra el dropdown _Run Workflow_ (ver imagen), seleccione la herramienta que desea utilizar para el proyecto y oprima el botón para ejecutar el flujo
![Screenshot 2025-03-31 at 6 43 59 PM](https://github.com/user-attachments/assets/0a50a966-1b96-4ff3-94d8-89bb0a6992b2)
4. Una vez el flujo termine su ejecución, podrá ver los resultados en la lista. Del mismo modo, el repositorio deberá tener un nuevo commit con el módulo de la herramienta seleccionada
![Screenshot 2025-03-31 at 7 43 25 PM](https://github.com/user-attachments/assets/a34a06c2-1fa0-43e1-847d-fbd86157eafb)

Este flujo descarga el módulo _base_ de la herramienta que haya seleccionado en su repositorio, y actualiza el `package.json` para incluir scripts de ejecución. Una vez la ejecución haya finalizado, debe utilizar el comando `git pull` en su ambiente local para que los cambios se vean reflejados

> [!IMPORTANT]
> La configuración solamente descarga el módulo _base_ del framework, pero no instala las dependencias ni librerias de manera local. Una vez haya utilizado el comando `git pull` usted deberá hacer la instalación de dependencias.


### Requisitos Básicos

- Node.js (versión 20 o superior). Recomendamos utilizar la versión `lts/iron`
- npm o yarn para la gestión de dependencias

### Instalación de Dependencias

Antes de ejecutar las pruebas, deben instalar todas las dependencias necesarias. Para ello, dirígase al README de la raíz del repositorio y revise la sección "_Cómo Contribuir_".
