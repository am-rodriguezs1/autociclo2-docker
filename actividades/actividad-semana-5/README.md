# Informe de Actividad - Semana 5

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
- Resultados con kraken: [Carpeta de resultados kraken](https://uniandes-my.sharepoint.com/:f:/g/personal/mc_cubides_uniandes_edu_co/EhgdQTdYPotOsDsw3GoTQMcBJxVtmjWdmeG8emSGot75EQ)
- Resultados con Cypress: [Carpeta de resultados Cypress](https://uniandes-my.sharepoint.com/:f:/g/personal/mc_cubides_uniandes_edu_co/Eq9cEjo81ypGlya--iojuxcBa260Z8viwJn1WoqyC3P5Ig)

---

## Informe Actividades

Durante esta semana se llevó a cabo una actividad de planificación el día lunes, en la cual se definieron las cinco funcionalidades principales del sistema que serían sometidas a pruebas automatizadas. A partir de esta definición, se establecieron un total de veinte escenarios de prueba, distribuidos equitativamente con cuatro escenarios por cada funcionalidad. La asignación de trabajo se realizó de manera que cada integrante del equipo se hiciera responsable de una funcionalidad específica. En el caso particular de la funcionalidad de autenticación de usuario, sus escenarios fueron divididos entre los cuatro miembros del equipo.

Cada miembro comenzó el desarrollo de sus escenarios asignados utilizando las herramientas Kraken y Cypress, aplicando patrones de automatización como Given-When-Then o Page Object, según su criterio y preferencia. A lo largo de la semana se llevaron a cabo dos sesiones colaborativas, el miércoles y el viernes, con el objetivo de revisar el avance individual, discutir hallazgos relevantes y consensuar la estructura de carpetas y organización que se utilizará para incorporar los escenarios de prueba en el repositorio del proyecto.

**Desafíos Encontrados y Logros Realizados**

Durante el desarrollo del proyecto se presentaron diversos desafíos técnicos y organizativos. Uno de los principales fue la configuración inicial de Kraken, ya que su documentación oficial es limitada y, en muchos casos, obsoleta. Esto provocó errores de compatibilidad entre versiones que dificultaron el inicio del desarrollo de los escenarios de prueba. En el caso de Cypress, si bien cuenta con una comunidad activa y buena documentación, no ofrece soporte nativo para el patrón Given-When-Then, por lo que fue necesario integrar el preprocesador de Cucumber. Esta integración requirió entender su estructura de archivos, convenciones específicas y realizar ajustes en el entorno de pruebas para lograr una configuración funcional y coherente con el resto del proyecto.

Otro reto importante fue la reescritura de pruebas inicialmente diseñadas en Kraken hacia Cypress. Esta migración implicó un cambio de paradigma técnico, ya que fue necesario adaptar funciones asincrónicas basadas en `await this.driver...` a la sintaxis basada en comandos encadenados de Cypress como `cy.get()...`, lo cual implicó revisar y reestructurar los pasos definidos. Asimismo, para lograr una configuración reutilizable entre diferentes escenarios, se trabajó con variables de entorno como `<URL>` o `<EMAIL>`, las cuales debieron ser correctamente definidas y aseguradas dentro del scope de ejecución de cada paso de prueba.

A pesar de estos desafíos, se lograron avances significativos. Se implementaron patrones de diseño como Page Object Model, lo cual facilitó la organización del código y su mantenibilidad a largo plazo. También se integró la librería `faker.js`, que permitió la generación dinámica de datos aleatorios durante la ejecución de las pruebas. Gracias a esto, fue posible validar múltiples escenarios sin depender de datos estáticos o hardcodeados, lo que incrementó la flexibilidad y robustez de nuestras pruebas automatizadas.



## Funcionalidades Seleccionadas para Pruebas

| ID      | Nombre             | Descripción |
|---------|--------------------|-------------|
| FUN001  | Crear Publicación  | Permite a los usuarios redactar y publicar contenido en su blog o sitio web. Incluye un editor intuitivo basado en bloques, compatible con Markdown, que facilita la creación de publicaciones con texto, imágenes, videos y más. También ofrece opciones de SEO para optimizar la visibilidad de las publicaciones. |
| FUN002  | Crear Etiqueta     | Permite organizar el contenido mediante etiquetas, facilitando la navegación y la búsqueda para los visitantes. Las etiquetas también ayudan a categorizar publicaciones y páginas para mejorar la experiencia del usuario. |
| FUN003  | Crear Miembro      | Facilita la gestión de membresías, permitiendo a los usuarios registrar miembros en su sitio. Esto es útil para implementar sistemas de suscripción o acceso exclusivo a contenido premium. |
| FUN004  | Crear Sitio        | Permite configurar un nuevo sitio web desde cero. Incluye opciones para elegir plantillas, personalizar el diseño y configurar dominios. Es ideal para usuarios que desean lanzar un blog o sitio web rápidamente. |
| FUN005  | Autenticar Usuario | Proporciona un sistema de inicio de sesión seguro para los usuarios. Esto incluye autenticación para administradores y miembros, asegurando que solo las personas autorizadas puedan acceder a ciertas áreas del sitio. |



## Escenarios de Prueba Detallados

| ID Escenario | Funcionalidad | Descripción | Patrón | Enlace a evidencias |
|--------------|----------------|-------------|--------|----------------------|
| ESC001 | FUN001 | Validar que se pueda crear una publicación ingresando un título y un texto no vacíos, y luego publicarla. | Given-When-Then | Kraken:<br>- [ESC001.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EfAULL8RTOtEhc7iSey2O7QBiEmVtgCzzphzm_CHXFAiqg?e=nGYwzK)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EaohEIPewp1OuyPB7wa7oIUBLjeKX8VxJhrNmIPeCEwRbA?e=glIYCY)<br>- [ESC001.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EffuXVtacN5Hj_NFT9uvGz4B1_Y1dC2XFEfVZwbOCNFiwQ?e=TqpKb2) |
| ESC002 | FUN001 | Validar que se permita crear una publicación que contenga un enlace de YouTube válido. | Given-When-Then | Kraken:<br>- [ESC002.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EV3G8BXHfWlOkum8j98jgNABmXJyMyqjvrsvFtVjji4Njg?e=PKqcRx)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EZEmTbchiSVCrZUn4oGn7NEBnA362SIW8k2G-0cHACOoow?e=bOX9nZ)<br>- [ESC002.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EaX3g5_XAAZOpm0QFYsjTV8BWI1_fnuyO31AuvAeVNPiSw?e=O8o5W7) |
| ESC003 | FUN001 | Validar que no se permita crear una publicación si se incluye un enlace de YouTube inválido. | Given-When-Then | Kraken:<br>- [ESC003.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/ERS7p02Vg_FKgHJP1YjUwUcBLhYT7YOaY8fb_kCjh87zGA?e=YFQYXm)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/ETwny2dQ7dhBgvm8LL8cLGABl6jlhiDlZld_qJoHDR9ASw?e=cuAypd)<br>- [ESC003.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EWfQI1p_alhNoY1DxBplBx4BV3XWI5QWk2zp-aRLtCLqwg?e=RmHsq9) |
| ESC004 | FUN001 | Validar que se pueda guardar una publicación como borrador ingresando título y texto sin publicarla. | Given-When-Then | Kraken:<br>- [ESC004.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EYOTtGZFcXRDmVqWQGyVbe4BKM5XVqp7eo7pcaYfsl07aA?e=pp6wb8)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/ERQdXOLG6FNFglU1akoSApMBF6CMBIRj6a-vZnMCsBkLCA?e=f70ZRo)<br>- [ESC004.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EeOxScLbSBZHrLCIOvIzS3sBRAHfbbTbfeoRV-ov0naTFw?e=PDWFxn) |
| ESC005 | FUN002 | Validar que se pueda crear una etiqueta ingresando nombre, slug y descripción, y que el nombre no supere los 191 caracteres. |Given-When-Then  | Kraken:<br>- [ESC005.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EclNDurreT5Dpha-mVnuJOgBV8xdFhX4mfNV88ci2afIlw?e=RBGaNp)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/ERbIuuFj9r1FlXDVmp3a_LMBLm_GPHWUAxEZ2Z2UGY-dGw?e=DkZbzP)<br>- [ESC005.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EWUsLCi_9_1Lv4KWqv0su-QBeJPVyhPRBQECtSvqjD_T3Q?e=fjYEYa) |
| ESC006 | FUN002 | Validar que no se permita crear una etiqueta si el campo nombre está vacío. | Given-When-Then | Kraken:<br>- [ESC006.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EeVqP7l4UiVJkCksMNjC_k8Bd4yrHcNAlxeONnHQ7B5mvA?e=S0ME92)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EUsmBIJHB3lEhAeCGc92wO0BWoL7YUJnZ_ROEKaeVHaM5w?e=XBkGhe)<br>- [ESC006.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/ESBBrRC-lLRNgtjzhuHh4IEBRGcxhti2axXbSb1g4ExO8w?e=hGAJcf) |
| ESC007 | FUN002 | Validar que no se permita crear una etiqueta si la descripción excede los 500 caracteres. |Given-When-Then  | Kraken:<br>- [ESC007.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EVZSUm-5jDJJjYWd9E2gyZ8BPGBcerfnCKlGGo3YYr5fnw?e=lz28TE)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EUoa84ZWuIxCrx_MAI6buhYBGVSWorudVtM008uYXHHGpg?e=5Tg9bY)<br>- [ESC007.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EbsVHYkY5WhGgunnuYuxvMkBrui7gI5w2PIPShlENLlOcQ?e=NuNe6c) |
| ESC008 | FUN002 | Validar que se pueda crear una etiqueta incluyendo valores en el campo de metadata. | Given-When-Then | Kraken:<br>- [ESC008.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EUE7YxkJzqJJoCLoHM2GY9IB6mMXe2PzXlB9YMPoOF7uBA?e=uybjZp)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EUQHYgCHWUBKq9Uxveuo_uUB6Nl94MUPTy6bV4S4pF18sQ?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=VJ6YTQ)<br>- [ESC008.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EQDfEBDwp8FKtZEUR3RUG44BnM3l-I9Egr6QTq7QInP5Kg?e=cDeKnx) |
| ESC009 | FUN003 | Validar que se pueda crear un nuevo miembro ingresando un nombre y un correo electrónico con formato válido. | Given-When-Then | Kraken:<br>- [ESC009.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EWzqmPRMrztGm6SGhuA7bOQB4X9rl1W60X8oF9kyOr_a4g?e=HWxblk)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EbSGliVb6zJCl8ggn1jcEUYBA-DtT_4VGFr9YAEWwjk0Bw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=DONHPe)<br>- [ESC009.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/ETVG72Sn8-REluGVm_lqJR4BNrx64_nBZ1CsUp5KYwMYHA?e=6w23yp) |
| ESC010 | FUN003 | Validar que no se permita crear un miembro si el correo electrónico ingresado tiene un formato inválido. | Page Object | Kraken:<br>- [ESC010.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EVccj80rNMRCkT4tOufMgT8Bf_HVTKAoZvA6CyMmd_AtLg?e=0XZwuo)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EavDLhxUCV1NjyoiD3tOXLUBR8wW85qCVgs_Plsnvnykww?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=N11Fae)<br>- [ESC010.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/ERIOtb7QbhNFlaBiRvrVpmoBlPCq_--FvnkYhvcrjkbdEQ?e=mKuWpb) |
| ESC011 | FUN003 | Validar que se pueda crear un miembro sin nombre, únicamente ingresando un correo electrónico válido. | Page Object | Kraken:<br>- [ESC011.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EboyPg7MifFDqiDSShuY6rgBsElf3UvQGvAE8zOyJ3sBMg?e=Ec1rXH)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EYT0MMB1usVJgjxC4j-h_MIBPkwuq1D1OalH5sU8vtDbOw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=L1gaAY)<br>- [ESC011.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EcEGV5SOr0pAruItO74inzgBwtSGNmCJQA3sughxNanVBA?e=s65tu0) |
| ESC012 | FUN003 | Validar que no se permita crear un miembro si se añade una nota con más de 500 caracteres. | Given-When-Then | Kraken:<br>- [ESC012.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EfNeI5IlMCtMl3qoXVYC_UEB0ahAAz0qG7vzce8sfwu8pQ?e=hsqkI3)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EWKQUY8s5RJKky2M0hPkxgYB6WSeklXgdZKcdpiV8EyQSA?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=X79mit)<br>- [ESC012.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EdOShuDwL4pHpQE0Rg3o7fQB-YgdnVlYXqdmc8k3OaLt5g?e=HGgLXh) |
| ESC013 | FUN004 | Validar que no se pueda crear un sitio si el correo electrónico ingresado no es válido. | Given-When-Then | Kraken:<br>- [ESC013.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EQajSn7SRilDnBi_3xzjFh4BbW4uWqTFAJcSPDcYCv8cPA?e=P0fVYu)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EepvDBT0xvxIm919xWZegWwBJotoGFh04L6mEHYZPtXDtg?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=qFUmND)<br>- [ESC013.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EYdQ6JC7dJ1HgxDZv2F-zggBgOARQuZheUNEbWSu1aTGlw?e=Ug9d9D) |
| ESC014 | FUN004 | Validar que no se pueda crear un sitio si el campo nombre está vacío. | Given-When-Then | Kraken:<br>- [ESC014.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/ETPAaqm2xbFLk_cNSgPWziYB8dDx5iW-z_mbSKsD96M39Q?e=I3j9no)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/ETwTNQcWEXpPg74ba1OH5m4BWF1oTpQeX0AltNOGmsmueA?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=cn7b9I)<br>- [ESC014.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EWqQDKzNjhJKig7Q2Op47kEBBmxciQPW9GtvO2SdsHLH9g?e=d7QnZM) |
| ESC015 | FUN004 | Validar que no se permita crear un sitio si la contraseña ingresada no cumple con el mínimo de caracteres requeridos. | Given-When-Then | Kraken:<br>- [ESC015.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/ES6ML7c0CTdAkqFaOCknC7YB_O0j20R0C4saNsOu39ZAXg?e=8AEqE8)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EVD6cvQ2TCRCsY-pwxOF3y4BZcT1YM3hmMzgige9_6PQ3A?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=rf15KT)<br>- [ESC015.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/ERFI3WZUjphFthK1AU41wkkBHqlnyVHLPmJOLsbsa415SQ?e=55fh0c) |
| ESC016 | FUN004 | Validar que se pueda crear un sitio exitosamente con todos los campos obligatorios correctamente completados. | Given-When-Then | Kraken:<br>- [ESC016.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EW3pD4DKoH5FiIeFPaPXVx0Bd_iIh14foxzXXtmWJ9WP9g?e=fQXrGz)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/ERmuA_1QGbtOh1Cy1w917rEBaNhgP1W1lLAX1EuJTQqMBw?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=QB4Gcs)<br>- [ESC016.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/ES2mdXvswQNAmXPL2T3FGFgBUQJHsMm2SByYwXQ_PsiBvQ?e=mAsKCi) |
| ESC017 | FUN005 | Validar que un usuario pueda autenticarse correctamente ingresando credenciales válidas. | Given-When-Then | Kraken:<br>- [ESC017.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/Ecg2T6Ng1UZLmNFJOWjICeEBIqgehoXXs16vdcLmc-8l4Q?e=ZJvqaU)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EYjdvSNNIppKmZ4VP7R6WfkBcaZ_hNi2jaM9N98oCsuDSQ?e=1HeSmg)<br>- [ESC017.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EfGpgh-F0tBNgU-P97aIerMBtvq2tLAKsHZSaHLFwZ-ddQ?e=i0gTkO) |
| ESC018 | FUN005 | Validar que no se permita la autenticación si la contraseña ingresada es incorrecta. |Given-When-Then | Kraken:<br>- [ESC018.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EYAUWZMWhrtDj8aYFbuvuRsB_8LGoDZLqusF00xH40mSSQ?e=rDackE)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EYdhrkhsUMFFqUM1RLIgtyABslUQZguxFcz2w0m1Qwbjdg?e=3VjBls)<br>- [ESC018.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EQBsr8sLaHNGl--Mr6BQg-MB3Pgl7ddDlonZGhDw7ZyDow?e=fpq0Qs) |
| ESC019 | FUN005 | Validar que no se permita autenticar a un usuario si el correo electrónico ingresado no está registrado en la plataforma. | Page Object | Kraken:<br>- [ESC019.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EZCZx1d9sr1MltwtOg6XhdABLf_a4Z0RAgavjoTUQpgFDg?e=7cxxsd)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EeakuRZTBKxKgx0g5-m9Og0BTu8xyn8V1MODto3sEGAJTg?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=km7Hny)<br>- [ESC019.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EYpTkVqdE7JJq5DEV8wPjnMBsan6hFQCZg7-jQRrvhh_Iw?e=dde7j1) |
| ESC020 | FUN005 | Validar que el sistema muestre un error si se intenta autenticar sin completar todos los campos requeridos. | Page Object | Kraken:<br>- [ESC020.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EdjJKmse2JhAhWafkwPyImUBi0GTaTHFQxgq-1pEwqb-4g?e=coiR9w)<br>Cypress:<br>- [video](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EQJfXeFSm0FCr_drteWS7roBHHgpz8-YV3ba6ANrIQA9TA?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=5VaI8Q)<br>- [ESC020.pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EZVPz1cwlTxHqh5l-gNQGaABrPIrPKHnYN_1XXm_MK9Elg?e=uznoSJ) |



