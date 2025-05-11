

# Proyecto Base: Pruebas Visual Regression Testing (VRT) con ResembleJS

[ResembleJS](https://github.com/rsmbl/Resemble.js/blob/master/README.md) es una biblioteca de código abierto para comparación visual de imágenes. Es usada en procesos de prueba de regresión visual automatizada, donde se desea detectar diferencias entre dos capturas de pantalla o imágenes.

## Caracteristicas Principles:
1. *Comparación visual a nivel de píxel*
Detecta cambios precisos entre dos imágenes, resaltando diferencias por color, brillo, transparencia o desplazamientos.
2. *Imagen de diferencia (diff)*
Genera automáticamente una imagen que resalta las diferencias encontradas.
3. *Métricas cuantitativas*
Devuelve un porcentaje de diferencia (misMatchPercentage), útil para automatizar decisiones.
4. *Opciones de comparación avanzadas*
	- Ignorar antialiasing (suavizado).
	- Ignorar diferencias de color.
	- Ignorar canal alfa (transparencia).
	- Escalar imágenes para ajustarlas si tienen diferentes tamaños.
5. *Soporte para múltiples entornos*
	- Puede usarse en el navegador o en Node.js.


## Detalles adicionales:

1. *Región personalizada:* 
Se pueden comparar solo partes específicas de las imágenes usando coordenadas.
2. *Output configurable:* Personalización del color de las diferencias, transparencia del dif, o formato de imagen resultante.
3. *Integración con herramientas de testing:* 
Muy utilizado junto con frameworks como Playwright, Puppeteer o Cypress para verificar visualmente cambios en interfaces.


## Requisitos Básicos

- Node.js (versión 20 o superior). Recomendamos utilizar la versión `lts/iron`.
- npm o yarn para la gestión de dependencias.


## Ejecución de Pruebas

Para ejecutar las pruebas de Cypress en este proyecto, sigue los siguientes pasos:

### 1. Instalar los módulos necesarios
Primero, instala los módulos ejecutando desde la raiz del proyecto *202512-proyecto-equipo-6* el siguiente comando en la terminal:
```bash
npm ci --prefix ./vrt/misw-4103-resemblejs
```

### 2. Navegar al directorio de Resemblejs
Una vez instalados los módulos, navegar al directorio `./vrt/misw-4103-resemblejs`:

```bash
cd ./vrt/misw-4103-resemblejs
```

### 3. Ejecución de las pruebas E2E con Cypress

Para ejecutar los escenarios de pruebas E2E en Cypress, sigue estos pasos cuidadosamente:

#### A. Pruebas en la versión candidata a release (`v5.114.1`)

1. Ve al archivo `README.md` ubicado en `./e2e/misw-4103-cypress`. Allí encontrarás instrucciones generales para la ejecución.
2. Asegúrate de que **Ghost esté ejecutándose en la versión 5.114.1**.
3. Los escenarios de prueba correspondientes a esta versión están en la carpeta:  
   `./e2e/misw-4103-cypress/cypress/escenarios`
4. Ejecuta el siguiente comando desde la raíz del proyecto:  
   `npm run test:all`
5. Al finalizar, se generará una carpeta con los screenshots en la ruta:  
   `./e2e/misw-4103-cypress/cypress/screenshots/v5.114.1`

#### B. Pruebas en la versión base (`v4.5`)

1. Cambia Ghost a la versión **4.5**.
2. Los escenarios de prueba para esta versión están en:  
   `./e2e/misw-4103-cypress/cypress/escenarios_base`
3. Ejecuta el siguiente comando:  
   `npm run test:base`
4. Al finalizar, se generará la carpeta con los screenshots en:  
   `./e2e/misw-4103-cypress/cypress/screenshots/v4.5`

> ⚠️ En total se ejecutan **10 escenarios de prueba** más **1 escenario de configuración** (crear sitio).

---

### 4. Ejecución de las pruebas de regresión visual

Una vez generadas las carpetas con screenshots para ambas versiones (`v4.5` y `v5.114.1`), puedes proceder con la comparación visual.

#### Opción A: Ejecutar localmente

1. Abre el archivo de configuración:  
   `./vrt.config.json`
2. Modifica las siguientes variables con rutas:
   - `"baseScreenshotsPath"` → ruta a la carpeta de screenshots de la versión **4.5**
   - `"rcScreenshotsPath"` → ruta a la carpeta de screenshots de la versión **5.114.1**
3. Guarda los cambios.
4. Ejecuta el siguiente comando para generar los reportes:  
   `npm run report`
5. Se creará la carpeta `./results`, que contiene:
   - **10 archivos `.html`**, uno por cada escenario de prueba.
   - Las diferencias visuales detectadas entre ambas versiones.

> ⚠️ Por defecto las rutas se encuentran configuradas a la carpeta screenshots de cypress. Si necesita modificar las rutas tenga cuidado con las rutas relativas.

#### Opción B: Ejecutar mediante GitHub Actions

1. En GitHub, ve a la sección **Actions** y selecciona el workflow:  
   `VRT Resemblejs Ghost Comparison`
2. Configura los siguientes parámetros:
   - **Email**: debe ser válido.
   - **Contraseña**: debe tener más de 10 caracteres.
3. El workflow realizará automáticamente:
   - La ejecución de pruebas en ambas versiones.
   - La comparación visual.
   - La generación de un *artifact* descargable con:
     - Reportes `.html`
     - Carpeta de resultados lista para visualizar.


## Configuracion resemblejs

```json
"options":{
        "output": {
            "errorColor": {
                "red": 255,
                "green": 0,
                "blue": 255
            },
            "errorType": "movement",
            "largeImageThreshold": 1200,
            "useCrossOrigin": false,
            "outputDiff": true
        },
        "scaleToSameSize": true,
        "ignore": "antialiasing"
    }
```
