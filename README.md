


# Proyecto Segunda Evaluación

  

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/presentacion.jpg" width="500">

  

Alejandro Santana Carreño
Bryan Jaramillo Baldeón

## Descripción

En este proyecto se va a trata la necesidad de crear un sistema genérico que permita el envío de notificaciones a todas las aplicaciones que tiene InventiaPlus actualmente en funcionamiento. Dicho sistema debe permitir la administración de administradores, aplicaciones y notificaciones. Para el envío de la notificación lo que hará nuestro proyecto es comunicarse mediante nuestra API con la API de firebase para que sea esta última quien gestione el envío de la notificación  a los diferentes dispositivos donde se encuentra una aplicación registrada.


<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/ideaGenerica.png" width="500">  


Este sería una representación simplificada de nuestro sistema donde se puede observar lo explicado. Una vez realizado nuestro boceto procedemos a desglosar todas las acciones que va a realizar nuestro usuario con el sistema con la ayuda de un **diagrama** de **caso de uso**.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/DiagramaCasoUso.png" width="500">  

Gracias a este diagrama observamos que el administrador root una vez que inicia sesión puede gestionar la notificaciones , realizar un envío de notificación y última instancia puede generar nuevos administradores los cuales pueden realizar las mismas tareas menos gestionar otros usuarios. En última instancia se observa que el usuario simplemente podrá ver la notificación en su dispositivo.

## Pila Tecnológica

  

### Bases de Datos
<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/imgBasesDatos.png" width="500"> 
### API

 <img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/imgAPI.png" width="500"> 
### Vista

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/imgVista.png" width="500"> 
  

## Proyecto

  

### Diseño base de datos

Visto el concepto de la aplicación pasamos el diseño de la misma. Primero transformaremos nuestro diagrama de caso de uso a un **diagrama de clase**.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/diagramaClases.png" width="500">

En dicho diagrama observamos que poseemos una clase  llamada **Admin** donde se encuentran los dos tipos de administradores que hay en nuestro sistema (administrador root, administrador ) y los cuales se diferencian mediante el campo discriminator. De esta última podemos destacar que existe una relación de muchos a muchos con la clase Aplications. En otra instancia vemos que poseemos la clase **User** la cual posee una relación de muchos a muchos con la clase **Aplications** . De esta relación surge una nueva clase llamada **userAplication** la cual aparte de poseer las claves foráneas que hacen referencia a las clases también guarda el **deviceToken** campo que usaremos para el funcionamiento de nuestra API con Firebase, y **so** campo que hace referencia al sistema operativo del dispositivo.

  

Una vez obtenido el el diagrama de clases pasamos a trabajar con el **diagrama de Entidad/Relación** que nos dará un diseño con el que entenderemos mejor el diseño de nuestra base de datos.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/diagramaEntidadRelacion.png" width="500">
Gracias a este diagrama nos damos cuenta del diseño que va a tener nuestra base de datos. Además nos permite ver aspectos tales como; cómo se van a tratar los diferentes campos, así mismo, vemos  se van a diferenciar el tipo de sistema operativo en la entidad userAplication mediante la variante enum, la nueva entidad que se crea de la relación de muchos a muchos entre Admin y Aplication etc.

  
  
  
  

### Creando la base de datos

Una vez documentado la estructura de nuestra base de datos procedemos a crearla. Para ello haremos uso de la herramienta phpMyAdmin donde crearemos nuestra base de datos en MySql.

  

La estructura de nuestro árbol sería tal que así:

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/arbolBaseDatos.png" width="500">

Luego pasaremos a las vistas de la estructuras de nuestras tablas

  

__Vista user__

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/vistaUserBaseDatos.png" width="500">

  

__Vista application__

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/vistaApplicationBasesDatos.png" width="500">


  

__Vista userAplication__

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/vistaUserApplicationBasesDatos.png" width="500">

__Vista Admin__

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/vistaAdmin.png" width="500">

  

__Vista adminAplicaton__

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/vistaAdminApplication.png" width="500">

  
  
  

__Vista de las relaciones__

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/vistaRelacionesBasesDatos.png" width="500">



  
### Mockups y Historia de Usuario

#### Requisitos del Sistema
 1. Creación de una notificación
 2. CRUD Empleados (administradores)
 3. CRUD Usuario
 4. CRUD Aplicaciones
 5. Autenticación para los administradores