## El resumen de los pros y los contras de las herramientas para E2E utilizadas

### Kraken Pros

- **Mayor legibilidad para perfiles no técnicos**  
  El uso del lenguaje Gherkin facilita que los escenarios de prueba puedan ser comprendidos por personas que no son desarrolladoras, como QA funcionales, Product Owners o analistas.

- **Escenarios como documentación viviente**  
  Los archivos `.feature` actúan como documentación funcional actualizada. Cada escenario describe de forma clara qué comportamiento del sistema se está validando.

- **Modularidad y reutilización de pasos**  
  Al separar el comportamiento (Gherkin) de la lógica de automatización (definiciones de pasos en JavaScript), es más fácil mantener el código y reutilizar bloques comunes entre múltiples pruebas.

### Kraken Contras

- **Menor documentación y comunidad activa**  
  Kraken cuenta con menos documentación y una comunidad más reducida en comparación con frameworks más populares. Además, actualmente no está siendo mantenido activamente, lo que implica el uso de librerías desactualizadas y potenciales vulnerabilidades de seguridad.

- **Configuración inicial innecesariamente compleja**  
  Requiere una configuración manual extensa, incluyendo la instalación de dependencias que no siempre son relevantes para el proyecto. Por ejemplo, solicita la descarga del SDK de Android incluso si no se realizarán pruebas en dispositivos móviles.

  
