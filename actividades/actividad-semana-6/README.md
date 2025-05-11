# Informe de Actividad - Semana 6

> [!CAUTION]
> **Importante:** Recuerden que las entregas deben ser autocontenidas, es decir, solamente se calificará el contenido que se incluido en el repositorio del equipo. En caso de tener archivos multimedia, utilicen un gestor de contenidos (_Google Drive, YouTube, etc._) donde se evidencie la última fecha de edición y agreguen los enlaces al informe.

## Participantes

| Nombre Completo                | Correo Electrónico           |
|--------------------------------|------------------------------|
|Alex Mauricio Rodriguez Sánchez |am.rodriguezs1@uniandes.edu.co|
|Juan Camilo Acevedo Ospina      |jc.acevedoo1@uniandes.edu.co  |
|María Camila Cubides Martín     |mc.cubides@uniandes.edu.co    |
|Martín Ricardo Romero Otriz     |mr.romero@uniandes.edu.co     |


## Enlaces y Referencias
- Estrategia de Pruebas: [estrategia]()
- Repositorio de Incidencias: [automatizacion-issues](https://github.com/automatizacionciclo2/automatizacion-issues/issues)
- Resultados con Kraken y Pixelmatch: [resultados pdf](https://uniandes-my.sharepoint.com/:f:/g/personal/mc_cubides_uniandes_edu_co/Et2Gy_5PcmdAmO2GwFBYY74Bc5fvbyqiHlUUdAQSKfM2Lw?e=yPL6fA)
- Resultados con Cypress y Resemblejs: [resultados pdf](https://uniandes-my.sharepoint.com/:f:/g/personal/mc_cubides_uniandes_edu_co/EgW2DSpmBfxMilIugbTZz9ABlTpjMl03oJpsQ9Kh9IO84w)
- Video resumen: [video]()


## Informe Actividades

Durante esta semana, se realizó una actividad de planificación el día lunes en la que se definieron las funcionalidades principales del sistema que serían sometidas a pruebas de regresión. A partir de esta definición, se establecieron un total de 10 escenarios de prueba, y se asignó a cada miembro del equipo la responsabilidad de una funcionalidad específica. Se determinó que la funcionalidad de "crear sitio" solo se utilizaría para la configuración y no formaría parte de las pruebas de regresión.

En cuanto a la parte técnica, se añadió la lógica para la toma de capturas de pantalla tanto en Kraken como en Cypress. Posteriormente, cada integrante del equipo modificó los escenarios de prueba correspondientes de la semana 5 para incluir las capturas de pantalla. En total, se modificaron 40 escenarios. Además, se configuraron las herramientas necesarias para las pruebas de regresión visual, seleccionando como herramientas ResembleJS y Pixelmatch. En base a la retroalimentación recibida durante la semana 5, se decidió automatizar los scripts de prueba para facilitar la ejecución de las pruebas a través de GitHub Actions.

Durante la semana, también se realizaron dos sesiones colaborativas, el miércoles y el viernes, con el fin de revisar el avance individual de cada miembro del equipo, discutir hallazgos relevantes y consensuar la estructura del repositorio y la organización a seguir para incorporar los escenarios de prueba al repositorio del proyecto.

**Desafíos Encontrados y Logros Realizados**

Un desafío importante fue la automatización de las pruebas con GitHub Actions, lo que permitió facilitar la preparación del entorno. Recibimos retroalimentación indicando que no se había logrado configurar adecuadamente el ambiente para ejecutar las pruebas, por lo que se trabajó en automatizar todo el proceso a través de GitHub Actions. Esto permitió configurar automáticamente Ghost, ejecutar las pruebas y realizar las pruebas de regresión visual, generando los resultados en reportes HTML.

Otro desafío surgió debido a los cambios en la funcionalidad de "crear sitio" entre la versión 4.5 de Ghost y la versión 5.114.1. En la versión 4.5, había muchos más pasos para configurar el sitio, lo que nos obligó a escribir un escenario diferente para poder crear el sitio en esa versión, lo que requirió tiempo y esfuerzo adicional.

Un logro importante fue que, finalmente, logramos ejecutar con éxito las pruebas de regresión visual y generar los reportes solicitados tanto en Pixelmatch como en ResembleJS, lo que nos permitió obtener resultados detallados y comparaciones visuales entre las versiones de la aplicación.


### Listado de Funcionalidades

| ID      | Nombre             | Descripción |
|---------|--------------------|-------------|
| FUN001  | Crear Publicación  | Permite a los usuarios redactar y publicar contenido en su blog o sitio web. Incluye un editor intuitivo basado en bloques, compatible con Markdown, que facilita la creación de publicaciones con texto, imágenes, videos y más. También ofrece opciones de SEO para optimizar la visibilidad de las publicaciones. |
| FUN002  | Crear Etiqueta     | Permite organizar el contenido mediante etiquetas, facilitando la navegación y la búsqueda para los visitantes. Las etiquetas también ayudan a categorizar publicaciones y páginas para mejorar la experiencia del usuario. |
| FUN003  | Crear Miembro      | Facilita la gestión de membresías, permitiendo a los usuarios registrar miembros en su sitio. Esto es útil para implementar sistemas de suscripción o acceso exclusivo a contenido premium. |
| FUN004  | Crear Sitio        | Permite configurar un nuevo sitio web desde cero. Incluye opciones para elegir plantillas, personalizar el diseño y configurar dominios. Es ideal para usuarios que desean lanzar un blog o sitio web rápidamente. |
| FUN005  | Autenticar Usuario | Proporciona un sistema de inicio de sesión seguro para los usuarios. Esto incluye autenticación para administradores y miembros, asegurando que solo las personas autorizadas puedan acceder a ciertas áreas del sitio. |


### Listado de Escenarios

| ID Escenario | Funcionalidad | Descripción | Patrón | Versión disponible | Enlace a evidencias |
|--------------|----------------|-------------|--------|--------|----------------------|
| ESC001 | FUN001 | Validar que se pueda crear una publicación ingresando un título y un texto no vacíos, y luego publicarla. | Given-When-Then |rc| |
| ESC002 | FUN001 | Validar que se permita crear una publicación que contenga un enlace de YouTube válido. | Given-When-Then | rc | |
| ESC003 | FUN001 | Validar que no se permita crear una publicación si se incluye un enlace de YouTube inválido. | Given-When-Then |rc | |
| ESC004 | FUN001 | Validar que se pueda guardar una publicación como borrador ingresando título y texto sin publicarla. | Given-When-Then |rc | |
| ESC005 | FUN002 | Validar que se pueda crear una etiqueta ingresando nombre, slug y descripción, y que el nombre no supere los 191 caracteres. |Given-When-Then  | rc | |
| ESC006 | FUN002 | Validar que no se permita crear una etiqueta si el campo nombre está vacío. | Given-When-Then | rc | |
| ESC007 | FUN002 | Validar que no se permita crear una etiqueta si la descripción excede los 500 caracteres. |Given-When-Then | rc | |
| ESC008 | FUN002 | Validar que se pueda crear una etiqueta incluyendo valores en el campo de metadata. | Given-When-Then | rc | |
| ESC009 | FUN003 | Validar que se pueda crear un nuevo miembro ingresando un nombre y un correo electrónico con formato válido. | Given-When-Then | rc | |
| ESC010 | FUN003 | Validar que no se permita crear un miembro si el correo electrónico ingresado tiene un formato inválido. | Page Object | base <br> rc | -[Pixelmatch](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/Efe7M8IDmjNLkQ2hJZbqRaoB7MOzGjc1hoXq3VlrU38pvg?e=tcXk2k) <br> -[Resemblejs](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EW1u5QeAu85Fq2IGgPbBQmsB-7vkyQ3G5fA9TCw8KbEprw?e=I4iwii)|
| ESC011 | FUN003 | Validar que se pueda crear un miembro sin nombre, únicamente ingresando un correo electrónico válido. | Page Object |  base <br> rc | -[Pixelmatch](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EW5VvhZvxLRDj873wOfHdFwBQMvICWs196_vYauXu1mJrQ?e=4MYWSV) <br> -[Resemblejs](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EYa8ZFztqpJHsvjqh7EZTiIBkFl76f2_2CfXjQ5GwarqAQ?e=PHAcZB)|
| ESC012 | FUN003 | Validar que no se permita crear un miembro si se añade una nota con más de 500 caracteres. | Given-When-Then | rc |
| ESC013 | FUN004 | Validar que no se pueda crear un sitio si el correo electrónico ingresado no es válido. | Given-When-Then | rc |  
| ESC014 | FUN004 | Validar que no se pueda crear un sitio si el campo nombre está vacío. | Given-When-Then | rc |  |
| ESC015 | FUN004 | Validar que no se permita crear un sitio si la contraseña ingresada no cumple con el mínimo de caracteres requeridos. | Given-When-Then | rc | |
| ESC016 | FUN004 | Validar que se pueda crear un sitio exitosamente con todos los campos obligatorios correctamente completados. | Given-When-Then | rc |  |
| ESC017 | FUN005 | Validar que un usuario pueda autenticarse correctamente ingresando credenciales válidas. | Given-When-Then | rc | |
| ESC018 | FUN005 | Validar que no se permita la autenticación si la contraseña ingresada es incorrecta. |Given-When-Then | rc | |
| ESC019 | FUN005 | Validar que no se permita autenticar a un usuario si el correo electrónico ingresado no está registrado en la plataforma. | Page Object | rc | |
| ESC020 | FUN005 | Validar que el sistema muestre un error si se intenta autenticar sin completar todos los campos requeridos. | Page Object | rc |  |


## Pros y Contras de las Herramientas para Comparación de Imágenes

### Pixelmatch - Pros

- **Alta Precisión en la Detección de Diferencias**  
  Pixelmatch se destaca por su precisión en la comparación de imágenes, ya que realiza una verificación pixel a pixel. Esta precisión es clave para detectar diferencias pequeñas que podrían pasarse por alto con otros métodos de comparación. Es ideal cuando se necesitan comparar imágenes con detalles finos, como interfaces gráficas de usuario donde el diseño y los colores son cruciales.

- **Rendimiento Rápido**  
  A pesar de su enfoque pixel a pixel, Pixelmatch está optimizado para ser rápido, lo que lo hace adecuado para pruebas automatizadas con grandes cantidades de imágenes, aún cuando solo se comparan dos imágenes. Este rendimiento es especialmente útil cuando se necesita generar resultados rápidos sin sacrificar la precisión en la comparación.

- **Facilidad de Integración**  
  Pixelmatch es bastante sencillo de integrar en proyectos de automatización de pruebas. Al ser una herramienta ligera, puede ser utilizada directamente en el flujo de trabajo sin complicaciones. Esto facilita su adopción para proyectos que ya tienen configuraciones existentes de pruebas visuales.

- **Configuración Simple**  
  La configuración de Pixelmatch es relativamente simple y no requiere una infraestructura compleja. Solo es necesario configurar algunas opciones básicas, como el umbral de tolerancia de las diferencias entre imágenes, lo que lo convierte en una opción ideal para equipos que buscan una solución rápida y eficaz.

### Pixelmatch - Contras

- **No Proporciona Reportes Visuales Detallados**  
  Aunque Pixelmatch es efectivo para la comparación, no genera reportes visuales tan detallados como otros frameworks. Si se requiere un informe exhaustivo con imágenes del "antes", "después" y la "diferencia" visual, será necesario integrar otras herramientas adicionales o generar manualmente los reportes.

- **Menos Flexibilidad en la Personalización**  
  En comparación con Resemble.js, Pixelmatch ofrece menos opciones para personalizar los resultados, como la capacidad de ajustar el nivel de diferencia visual. Esto puede ser una limitación si se requieren informes más complejos o personalizados para un análisis más profundo.

- **Difícil Manejo de Imágenes con Diferencias Pequeñas**  
  En algunos casos, cuando las diferencias entre las imágenes son extremadamente pequeñas, Pixelmatch puede no ser tan sensible o puede requerir un umbral de tolerancia más fino. Esto puede ser problemático si se necesitan detectar diferencias sutiles en áreas muy específicas de la interfaz.

- **Datos Aleatorios Pueden Ser Detectados Como Cambios**  
  Si en las pruebas se rellenan campos con datos aleatorios (como texto generado automáticamente o fechas), cualquier diferencia en esos valores será registrada como un cambio. Esto puede interferir con los resultados, ya que aunque el cambio no afecte la funcionalidad de la aplicación, será detectado como una discrepancia entre las imágenes comparadas.

### Resemble.js - Pros

- **Generación de Imágenes de Diferencias**  
  Una de las principales ventajas de Resemble.js es su capacidad para generar imágenes de diferencias entre dos imágenes comparadas. Aunque no genera un reporte visual automático por defecto, proporciona una URL en formato Base64 de la imagen con las diferencias destacadas, lo que permite crear fácilmente un reporte visual con las alteraciones entre las imágenes, facilitando así la interpretación y visualización de las diferencias.

- **Opciones Avanzadas de Configuración**  
  Resemble.js ofrece una mayor flexibilidad en cuanto a la personalización de las comparaciones. Permite ajustar umbrales de diferencia específicos, elegir si se comparan solo ciertos elementos o áreas, e incluso aplicar diferentes modos de comparación (por ejemplo, ignorando diferencias en los colores o en los bordes). Esto lo convierte en una opción más robusta cuando se necesitan pruebas visuales más detalladas.

- **Facilidad para Identificar Diferencias Visuales**  
  Gracias a su capacidad para generar imágenes de diferencia visual (diffs), Resemble.js hace que sea mucho más fácil identificar y analizar las diferencias entre dos imágenes. Los resultados son accesibles de inmediato y proporcionan una comprensión clara de qué ha cambiado en la aplicación entre las versiones comparadas.

### Resemble.js - Contras

- **Rendimiento Más Lento que Pixelmatch**  
  Aunque Resemble.js es muy potente en términos de flexibilidad y generación de reportes visuales, su rendimiento tiende a ser más lento en comparación con Pixelmatch. Esto puede ser un inconveniente cuando se trabaja con grandes volúmenes de imágenes o cuando se requiere realizar pruebas rápidas en tiempo real.

- **Requiere Más Recursos**  
  Debido a sus características avanzadas y la generación de reportes detallados, Resemble.js puede ser más pesado en términos de consumo de memoria y recursos de procesamiento. Esto podría impactar en el rendimiento si se utiliza en un entorno con limitaciones de hardware o en pruebas de larga duración.

- **Datos Aleatorios Pueden Ser Detectados Como Cambios**  
  Al igual que con Pixelmatch, el uso de datos aleatorios, como texto generado dinámicamente o fechas, puede ser interpretado como una diferencia en la comparación. Esto podría resultar en falsos positivos si no se ajustan correctamente los parámetros o si no se filtran ciertos elementos antes de la comparación.