#### Recorrido del sistema  

Como en todo sistema que se precie, se diseñan rutas para los usuarios. En este apartado del documento se da a conocer el recorrido establecido con ayuda de los mockups que nos dan una idea de la estructura que vamos a llevar a cabo para nuestro cliente web.

  

#### Caso de Administrador root

#### Primer paso : Login

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/mockupsLogin.png" width="500">
  

Esta es la vista de login a la que acceden solo los administradores para gestionar ciertas acciones de nuestro sistema por lo tanto tendrán que acreditarse mediante un login con el uso de su e-mail y contraseñas registradas en el sistema.

  
  

#### Segundo paso : Panel Home
<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/mockupsHome.png" width="500">

Una vez hecho el login el administrador accede al panel inicial donde podrá elegir las acciones que quiera ejecutar.

#### Panel de Notificación
<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/MockupsNotificaciones.png" width="500">
En el caso de querer crear una notificación el administrados al acceder al panel de notificación, se encontrará con un formulario a rellenar y una vez completado podrá efectuar el envío de la notificación.

#### Panel aplicaciones
<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/MockupsAplicaciones.png" width="500">
En el caso de entrar en el apartado de aplicaciones el administrador se encontrará con un panel donde le aparecerán todas las aplicaciones registradas las cuales podrá filtrar según sistema operativo o temática.

#### Panel de Empleados
<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/MockupsEmpleados.png" width="500">

En el apartado de empleados el administrador root podrá gestionar todos los empleados que tiene registrados. Así mismo tendrá las opciones de crear nuevos usuarios eliminarlos etc.

#### Panel de Users

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/MockupsUsuarios.png" width="500">
Luego el administrador puede también un listado de los usuarios que hay dentro de sus aplicaciones y realizar un CRUD manualmente si así lo desea.

## Relaciones dentro de NodeJs usando Sequelize

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/diagramaSequeLize.jpeg" width="500">

## Descripción del código de la API.


En cuanto al documento index.js :

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/index.png" width="500">

En este caso utilizamos consign para cargar los archivos necesarios para poder arrancar el servidor con todo lo que necesite.

El primer archivo en cargarse es config.js:

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/config.png" width="500">

En este caso definimos la configuración necesaria para que sequelize pueda conectarse a la base de datos.

En segundo lugar cargamos el archivo db.js:

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/db.png" width="500">

Aquí es donde realizamos la conección a la base de datos utilizando sequelize. En la línea 8 se se crea una instancia de sequelize con la configuración importada, la propia librería de Sequelize e inicializo un json que contendrá los modelos.

Más adelante en la línea 21 recorro los archivos de todos los modelos y los asocio con sequelize introduciendolos en el json models. Tras cargar todos los modelos ejecuto los métodos que establecerán las asociaciones entre los modelos(línea 28).

Este es un ejemplo de mapeo de la tabla ‘aplications’ con Sequelize.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/Sequelize.png" width="500">

De esta manera en la línea 4 especificamos el nombre de la tabla dentro de la base de datos a la que hará referencia el modelo. Más adelante, defino las columnas de la tabla, especificando sus características como su tipo de dato (líneas 7,11 y 15) o validaciones necesarias (líneas 13 y 18).

Por último están las asociaciones, en esta caso las aplicaciones se relacionarán con administradores y los usuarios de las aplicaciones a través de sus tablas intermedias ya que se trata de una relación de muchos a muchos usando la clave extranjera ‘aplicationID’.

El siguiente archivo que se va a cargar serán los middlewere:

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/middlewere.png" width="500">

Luego vienen las rutas, como ejemplo usaremos una ruta de las aplicaciones.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/rutaAplicaciones.png" width="500">

En este caso importo en la variable Apps el modelo de aplicaciones, en la línea 5 defino la ruta con la que se hará la petición al servidor y más adelante ejecuto el método del modelo de sequelize para realizar la búsqueda dentro de la base de datos.

Este es un ejemplo donde, además de mostrar las aplicaciones de la base de datos, se muestran los usuarios de esa aplicación:

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/ejemploUsuariosAplicacion.png" width="500">

En la línea 17 se incluye el modelo de usuarios para que se muestren también.