### Cypress - Pros

- **Herramientas visuales para depuración paso a paso**  
  Cypress permite visualizar cada paso ejecutado durante la prueba, facilitando la identificación de errores y el análisis detallado del flujo de ejecución.

- **Soporte para BDD (Behavior-Driven Development)**  
  Al integrarse con el lenguaje Gherkin, se pueden definir escenarios de prueba comprensibles para todo el equipo, incluidos roles no técnicos como analistas o Product Owners.

- **Separación de lógica y definición de escenarios**  
  Los pasos definidos en archivos `.feature` están desacoplados de su implementación en JavaScript, lo que permite una mayor organización, mantenibilidad y reutilización del código.

- **Pruebas legibles y documentadas**  
  Los pasos escritos en lenguaje natural, como “Dado que ingreso al sitio” o “Entonces debería ver un mensaje de error”, hacen que las pruebas sirvan también como documentación funcional y actualizada del sistema.

- **Compatibilidad con el patrón Page Object Model**  
  Cypress permite estructurar la lógica de interacción con la interfaz de usuario utilizando Page Objects, facilitando la escalabilidad y la reutilización entre pruebas.


### Cypress - Contras

- **Mayor complejidad en la configuración inicial**  
  Integrar Cucumber con Cypress requiere instalar y configurar plugins como `@badeball/cypress-cucumber-preprocessor`, además de ajustar archivos de configuración y estructuras específicas, lo cual puede ser una barrera para nuevos usuarios.

- **Menor soporte oficial para Cucumber**  
  La integración con Gherkin no es oficialmente mantenida por el equipo de Cypress, por lo que algunos problemas técnicos pueden requerir investigación adicional o soluciones personalizadas.

