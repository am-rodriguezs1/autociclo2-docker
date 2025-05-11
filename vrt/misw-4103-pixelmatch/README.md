
# Proyecto Base: Pruebas Visual Regression Testing (VRT) con Pixelmatch

[PixelMatch](https://github.com/mapbox/pixelmatch/blob/main/README.md) es una biblioteca de JavaScript para la comparación de imágenes a nivel de píxel, especialmente diseñada para detectar diferencias entre imágenes, por ejemplo, en pruebas de regresión. Es rápida y eficiente, trabajando con arrays de datos de imágenes y no dependiente de otras bibliotecas. 

## Caracteristicas Principles:
*Comparación de imágenes:*
Permite comparar dos imágenes y determinar si hay diferencias entre ellas. 

*A nivel de píxel:*
Analiza cada píxel individualmente para detectar diferencias. 

*Para pruebas:*
Ideal para comparar imágenes en pruebas de regresión, donde se busca detectar cambios no deseados. 

*Rápida y eficiente:*
Diseñada para ser rápida y no depender de otras bibliotecas, lo que la hace adecuada para pruebas automatizadas. 

## Detalles adicionales:

*Funciones de comparación:*
Incluye funciones para comparar imágenes basadas en la percepción del color (métricas de color perceptual) y para detectar píxeles antialiased. 

*Uso en pruebas automatizadas:*
Es común encontrarla en pruebas de integración continua, donde se comparan capturas de pantalla para asegurar que no haya cambios inesperados. 

*Implementación:*
Es una biblioteca relativamente pequeña y simple, con una implementación en alrededor de 120 líneas de código. 

*Versatilidad:*
Puede ser utilizada tanto en entornos de navegador como en entornos Node.js. 

## Requisitos Básicos

- Node.js (versión 20 o superior). Recomendamos utilizar la versión `lts/iron`.
- npm o yarn para la gestión de dependencias.

## Instalación

Instala las dependencias necesarias utilizando npm:

```bash
npm install
```

## Ejecución de Pruebas

Para ejecutar las pruebas de Cypress en este proyecto, sigue los siguientes pasos:

### 1. Instalar los módulos necesarios
Primero, instala los módulos ejecutando desde la raiz del proyecto *202512-proyecto-equipo-6* el siguiente comando en la terminal:
```bash
npm ci --prefix ./vrt/misw-4103-pixelmatch
```

### 2. Navegar al directorio de Resemblejs
Una vez instalados los módulos, navegar al directorio `./vrt/misw-4103-pixelmatch`:

```bash
cd ./vrt/misw-4103-pixelmatch
```

### 3. Ejecución de las pruebas E2E con Kraken

Para ejecutar los escenarios de pruebas E2E en Kraken, sigue estos pasos cuidadosamente:

#### A. Pruebas en la versión candidata a release (`v5.114.1`)

1. Ve al archivo `README.md` ubicado en `./e2e/misw-4103-kraken`. Allí encontrarás instrucciones generales para la ejecución.
2. Asegúrate de que **Ghost esté ejecutándose en la versión 5.114.1**.
3. Los escenarios de prueba correspondientes a esta versión están en la carpeta:  
   `./e2e/misw-4103-kraken/escenarios`
4. Ejecuta el siguiente comando desde la raíz del proyecto:  
   `npm run test:all`
5. Al finalizar, se generará una carpeta con los screenshots en la ruta:  
   `./e2e/misw-4103-kraken/screenshots/v5.114.1`

#### B. Pruebas en la versión base (`v4.5`)

1. Cambia Ghost a la versión **4.5**.
2. Los escenarios de prueba para esta versión están en:  
   `./e2e/misw-4103-kraken/escenarios_base`
3. Ejecuta el siguiente comando:  
   `npm run test:base`
4. Al finalizar, se generará la carpeta con los screenshots en:  
   `./e2e/misw-4103-kraken/screenshots/v4.5`

> ⚠️ En total se ejecutan **10 escenarios de prueba** más **1 escenario de configuración** (crear sitio).

---

### 4. Ejecución de las pruebas de regresión visual

Una vez generadas las carpetas con screenshots para ambas versiones (`v4.5` y `v5.114.1`), puedes proceder con la comparación visual.

#### Opción A: Ejecutar localmente

1. Abre el archivo de configuración:  
   `./vrt.config.js`
2. Modifica las siguientes variables con rutas:
   - `"baseScreenshotsPath"` → ruta a la carpeta de screenshots de la versión **4.5**
   - `"rcScreenshotsPath"` → ruta a la carpeta de screenshots de la versión **5.114.1**
3. Guarda los cambios.
4. Ejecuta el siguiente comando para generar los reportes:  
   `npm run report`
5. Se creará la carpeta `./results`, que contiene:
   - **10 archivos `.html`**, uno por cada escenario de prueba.
   - Las diferencias visuales detectadas entre ambas versiones.

> ⚠️ Por defecto las rutas se encuentran configuradas a la carpeta screenshots de kraken. Si necesita modificar las rutas tenga cuidado con las rutas relativas.

#### Opción B: Ejecutar mediante GitHub Actions

1. En GitHub, ve a la sección **Actions** y selecciona el workflow:  
   `VRT Pixelmatch Ghost Comparison`
2. Configura los siguientes parámetros:
   - **Email**: debe ser válido.
   - **Contraseña**: debe tener más de 10 caracteres.
3. El workflow realizará automáticamente:
   - La ejecución de pruebas en ambas versiones.
   - La comparación visual.
   - La generación de un *artifact* descargable con:
     - Reportes `.html`
     - Carpeta de resultados lista para visualizar.