Por último se arranca el servidor.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/arrancandoServidor.PNG" width="500">

## Describiendo la implementación de la API REST.

En el siguiente enlace se muestran las instrucciones de todas las rutas de todas las tablas:

https://documenter.getpostman.com/view/6744581/S11GTLv6

Como ejemplo utilizare las rutas del modelo usuarios:

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/apiRest.png" width="500">

Esta ruta devolverá todos los usuarios dentro de la base de datos.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/getAUser.PNG" width="500">

Esta ruta devuelve un solo usuario usando su id, el pasado por parametro.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/apiRest(2).png" width="500">

Este es el post que debe definir un json con los parámetros necesarios y pasarlos usando un body.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/apiRest(3).png" width="500">

Este es el put, similar al post anteriormente visto, solo que en este caso hay ue indicarle la id del usuario que se quiere actualizar por parámetro en la ruta.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/apiRest(4).png" width="500">

Por último esta el delete, al que se le debe especificar la id del usuario que se deea borrar pasandola por parametro.

# Manual de Usuario

## Descripción

La finalidad de este apartado es definir de cara al usuario como trabajar con la aplicación web.
## Paso 1 : Login
Dado que solo podrán acceder a la página web los administradores que estén dados de alta en nuestro sistema el usuario deberá hacer el login adjuntando su e-mail y contraseña dados de alta.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/login.png" width="500">

Una vez introducido los datos el usuario deberá presionar sobre el botón de Login y será el propio sistema el encargado en primera estancia que los datos se ajustan a los parámetros establecidos y luego a realizar la autentificación.
## Paso 2 : Panel Home
Una vez hecho el login el usuario se encontrará con un panel donde tiene disponible diferente tipos de acciones a realizar.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/home.png" width="500">

## Paso 3 : Creando Notificación
Para crear una notificación el usuario deberá seleccionar dentro de panel azul __*View Details*__ , dicho botón le llevará al formulario de la notificación el cuál deberá rellenar para realizar el envío de la notificación.

<img src="https://ies-el-rincon.odoo.com/web/image/1457/panel1.PNG?access_token=f8b11924-d4c5-4a08-bc96-452292de8ffc">

<img src="https://ies-el-rincon.odoo.com/web/image/1459/panel2.PNG?access_token=6550074c-0771-4387-972c-9a737bf460bd">

<img src="https://ies-el-rincon.odoo.com/web/image/1461/notification.jpg?access_token=a4229d9c-ef9c-49da-905e-97ca51c1f3b5">

## Paso 4 : Accediendo al panel Usuarios
Para acceder al panel de  usuarios el administrador  deberá seleccionar dentro de panel Amarillo __*View Details*__ , dicho botón le permitirá  ver el listado de usuarios.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/home.png" width="500">

## Paso 5 : Administrando Clients
Para acceder al panel de  clients el administrador  deberá seleccionar dentro de panel Verde __*View Details*__ , dicho botón le permitirá  ver el Panel de los clientes donde aparece el listado de los clientes registrado y las diferentes opciones para administrarlos (realizar un crud).

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/home.png" width="500">

## Paso 6 : Administrando Aplicaciones
Para acceder al panel de  aplications el administrador  deberá seleccionar dentro de panel Rojo __*View Details*__ , dicho botón le permitirá  ver el Panel de las aplicaciones donde aparece el listado de las aplicaciones registradas y las diferentes opciones para administrarlas (realizar un crud).

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/home.png" width="500">

## Paso 7 : Cerrar sesión
Para salir de la sesión desde cualquier vista desde el navegador al pulsar sobre el icono de usuario nos dará la opción de Logout, al pulsar dicha opción de nos abrirá una ventana modal que nos preguntará si realmente queremos salir, si pulsamos salir; cerraremos dicha sesión.

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/cerrarSesion1.png" width="500">
<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/cerrarSesion2.png" width="500">

# Describiendo el código de la  App Web.

## FrontEnd
### Comparativa de Aplicaciones Web vs  Aplicaciones Nativas
#### *Aplicaciones Web*
Las  **aplicaciones web** son aplicaciones a las que  **se accede siempre desde un navegador**, ya sea desde un dispositivo móvil o desde un ordenador. Sólo cambia la visualización de la aplicación en función del dispositivo.

