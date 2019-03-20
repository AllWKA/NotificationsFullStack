
# Instalación

  

Open a command line console and clone this project.

  

  

> git clone https://github.com/alejandroasc96/ProyectoFullStack

  

Go to the new created directory

  

  

> cd ProyectoFullStack

  

Test the project

  

  

> ionic serve --lab

  

When all node.js modules have been downloaded a new browser window will open with the project shown above in the screenshots.

  

  

# Contenido

  

  

## Idea genérica

  

  

Tal como se ve en la siguiente imagen el funcionamiento de nuestra aplicación trata sobre un cliente que va realizando peticiones al servidor, en el cual se encuentran los end-point que se conectan a la base de datos mediante el mapeo ORM. Una vez accedido al valor deseado le devuelve dicho valor al cliente .

  

  

![](https://lh3.googleusercontent.com/Dq1-OoyMhPuJyih3QcRe4IiBYxg_uWHIYFgVJ4thka3TXAmtXtldSZho3Jq1qm3JXjDaEu2sL6lo7CnuWOHwHWalfGWOAWGo3edj8UvUXDX5qqOEpyb4ns4tsI28QalNR7iSc1XM)

  

  

## Tecnologías usadas

  

![](https://lh5.googleusercontent.com/TERSOzKaa5ROSmKY0_vnpfCt5cM1PQ1fspkraLKiOAsPVTO9tym9AEH01rqwuET8W8oOVOVGPQX4BnmUav9jc1zjQmDOHbuCnnOsCPuiWeJHGp0N8eE8P7uN1bUCOKxk7nlhTOua)

  

  

# Diseño de Base de Datos

  

## Casos de Uso

  

![](https://lh4.googleusercontent.com/fXIz-p8p11CYSzbS--ligwQhpE6Eel29_62L4flOrxL4IbkBwctxP5Hn5KFXZ8x86mI6nB61OSWg0VGcMn2a4xpxXxHH0gNmlHp22xcvPNarVNZzzLXfxYd913sEwKcCMwxSTIFi)

  

  

## Diagrama de Clases

  

  

Dado el siguiente diagrama de clase podemos observar las diferentes clases que posee la aplicación así como las relaciones que hay entre ellas. Como dato importante observamos que poseemos una clase User de la que heredan las clases client,monitor y admin; por otro lado encontramos una realción de muchos a muchos entre la clase Activity y Client

  

![](https://lh4.googleusercontent.com/p5KmWW2WHnzpX4mjZIEOSrFWgtetsFTWHk0TYFZjAh0DivncQ-u1ZL8ifJ3gp6vjot2xrViFya7W6Om9NXGC3J558UDb1fbUCT_G-ZbIF7zfCJ4Bw2RpG6k2uKx3vdnoBwfStmTd)

  

  

Una vez realizado dicho diagrama nos resulta mucho más fácil obtener el diagrama de entidad relación.

  

  

## Entidad relación:

  

![](https://lh3.googleusercontent.com/EoDe_wh1TMYi6Se6e4s27KRNxWctmSnTV8QNOboQZH6kN9Q2EOVvkrPaMpL1V3wEcz8s-sknRpIU6BExYB7-myv5zylw9qrkAMMhPhzYdiUPAG7EKKVhxjbdukq2B_Wf6M_XcNVQ)

  

Gracias al diagrama de clase se nos da fácilmente el diagrama de entidad relación donde queda reflejado lo mencionado anteriormente; además de ofrecernos un vista gráfica muy óptima para la creación de las base de datos. Así mismo vemos que todos los usuarios han sido agrupados dentro de una entidad llamada User donde se hace referencia del tipo de usuario es mediante el campo discriminator.Por otro lado de la relación de muchos a muchos se ha transformado en una nueva entidad llamada User_Activity donde se recogen las clave foráneas de tanto el la id del usuario “UserID”, como del la id de la actividad “ActivityID”.

  

  

## Base de Datos

  

### Vista General

  

![](https://lh5.googleusercontent.com/00zSTgIRmDk6I15Vm92yaOThx8uXe6eQnJFjD16EePI18uue3Bs67ObXr0Tm4TMLquwhva6LdmefsEoafxbQQ7WNOOcOfO4F-qGU6n6jiHM600ZbtJg25YfAaW3xazW3gX1ZaRHO)

  

### Tabla User

  

![](https://lh3.googleusercontent.com/LWR9CKPI1pnhACZ6aN3dCeseHXBUxotrzONqXdZKQ1O8XmhL2wSMNh7vCckvPMK9-eH0KNDr7AvnC4qWs1R99pivZDJEQ7f0tN-xdl-dZivzyiJAjcBL7zb2pMaI9Nh-NPDB5q7A)

  

En la tabla user el campo discriminator será el que diferencien entre los tipos de usuarios que pueden haber (Admin,Client,Monitor).

  

### Tabla news

  

![](https://lh4.googleusercontent.com/ypIs7Ok_XRjK8wNUKW3RdADVnq8z6DTqNKpaSWaKm3asXVp0FlUidr1ZxfMGrGBtddwt9pAQieFQ5aPiPu_G8Yiq1Hzg_XfVj0mw0L7gr2KNdgqS49WOqAtp8jVTqxWOQYzstBws)

  

En la tabla news user_id es la clave foránea que nos identifica qué usuario ha creado dicha noticia.

  

### Tabla Activity

  

![](https://lh6.googleusercontent.com/XGLUVJZqKCnzII9LJVEalg-mP1uXKVGqmZyprSM7wGcQCYIjFdT-DFkyFiMaqOG6Evhsg8jkrvpDc57RsUbXDe58SUw0SBYRewkTABOS49PHmC-coPnO5_kG87Wg6r7JYzFXubdU)

  

En esta tabla user_id será el que identifique el usuario apuntado en la actividad.

  

### Tabla user_activity

  

![](https://lh6.googleusercontent.com/Qnp4o0UwkgSoj7EglWV8XY1g9uBZUwNaZhl33VVrXM_j5FVZkIKOSvDiPGioewL_BTaUmo8ldE08AWEFzCPPLgf6ueWxKU7dVIwIrGXHmsuwweX7RyItLcP5-KbVZmbvnnRmOIFn)

  

Esta es la tabla mencionada anteriormente que se crea según la relación de muchos a muchos.

  

  

### Gráfico BD

  

![](https://lh3.googleusercontent.com/uVJwhJoCipNsHPUd9V1P3l3Wkz9ADD-WgLzM0I3tuj9gTROT3s3cnuayu6wfEukQkQ1eLRnGqSp5--hxVQggPVf5pqqeQcFrZYSotKdGYQR3311fMtqfVUwJ2e4CsRuSSfyqKt2O)

  

  

## Mockups

  

  

### Login

  

![](https://lh6.googleusercontent.com/Cpqh9gvUrhZXte0GZ5o4PLbYeLME7c85qHLZE0fy26jIZ4z2ssqtFERTa5gw_fcwlTpLCaEFDL-6lr7cN-cF_kVPLieYXXDDg5nNUWwPF3xlRyORR3VkPr3IbydZ-wihgBzuQWMG)

  

Nada más iniciar la aplicación el usuario se encontrará con la página de inicio de sesión donde deberá loguearse o registrarse.Dichas acciones quedan reflejadas en el siguiente diagrama de secuencia.

  

  

### Otras vistas

  

  

![](https://lh6.googleusercontent.com/JNS9lvu3PiR4JQEOIwSCPwaZonff3NZQiZtnm2vOdiCrUuHoTMYHHzOXFkZNO2yrIr24iYz6LlR3SYx-LB0FW72STX8_C-5YV8MF9eGMhDjasK4ommS2CaxiZ47x2PTvaZ7M9tNz)

  

  

### Servidor

  

#### Árbol de API

  

![](https://lh3.googleusercontent.com/8_zpAd4Ough4ofEP20vBSgksRyhypwjjtspXVIrnJqvYLUFuihGwRsz06fgNqEL8Pkc5kdFPS3P-yswMBohCsjc2zi-0aHmmgj8YUVS-Pb2ZpKXMog1EFr90RyOVuOrpa5CrmhV1)

  

### user

  

#### Modelo del user

  

![](https://lh6.googleusercontent.com/B6ge3IOqAXy8kA8F_6iO_pO7QebkdOL5p43BDPL8LgaEuxYtTFJvQH52cTVcS7sWZZxwNsSV3xRaXt4yJ6Wfat_jiV6UXDq-RFqjsLvFYZei217u3tBlsOQgXy9LOEwXrOxsMkwE)

  

Aquí definimos la estructura que se va encontrar en la base de datos que se encuentra en la siguiente ruta:

  

![](https://lh3.googleusercontent.com/jRHVxaEQSsyshMmFjJyofcnE53G57XLx0rCTEwFp6SvA3aSyKo6cDyMlxRZKCInmJkdMT9g-1I5JDzMm1iEY7WqkX8LqrTp3KqGF6IrXf9lKPaglzggEZz2lczUIKIWVh_bIrn0T) en la cual va llamando a los diferentes métodos según las llamadas realizadas.

  

  

Llamadas:

  

![](https://lh4.googleusercontent.com/GP-QYwpAYV7_nBQg3Aw_KYE2E4_JwEx48trz2oXQ6Jb_1ckM2a5AeNEvnC5ke82yZdOvLUmv3YWnx0u7c_9EXmeX3XS3u94vDPng3lQ7YHC_IKQ4P118VH4GJIRCqCxAzBoLcx38)

  

Funciones:

  

![](https://lh4.googleusercontent.com/nDCOWtucMfl9vjlCVUDT1VyUyo9NlcmHlY-iLgl-nofiImHhSdV45o3ko6VL5aNZmUqfsfjJf-_GA2d-pGaRTlrDPFpr0Hk0PyAvtrCraLrN_pUfZjvrt5tqRSGP47BFt-R3wrrf)

  

  

## Resumen

  

![](https://lh6.googleusercontent.com/CSfd9O3sEqdEz22MHjchyFpecVuf8QpTdX-TA-jTWeIz3rGyc4xQTibfKhAxdyjoLc17eSFfWy24l7M0JNynoP9ZSKgvjlK1bOboKPJcCcWYeaew-CsJs4ZX24SO3o9GZoL5bqDU)
<!--stackedit_data:
eyJoaXN0b3J5IjpbNDcwODcwOTQ2XX0=
-->
