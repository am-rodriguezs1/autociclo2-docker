![pruebas_automatizadas](https://github.com/user-attachments/assets/10279226-bb1b-41cb-8c73-eade9f49a3dc)

# MISW-4103 Proyecto
Este repositorio ha sido creado como parte del curso _Pruebas Automatizadas de Software_ de la Maestría en Ingeniería de Software (MISO). Su objetivo principal es proporcionar un entorno práctico para que los estudiantes desarrollen competencias avanzadas en la automatización de pruebas, utilizando la aplicación GHOST como caso de estudio. A través de este proyecto, se busca que los estudiantes adquieran habilidades para diseñar, ejecutar y mantener pruebas automatizadas de alta calidad, contribuyendo al éxito de proyectos de software en entornos profesionales.

Durante las próximas semanas, los estudiantes realizarán actividades semanales diseñadas para aplicar conceptos teóricos, implementar estrategias de pruebas automatizadas y enfrentar desafíos reales. Estas actividades están orientadas a fortalecer su perfil profesional como ingenieros especializados en pruebas automatizadas.

## Estructura del Repositorio

Este repositorio está diseñado para guiar a los estudiantes en el desarrollo de habilidades prácticas en pruebas automatizadas, fomentando el aprendizaje colaborativo y la aplicación de buenas prácticas en entornos profesionales.

El repositorio cuenta con una estructura inicial mínima para el desarrollo del proyecto. A medida que avance el curso, el _Equipo Docente_ proporcionará instrucciones sobre los cambios y configuraciones necesarias para completar las actividades semanales. Al recibir el repositorio, encontrarán la siguiente estructura de archivos:

```
📦 root
 ┣---- 📂 .github
 ┣---- 📂 actividades
 ┃     ┣---- 📂 actividad-semana-X
 ┃     ┃     ┣---- 📜 README.md
 ┃     ┃     ┗---- 📜 RETRO.md
 ┃     ┗---- 📂 ...
 ┃
 ┣---- 📂 e2e
 ┃     ┣---- 📜 README.md
 ┃     ┗---- 📂 ...
 ┃
 ┣---- 📂 vrt
 ┃     ┣---- 📜 README.md
 ┃     ┗---- 📂 ...
 ┃
 ┣---- 📜 EQUIPO.md
 ┣---- 📜 README.md
 ┣---- 📜 package.json
 ┣---- 📜 package-lock.json
 ┗---- 📜 .gitignore
```

### Detalles de los Archivos y Directorios

- **`EQUIPO.md`**: Este archivo debe ser completado por el equipo de trabajo. Como mínimo, deben incluir los nombres y correos electrónicos de los integrantes. Además, se recomienda que el equipo redacte un "contrato" o acuerdos para el desarrollo de las actividades del proyecto.

- **`actividades/`**: Este directorio contiene los _templates_ de los informes del proyecto (`README.md` y `RETRO.md`). Los equipos deben utilizar este espacio para documentar las actividades semanales.
    - Los informes deben ser autocontenidos, ya que serán evaluados por el _Equipo Docente_.
    - Si se incluyen archivos multimedia, se recomienda utilizar gestores de contenido (_Google Drive, YouTube, etc._) y agregar los enlaces correspondientes, asegurándose de que evidencien la última fecha de edición.

- **`e2e/`, `reconocimiento/` y `vrt/`**: Estos directorios contienen la configuración base de los frameworks y herramientas necesarias para las actividades del proyecto.
    - Inicialmente, solo incluyen archivos `README` con instrucciones para configurar las herramientas de automatización de pruebas. Cada semana se les indicarán las actividades y acciones para configurar los frameworks y herramientoas

- **Archivos y directorios restringidos**: Los siguientes elementos contienen configuraciones esenciales para el proyecto. **NO** deben ser modificados por los estudiantes, cualquier modificación en ellos resultará en penalizaciones en las entregas semanales:
    - `📂 .github/`
    - `📜 package.json` (en la raíz del repositorio)
    - `📜 package-lock.json` (en la raíz del repositorio)
    - `📜 README.md` (en la raíz del repositorio)


## Cómo Contribuir

### Workspaces

El repositorio utiliza [_npm Workspaces_](https://docs.npmjs.com/cli/v7/using-npm/workspaces) para el manejo granular de dependencias para cada herramienta y framework de automatización; En el `package.json` (principal) que se encuentra en la raíz se pueden observar los directorios que conforman los _Workspaces_ del repositorio

```json
// ./package.json
{
	...
	"workspaces": ["e2e/*", "reconocimiento/*", "vrt/*"]
	...
}
```

Esto facilita el manejo de dependencias entre módulos (**`e2e/`, `reconocimiento/` y `vrt/`**), al igual que su conexión. Por ejemplo, una vez se haya configurado el framework de automatización *Kraken* dentro del directorio **`e2e/misw4103-kraken`**, este tendrá un `package.json` propio.

```json
// .e2e/misw4103-kraken/package.json
{
	"name": "misw4103-kraken",
	...
	"scripts": {
		"test": "npx kraken-node run"
	}
}
```

Para gestionar este módulo (instalar dependencias, ejecutar scripts, etc.), se pueden utilizar los siguientes comandos desde la raiz del repositorio.

```bash

npm install 					# instalación de dependencias globales
npm install -w misw4103-kraken	# instalación de dependencias para un workspace particular

npm run test --workspace=misw4103-kraken	# ejecución de scripts de un workspace particular
```