Estas aplicaciones están desarrolladas con tecnología web. Y aunque hay combinaciones muy distintas, en este caso hemos realizado el desarrollo con  **HTML, CSS y JavaScript**  además de un lenguaje de servidor que nos proporcionará acceso a base de datos, seguridad,… entre otras muchas cosas.

#### *Aplicaciones Nativas*
Las aplicaciones nativas son las aplicaciones móviles que se desarrollan **específicamente para cada sistema operativo**. Este es el desarrollo tradicional de aplicaciones móviles. En el cual es necesario conocer el lenguaje y la mecánica de desarrollo para cada uno de los sistemas operativos.

Comúnmente se desarrolla para Android y para iOs.
### *Conclusión*
#### Web
Ventajas: 
 - Sólo un desarrollo
 - No consumen espacio en el dispositivo
 - Mantenimiento Bajo
 - Minimiza el riesgo
 - Base de datos en el mismo servidor
 Desventajas:
 
 - No tiene acceso directo desde el dispositivo
 - Requieren siempre de internet
 - Consumen más datos móviles
 - No hay notificaciones PUSH
 
#### Nativo
 Ventajas:
 - Posee acceso dorecto desde el dispositivo
 - Optimizan el rendimiento del móvil
 - Posee Notificaciones PUSH
 - Accesible Offline*
 Desventajas:
 - Desarrollos independientes para cada plataforma (Gran Coste Económico)
 - Mantenimiento Alto
 - Consumen espacio en el dispositivo
 - Problemas con la versión de los sistemas operativos

## BackEnd
### Node JS vs Java/ Spring

  

#### Node Js

  

Node.js es un entorno en tiempo de ejecución múltiplataforma, de código abierto, para la capa del servidor (pero no limitándose a ello). Fue creado con el enfoque de ser útil en la creación de programas de red altamente escalables, como por ejemplo, servidores web.

  
  
  
  
  

El lenguaje de este entorno es javaScript que está presente en algunos elementos de prácticamente todos los sitios web-, por lo que el proceso de aprendizaje será veloz. Resulta especialmente útil para webs dinámicas que soportan grandes cantidades de tráfico en tiempo real, convirtiéndose en el lenguaje del futuro para las apps que se vienen.

  

### Java / Spring

Spring es un framework para el desarrollo de aplicaciones y contenedor de inversión de control, de código abierto para la plataforma Java. el lenguaje que emplea no es otro que Java por lo que le confiere gran solidez dada la cantidad de años que lleva en el rubro lo dotan de controladores, depuradores y otras herramientas que integran el lenguaje para cubrir todas las patas de la tarea que desempeña un programador. Su antigüedad es sinónimo de solidez aunque la complejización de sus recursos repercute sobre sus funciones: es cada vez más difícil aprender a implementarlo.

  

### Conclusión

Los dos son viables en las áreas de ingeniería, aunque cada uno posee sus particularidades que lo hacen más propicio para una u otra situación. Java es más apropiado si estás construyendo un sistema en tiempo real porque actúa más rápido, pero ten en cuenta que su abanico de posibilidades implica dificultades a la hora de interiorizarse con su funcionamiento. Es estático – por tanto menos factible en webs dinámicas- y la complejidad de su sintaxis requiere horas de estudio.

  

Por otra parte, Node.js resuelve problemas de sincronización mucho más rápido porque trabaja sin hilos, es decir que no se vale de subprocesos para ejecutar una tarea sino que directamente apela a una única línea de trabajo: prioriza las tareas y las pone en cola. Perfecto para principiantes, sitios web dinámicos de empresas tecnológicas o de comunicación o aquellas que necesiten soportar miles de usuarios navegando al mismo tiempo.

# Línea de Tiempo

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/Línea de tiempo Pryecto.png" width="500">

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/Línea de tiempo Pryecto (1).png" width="500">

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/Línea de tiempo Pryecto (2).png" width="500">

<img src="https://raw.github.com/alejandroasc96/documentacion2Proyecto/master/imgDoc2Eva/Línea de tiempo Pryecto(3).png" width="500">


<!--stackedit_data:
eyJoaXN0b3J5IjpbMTkzNjc0MTU0NCwyMTU0MDIwNTAsMTA0ND
k3ODQ1LC0yNjY4NDQ4NywtMTY5NzU3MjIxMF19
-->
