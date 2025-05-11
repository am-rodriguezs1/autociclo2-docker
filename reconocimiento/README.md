# Pruebas de Reconocimiento

Las pruebas de reconocimiento son un tipo de prueba de naturaleza exploratoria que buscan identificar defectos en una aplicación sin seguir un conjunto predefinido de casos de prueba. Estas pruebas se enfocan en evaluar el comportamiento general del sistema y su capacidad para manejar escenarios inesperados.


### Tipos de Pruebas de Reconocimiento

- **Monkey Testing**: Este enfoque implica realizar interacciones aleatorias con la aplicación, como si un "mono" estuviera usándola. El objetivo es descubrir errores impredecibles o fallos que no se detectan con pruebas estructuradas. Es útil para evaluar la estabilidad y robustez del sistema.

- **GUI Ripping**: Este método se centra en analizar automáticamente la interfaz gráfica de usuario (GUI) de la aplicación. Se exploran las ventanas, menús y elementos interactivos para generar un modelo del sistema y detectar posibles problemas en la navegación o en la interacción con los componentes de la interfaz.

Ambos enfoques son complementarios y ayudan a garantizar que la aplicación sea resistente y funcional en escenarios reales y no planificados.


## Configuración

El archivo `setup_reconocimiento.yml` es un flujo de trabajo de GitHub Actions diseñado para configurar automáticamente las herramientas necesarias para las pruebas de reconocimiento.

Pasos para usarlo:

1. Diríjase al repositorio en GitHub.
2. Seleccione la pestaña _Actions_. Una vez la página haya cargado, encontrará un flujo llamado "Setup Herramientas Reconocimiento", el cual debe seleccionar.
3. Abra el dropdown _Run Workflow_ (ver imagen) y oprima el botón para ejecutar el flujo
![Screenshot 2025-03-31 at 6 43 59 PM](https://github.com/user-attachments/assets/0a50a966-1b96-4ff3-94d8-89bb0a6992b2)
4. Una vez el flujo termine su ejecución, podrá ver los resultados en la lista. Del mismo modo, el repositorio deberá tener un nuevo commit con el módulo de las herramientas.
![Screenshot 2025-03-31 at 7 43 25 PM](https://github.com/user-attachments/assets/a34a06c2-1fa0-43e1-847d-fbd86157eafb)

Este flujo descarga el módulo _base_ de la herramienta que haya seleccionado en su repositorio, y actualiza el `package.json` para incluir scripts de ejecución. Una vez la ejecución haya finalizado, debe utilizar el comando `git pull` en su ambiente local para que los cambios se vean reflejados

> [!IMPORTANT]
> La configuración solamente descarga el módulo _base_ de la herramienta, pero no instala las dependencias ni librerias de manera local. Una vez haya utilizado el comando `git pull` usted deberá hacer la instalación de dependencias.


### Requisitos Básicos

- Node.js (versión 20 o superior). Recomendamos utilizar la versión `lts/iron`
- npm o yarn para la gestión de dependencias

### Instalación de Dependencias

Antes de ejecutar las pruebas, deben instalar todas las dependencias necesarias. Para ello, dirígase al README de la raíz del repositorio y revise la sección "_Cómo Contribuir_".
