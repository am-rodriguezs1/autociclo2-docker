# Informe de Actividad - Semana 4

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
- Estrategia de Pruebas: [estrategia](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/ERbjiWTHUbxCrnK-I6EKu5QBjYmeKXy3R5m_IXbzSjBmKA?e=OWlwER)
- Repositorio de Incidencias: [automatizacion-issues](https://github.com/automatizacionciclo2/automatizacion-issues/issues)
- Semillas de ejecución Monkey Testing: [semillas](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/ERHLPqPsVERJtGA9YYCtOtEBMMn_xsu-SFtr8j6NpvFZmg?e=BrdlNz)
- Resultados con Monkey Testing: [resultados pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/EePGIbiftfZNkEV1l6PnSBQB-u5Jz0C4EZiAxqrkNTDX5A?e=cWLNnk)
- Resultados con Ripper Testing: [resultados pdf](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/Ed7jEBbkbhBEv3vaUpdNU6wBcp3tkHT9EbJ7dWbbWvS-iA)
- Video resumen: [video](https://youtu.be/-rN5_bgKtj4)

---

## Informe Actividades
Durante la semana 4, se llevaron a cabo diversas reuniones de coordinación, comenzando el lunes con una reunión inicial para revisar y acordar las tareas pendientes. En esta reunión, se estableció que el foco principal sería realizar las correcciones a la estrategia de pruebas, lo cual incluía modificar el modelo GUI, el modelo de datos y agregar un diagrama de Gantt. También se ejecutó el action de GitHub para descargar los workspaces de monkeys y rippers.

Durante los días lunes a jueves, se trabajó en los cambios a la estrategia de pruebas. El jueves, el equipo se reunió nuevamente para trabajar en la adaptación del código para que funcionara con Ghost en ambos workspaces. A lo largo del viernes y sábado, de manera asincrónica, se continuaron las configuraciones y se ejecutaron pruebas en el sistema bajo prueba. Finalmente, el sábado se realizó una revisión conjunta del trabajo realizado.

**Desafíos Encontrados y Logros Realizados**

Durante la configuración del entorno de pruebas, surgieron algunos desafíos. Aunque el repositorio ya contaba con una base de ejecución, había elementos adicionales que debían ser considerados, como la necesidad de iniciar sesión para poder continuar con las pruebas.

En las pruebas con el Ripper, uno de los principales logros fue entender el funcionamiento del script entregado y su configuración, lo que permitió profundizar en las pruebas y optimizar su ejecución. Esto resultó en una mayor cobertura de los casos a probar, además de proporcionar evidencias claras de la ejecución, lo que permitió validar que las pruebas de reconocimiento se estaban realizando correctamente. A través de esta metodología, se identificaron áreas clave para mejorar la fiabilidad de las pruebas y asegurar que los resultados obtenidos fueran precisos.

Sin embargo, el proceso no estuvo exento de dificultades. La configuración del ambiente de pruebas fue un desafío significativo. Se dedicó una cantidad considerable de tiempo a entender cómo funcionaba el código y la interacción entre el entorno y el Ripper, con el fin de asegurar una correcta configuración. Durante esta fase, se descubrieron varios problemas que afectaban la ejecución del script, lo que requirió ajustes y una revisión exhaustiva. Además, el manejo de errores durante los distintos pasos del Ripper presentó obstáculos. En algunos casos, surgieron errores no contemplados que retrasaron el flujo de pruebas, lo que llevó a identificar que la estructura del script necesitaba ajustes para cubrir todos los posibles escenarios de prueba. Estos desafíos fueron finalmente resueltos con una mayor comprensión y control sobre los pasos del script.

Por otro lado, en las pruebas realizadas con los Monkeys, se logró realizar una cobertura significativa de la aplicación. El equipo logró asegurar que las pruebas abarcaran todas las funcionalidades que se buscaban probar. Un reto importante en esta fase fue configurar el Monkey para que recorriera todas las funcionalidades sin quedar atrapado en un solo punto. Si se dejaba al Monkey sin restricciones, este tardaba demasiado en salir del dashboard y no alcanzaba a cubrir otras funcionalidades críticas. Este desafío se resolvió forzando un recorrido específico para el Monkey, creando pruebas dedicadas a cada funcionalidad y asegurando que el script siguiera un camino determinado.

En cuanto a los desafíos que surgieron durante las pruebas con Monkeys, uno de los más significativos fue la interacción de los Monkeys con la interfaz. En algunos casos, los Monkeys intentaron hacer clic en elementos no clickeables o realizaron clics simultáneos en varios elementos, lo que generaba errores al quedarse esperando una acción que nunca ocurriría. Esto complicaba la ejecución de las pruebas y afectaba su continuidad. Para resolver este problema, se realizaron modificaciones en los comandos de Cypress, lo que permitió estabilizar el comportamiento del Monkey y ejecutar las pruebas durante períodos más largos sin interrupciones.

Otro reto importante fue la sensibilidad de las pruebas a pequeños cambios en la interfaz de usuario (UI). Si se realizaba algún ajuste, como el cambio en el título de un post, el desplazamiento de un botón o cualquier otro detalle, las pruebas ya no se ejecutaban correctamente. Para garantizar la replicabilidad de las pruebas y obtener resultados consistentes, se implementó una estrategia para guardar el estado previo de la UI antes de cada ejecución y restablecerla de forma que se pudieran ejecutar las pruebas sin que los cambios en la interfaz afectaran su resultado.

A pesar de los desafíos presentados, tanto en las pruebas con Rippers como con Monkeys, el equipo pudo superar los obstáculos mediante ajustes en la configuración, la modificación de comandos y la implementación de técnicas para controlar la UI. Estos esfuerzos no solo mejoraron la estabilidad y la eficiencia de las pruebas, sino que también contribuyeron a una mejor comprensión de los scripts y su interacción con la aplicación, lo que resultó en una mayor cobertura y en pruebas más efectivas a lo largo del proceso.


## Monkey Testing - Resultados
Al ejecutar el **Monkey Testing** con el comando `npm run monkey:test`, se iniciaron las pruebas de los archivos en la ruta `reconocimiento/misw-4103-monkey/cypress/e2e`. Al finalizar la ejecución, se obtuvo el siguiente resultado:

```
====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        14.3.2                                                                         │
  │ Browser:        Electron 130 (headless)                                                        │
  │ Node Version:   v20.19.0 (C:\Program Files\nodejs\node.exe)                                    │
  │ Specs:          8 found (funcionalidad1.cy.js, funcionalidad2.cy.js, funcionalidad3.cy.js, fun │
  │                 cionalidad4.cy.js, funcionalidad5.cy.js, funcionalidad6.cy.js, funcionalidad7. │
  │                 cy.js, funcionalidad8.cy.js)                                                   │
  │ Searched:       cypress/e2e/**/*.cy.{js,jsx,ts,tsx}                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  funcionalidad1.cy.js                                                            (1 of 8)


  Monkey Testing - Funcionalidad1
    √ should perform monkey testing on /settings/portal/edit (10237ms)


  1 passing (10s)

[mochawesome] Report JSON saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-50-56-122Z.json

[mochawesome] Report HTML saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-50-56-122Z.html


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     10 seconds                                                                       │
  │ Spec Ran:     funcionalidad1.cy.js                                                             │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started compressing: Compressing to 32 CRF
  -  Finished compressing: 1 second

  -  Video output: C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\videos\funcionalidad1.cy.js.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  funcionalidad2.cy.js                                                            (2 of 8)


  Monkey Testing - Funcionalidad2
npm error Lifecycle script `test` failed with error:
npm error code 1
npm error path C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey
npm error workspace misw-4103-monkey@2.0.0
npm error location C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey
npm error command failed
npm error command C:\WINDOWS\system32\cmd.exe /d /s /c npx cypress run
PS C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6> ^C
PS C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6> npm run monkey:test

> proyecto-base@1.0.0 monkey:test
> npm run test -w misw-4103-monkey


> misw-4103-monkey@2.0.0 test
> npx cypress run



DevTools listening on ws://127.0.0.1:62616/devtools/browser/1d263af9-1a9d-4387-8d22-43636ad6d6df

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        14.3.2                                                                         │
  │ Browser:        Electron 130 (headless)                                                        │
  │ Node Version:   v20.19.0 (C:\Program Files\nodejs\node.exe)                                    │
  │ Specs:          8 found (funcionalidad1.cy.js, funcionalidad2.cy.js, funcionalidad3.cy.js, fun │
  │                 cionalidad4.cy.js, funcionalidad5.cy.js, funcionalidad6.cy.js, funcionalidad7. │
  │                 cy.js, funcionalidad8.cy.js)                                                   │
  │ Searched:       cypress/e2e/**/*.cy.{js,jsx,ts,tsx}                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  funcionalidad1.cy.js                                                            (1 of 8)


  Monkey Testing - Funcionalidad1
    √ should perform monkey testing on /settings/portal/edit (10648ms)


  1 passing (11s)

[mochawesome] Report JSON saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z.json

[mochawesome] Report HTML saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z.html


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     10 seconds                                                                       │
  │ Spec Ran:     funcionalidad1.cy.js                                                             │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started compressing: Compressing to 32 CRF
  -  Finished compressing: 1 second

  -  Video output: C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\videos\funcionalidad1.cy.js.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  funcionalidad2.cy.js                                                            (2 of 8)


  Monkey Testing - Funcionalidad2
    √ should perform random monkey events (53218ms)


  1 passing (53s)

[mochawesome] Report JSON saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_001.json

[mochawesome] Report HTML saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_001.html


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     53 seconds                                                                       │
  │ Spec Ran:     funcionalidad2.cy.js                                                             │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started compressing: Compressing to 32 CRF
  -  Finished compressing: 3 seconds

  -  Video output: C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\videos\funcionalidad2.cy.js.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  funcionalidad3.cy.js                                                            (3 of 8)


  Posts management
    √ Monkey testing on Posts section (178623ms)


  1 passing (3m)

[mochawesome] Report JSON saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_002.json

[mochawesome] Report HTML saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_002.html


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     2 minutes, 58 seconds                                                            │
  │ Spec Ran:     funcionalidad3.cy.js                                                             │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started compressing: Compressing to 32 CRF
  -  Finished compressing: 12 seconds
    Compression progress:  100%

  -  Video output: C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\videos\funcionalidad3.cy.js.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  funcionalidad4.cy.js                                                            (4 of 8)


  Pages management
    √ Monkey testing on Pages section (173976ms)


  1 passing (3m)

[mochawesome] Report JSON saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_003.json

[mochawesome] Report HTML saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_003.html


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     2 minutes, 54 seconds                                                            │
  │ Spec Ran:     funcionalidad4.cy.js                                                             │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started compressing: Compressing to 32 CRF
  -  Finished compressing: 12 seconds
    Compression progress:  100%

  -  Video output: C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\videos\funcionalidad4.cy.js.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  funcionalidad5.cy.js                                                            (5 of 8)


  Monkey Testing - Funcionalidad5
    √ should perform monkey testing on /tags (58609ms)


  1 passing (59s)

[mochawesome] Report JSON saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_004.json

[mochawesome] Report HTML saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_004.html


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     58 seconds                                                                       │
  │ Spec Ran:     funcionalidad5.cy.js                                                             │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started compressing: Compressing to 32 CRF
  -  Finished compressing: 5 seconds

  -  Video output: C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\videos\funcionalidad5.cy.js.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  funcionalidad6.cy.js                                                            (6 of 8)


  Members management
    √ Monkey testing on Members section (204613ms)


  1 passing (3m)

[mochawesome] Report JSON saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_005.json

[mochawesome] Report HTML saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_005.html


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     3 minutes, 24 seconds                                                            │
  │ Spec Ran:     funcionalidad6.cy.js                                                             │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started compressing: Compressing to 32 CRF
  -  Finished compressing: 19 seconds
    Compression progress:  100%

  -  Video output: C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\videos\funcionalidad6.cy.js.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  funcionalidad7.cy.js                                                            (7 of 8)


  Monkey Testing - Funcionalidad7
    √ should perform monkey testing on /settings/design/edit (55370ms)


  1 passing (55s)

[mochawesome] Report JSON saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_006.json

[mochawesome] Report HTML saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_006.html


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     55 seconds                                                                       │
  │ Spec Ran:     funcionalidad7.cy.js                                                             │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started compressing: Compressing to 32 CRF
  -  Finished compressing: 3 seconds

  -  Video output: C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\videos\funcionalidad7.cy.js.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  funcionalidad8.cy.js                                                            (8 of 8)


  User configuration
    √ Monkey testing on User Configuration section (67359ms)


  1 passing (1m)

[mochawesome] Report JSON saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_007.json

[mochawesome] Report HTML saved to C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\monkey-report-2025-04-27T11-52-28-936Z_007.html


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     1 minute, 7 seconds                                                              │
  │ Spec Ran:     funcionalidad8.cy.js                                                             │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started compressing: Compressing to 32 CRF
  -  Finished compressing: 4 seconds

  -  Video output: C:\Users\MCCM\MasterTrack\GitHub\202512-proyecto-equipo-6\reconocimiento\misw-4103-monkey\cypress\results\videos\funcionalidad8.cy.js.mp4


====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  funcionalidad1.cy.js                     00:10        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  funcionalidad2.cy.js                     00:53        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  funcionalidad3.cy.js                     02:58        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  funcionalidad4.cy.js                     02:54        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  funcionalidad5.cy.js                     00:58        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  funcionalidad6.cy.js                     03:24        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  funcionalidad7.cy.js                     00:55        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  funcionalidad8.cy.js                     01:07        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    √  All specs passed!                        13:23        8        8        -        -        -
```

### Archivos Generados
- **Videos**: Se guardaron en la carpeta `reconocimiento\misw-4103-monkey\cypress\results\videos`.
- **Reportes**: Se guardaron en la carpeta `reconocimiento\misw-4103-monkey\cypress\results`.

Los resultados completos se encuentran en el siguiente enlace de SharePoint: [videos](https://uniandes-my.sharepoint.com/:f:/g/personal/mc_cubides_uniandes_edu_co/EuAb2_4I3uBNvQy9T79GgUABUkcBVwUmY5w-hGPk7cH9PQ?e=Gafz9I).

Dentro de la carpeta **videos**, encontrarás 8 videos con los resultados de cada funcionalidad:

1. **[Funcionalidad 1](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EdiSOPgzgv1Ckpv3Kj0RTbMBxJfBvo-LQylVOnebgBwjhA)**
2. **[Funcionalidad 2](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EbcZqgQvVk5Ho8TGAUOHYmcB1oY201pKMNP9mlZvcOos5A)**
3. **[Funcionalidad 3](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/Ec26lG2esB1EqPciyonbkcMBnTNV3tDwG7XzL28S4aZoMA)**
4. **[Funcionalidad 4](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EahYOqPzCXlMo9oTRolu6bQBv5UmwVRoOsfHXQ6AHe-9CA)**
5. **[Funcionalidad 5](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EeaL7KlXC39ChX2L6xEIId4BY9LZyr_OMoJ0-tOCPs1ivA)**
6. **[Funcionalidad 6](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EV3ZwI2tL2FKic_mwklaCPUBNxLxXGZ8PA9AXppMlbr0mA)**
7. **[Funcionalidad 7](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/EdtzovhSGfVFviTLN_UOgGwBaNZt3Wb4V2YvxTxlUBSTjw)**
8. **[Funcionalidad 8](https://uniandes-my.sharepoint.com/:v:/g/personal/mc_cubides_uniandes_edu_co/Efu-eO15XYlHnoEWxHTDCr0B9OxyaUZifAf_biDokXc1rA)**

Los reportes están disponibles en el siguiente enlace de SharePoint: [reportes](https://uniandes-my.sharepoint.com/:f:/g/personal/mc_cubides_uniandes_edu_co/Ek7ks96KEq9NgyHhfwVyRrQBz3F5n_Mg33qZpfKvBCR9IQ).


### Incidencias Generadas

De los resultados obtenidos, se crearon las siguientes incidencias:

- [Incidencia 1](https://github.com/automatizacionciclo2/automatizacion-issues/issues/13)
- [Incidencia 2](https://github.com/automatizacionciclo2/automatizacion-issues/issues/14)
- [Incidencia 3](https://github.com/automatizacionciclo2/automatizacion-issues/issues/15)

## Ripper Testing - Resultados

### Procedimiento para visualizar los resultados

1. Descargue la carpeta **Ripper evidencias** desde el siguiente enlace:  
   [Ripper evidencias](https://uniandes-my.sharepoint.com/:f:/g/personal/mc_cubides_uniandes_edu_co/EnZc7OQD_G5JqPiE9PJO3EEBQGNjLKRSjHitlJSmYo0vwg).

2. El archivo se descargará en formato `.zip`. Descomprímalo en una ubicación de su preferencia.

3. Abra una terminal o símbolo del sistema (**cmd**) y navegue hasta la ruta donde descomprimió la carpeta **Ripper evidencias**. Asegúrese de ingresar a dicha carpeta desde la terminal.

4. Una vez dentro, deberá crear un servidor local sencillo ejecutando los siguientes comandos:

   ```bash
   npm install -g http-server
   http-server
   ```

> **Nota:** Asegúrese de estar ubicado en la ruta correcta, por ejemplo:  
> `C:\RUTA_DONDE_DESCOMPRIMIÓ\Ripper evidencias`.

5. Al ejecutar el servidor, verá un mensaje similar al siguiente:

```
Starting up http-server, serving ./

http-server version: 14.1.1

http-server settings:
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://172.27.16.1:8080
  http://192.168.56.1:8080
  http://192.168.2.10:8080
  http://127.0.0.1:8080
Hit CTRL-C to stop the server
```


6. Ingrese a cualquiera de las URLs disponibles en su navegador. Se mostrará una página con un contenido similar a:

```
Index of /
(drw-rw-rw-)  27-abr.-2025 19:39   screenshots/
(-rw-rw-rw-)  27-abr.-2025 19:39   33.7k  graph.json
(-rw-rw-rw-)  27-abr.-2025 19:39   2.8k   graph2.json
(-rw-rw-rw-)  27-abr.-2025 19:39   159.3k graph3.json
(-rw-rw-rw-)  27-abr.-2025 19:39   413B   report.css
(-rw-rw-rw-)  27-abr.-2025 19:39   9.5k   report.html
```

7. Haga clic sobre el archivo **report.html** para visualizar el reporte de resultados

### Alternativa rápida

También puede acceder directamente al resultado en formato PDF a través del siguiente enlace:  
[Ripper Resultado (PDF)](https://uniandes-my.sharepoint.com/:b:/g/personal/mc_cubides_uniandes_edu_co/Ed7jEBbkbhBEv3vaUpdNU6wBcp3tkHT9EbJ7dWbbWvS-iA).



## Pros y Contras de las Herramientas para Pruebas de Reconocimiento

### Monkey Testing - Pros

- **Exploración Realista**  
  El monkey testing simula el comportamiento impredecible de un usuario real, replicando acciones como clics, desplazamientos y entradas en cualquier parte de la interfaz. Esto incluye interacciones en lugares inesperados o áreas que no se habían contemplado durante las pruebas manuales. Su naturaleza caótica permite explorar el sistema desde una perspectiva que a menudo pasa desapercibida en pruebas tradicionales.

- **Detección de Errores Ocultos**  
  Este enfoque es altamente eficaz para identificar fallos que podrían no ser detectados en pruebas manuales o mediante scripts tradicionales. Gracias a su capacidad para cubrir una amplia gama de escenarios simultáneamente, el monkey testing puede, por ejemplo, detectar errores al cambiar el tamaño de la pantalla, algo que frecuentemente se olvida. Además, como el sistema interactúa de manera aleatoria, puede hacer clic en botones o acceder a componentes que inicialmente no habían sido analizados, lo que lleva a descubrir vulnerabilidades no previstas.

- **Integración con Reporting**  
  Cypress facilita la captura de capturas de pantalla, videos y reportes HTML utilizando herramientas como Mochawesome. Esto proporciona una visión clara de lo que hace el monkey y permite replicar los fallos. El contexto en el que ocurrió el error, los datos renderizados en ese momento y los pasos previos al fallo son fácilmente accesibles, lo que mejora la capacidad de diagnóstico y resolución.

- **No Necesita Intervención Manual**  
  Una vez que se crea un flujo de trabajo limpio para el monkey testing, como el que se realiza en un archivo como `utils/monkey.js`, el código puede ser reutilizado en diversas pruebas y rutas. Este enfoque permite que el monkey realice las interacciones de manera autónoma y sin intervención humana, simplemente permitiéndole interactuar durante un período extendido. Esto reduce la necesidad de supervisión constante, lo que facilita la implementación de pruebas de larga duración.

### Monkey Testing - Contras

- **Cobertura No Garantizada**  
  Una de las principales desventajas del monkey testing es que no garantiza una cobertura completa y sistemática de todas las funcionalidades. A pesar de que el monkey pueda interactuar con múltiples elementos, no siempre se asegura de probar todas las rutas posibles. A menudo, el monkey repite acciones en componentes ya probados o se queda atascado en zonas de la interfaz que no son relevantes para la prueba.

- **Alto Consumo de Recursos**  
  Para que el monkey testing cubra una variedad de funcionalidades y tenga tiempo de salir de posibles bloqueos, es necesario realizar pruebas de larga duración, que implican miles de acciones. Este tipo de pruebas pueden sobrecargar el navegador y ralentizar significativamente las máquinas, afectando el rendimiento tanto del entorno de pruebas como de la infraestructura en general.

- **Falsos Positivos**  
  El monkey testing puede generar falsos positivos debido a eventos imposibles, como intentos de ingresar datos en elementos invisibles o interacciones con componentes fuera del alcance de la interfaz gráfica. Estos errores no son necesariamente representativos de problemas reales en la aplicación, pero pueden generar ruido en los resultados, haciendo más difícil diferenciar entre fallos reales y comportamientos inesperados que no son relevantes.

- **Difícil Parametrización de Comportamientos Específicos**  
  Una de las limitaciones del monkey testing es la falta de control sobre las áreas específicas que se están probando. Si, por ejemplo, se pierde la sesión o se está tratando de probar una funcionalidad específica, el monkey puede desviarse y comenzar a interactuar con partes de la interfaz que no eran parte de la prueba. Esto puede resultar en pruebas inválidas, como cuando el monkey realiza un logout y comienza a interactuar con la página de inicio de sesión, lo que hace que la prueba pierda sentido.

- **Sensibilidad a Cambios en la Interfaz Gráfica**  
  El monkey testing es extremadamente sensible a cualquier cambio en la interfaz de usuario. Si un cambio, como la modificación del nombre de un post, provoca el reordenamiento de los elementos en la pantalla, el comportamiento del monkey puede verse afectado en futuras ejecuciones. Esto compromete la replicabilidad de la prueba, ya que el monkey puede intentar interactuar con elementos que han cambiado de posición, lo que resulta en un fallo que no refleja un verdadero problema en la aplicación.

### Ripper Testing - Pros

- **Descubrimiento y Mapeo Rápido de Funcionalidades**  
  El Ripper Testing permite descubrir y mapear las funcionalidades de una aplicación de manera mucho más rápida y precisa en comparación con las pruebas manuales, reduciendo tanto el esfuerzo humano como el margen de error.

- **Generación de Casos de Prueba Específicos**  
  Durante la ejecución, se pueden generar casos de prueba más específicos basados en las funcionalidades encontradas. Esto ahorra tiempo en el diseño de los casos de prueba, ya que se enfocan en lo que realmente se encuentra en la aplicación.

- **Optimización de Tiempos de Ejecución**  
  Las pruebas automáticas pueden ser configuradas para dirigirse únicamente a flujos o componentes críticos, optimizando los tiempos de ejecución y facilitando la detección temprana de defectos en áreas clave de la aplicación.

- **Generación Automática de Modelos de Interfaz**  
  La técnica de ripping permite generar automáticamente un modelo de la interfaz de usuario, acelerando la documentación y análisis de cambios en el sistema. Esto es especialmente útil en aplicaciones dinámicas que requieren actualización constante.

- **Minimización de Errores Humanos**  
  Al automatizar el proceso de exploración, se minimizan los errores asociados a pruebas manuales repetitivas, aumentando así la confiabilidad y consistencia de los resultados.

### Ripper Testing - Contras

- **Configuración Inicial Compleja**  
  El entorno de pruebas requiere una configuración detallada que puede consumir bastante tiempo. Esto incluye la instalación de herramientas, la preparación del sistema objetivo y la adecuación de las estrategias de ripping.

- **Interacción Menos Flexible**  
  A pesar de que no necesita intervención manual durante la ejecución, es necesario detallar la interacción de una manera más específica. Esto lo hace menos flexible en comparación con el monkey testing, que es más aleatorio y no requiere una estructura tan rígida.

- **Dependencia de Buenas Prácticas de Desarrollo**  
  Si los elementos de la aplicación no están etiquetados adecuadamente o siguen malas prácticas (como identificadores genéricos o falta de accesibilidad), el proceso de ripping puede volverse ineficaz o incompleto, lo que limita su capacidad para mapear correctamente la interfaz.

- **Exceso de Datos en Sistemas Complejos**  
  En sistemas grandes o muy complejos, el ripper puede generar una cantidad masiva de datos y relaciones entre componentes, dificultando el análisis si no se cuenta con herramientas de filtrado adecuadas.

- **Costo de Mantenimiento por Cambios en la Estructura**  
  Cada cambio importante en la estructura de la aplicación puede requerir una reconfiguración o ajuste del proceso de ripping, lo que incrementa el costo de mantenimiento del entorno de prueba a lo largo del tiempo.
