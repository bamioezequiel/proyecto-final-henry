Variables de entorno: 
DB= "Nombre de la DB" 
DB_USER= "Usuario de Postgres" 
DB_PASSWORD= "Pass de Postgres" 
DB_HOST= "(por defecto es 'localhost')" 
DB_DIALECT= "(por defecto es 'postgres')" 
PORT= "(por defecto es '3001')"

Usuarios de prueba que se encuentran en la database y en Auth0 para pruebas en front: Solo se debe entrar en la pagina desde front, ingresando el correo y la contraseña de cualquiera que de los dos usuarios. El primero es administrador, el segundo es cliente.
```json
    {
        "first_name": "Administrador",
        "last_name": "Prueba",
        "email": "sadyirapruebaad@gmail.com",
        "password" : "Inventado123",
        "phone": "310-214-9951",
        "address_line1": "6 Brentwood Place",
        "address_line2": "null",
        "city": "Los Angeles",
        "state": "California",
        "postal_code": "90045",
        "country": "United States",
        "is_admin": "true",
        "photo": "http://dummyimage.com/162x100.png/5fa2dd/ffffff",
        "created_date": "2022-07-28 22:41:18",
        "update_date": "2022-08-01 18:41:15",
        "destroyTime": "null"
    },
    {
        "first_name": "Cliente",
        "last_name": "Prueba",
        "email": "sadyirapruebacl@gmail.com",
        "password" : "Inventado123",
        "phone": "310-214-9951",
        "address_line1": "6 Brentwood Place",
        "address_line2": "null",
        "city": "Los Angeles",
        "state": "California",
        "postal_code": "90045",
        "country": "United States",
        "is_admin": "false",
        "photo": "http://dummyimage.com/162x100.png/5fa2dd/ffffff",
        "created_date": "2022-07-28 22:41:18",
        "update_date": "2022-08-01 18:41:15",
        "destroyTime": "null"
    },
    ```

RUTAS DISPONIBLES:

- *GET **"/packages/:limitRender"** => array de paquetes*

Varibles que puede recibir (a excepcion de params, son todas opcioneles).
propiedad duration habilitada.

```js
// Incluye paginado, renderizado personalisable y opciones de filtros y odenamientos solapables.

const { limitRender } = req.params;
// controla cuantos paquetes trae por pagina.
// en caso de no ser número, por defecto se setea en 12.
const { page, priceSort, durationSort, type, region, destination, dateMin, dateMax, available } = req.query; 
// "priceSort" y "durationSort" esperan (asc: para orden ascendente y desc: para orden descendente).
// "type", "region" y"destination" son sensibles a mayúscula o minúscula (además de las tildes). La busqueda debe ser LITERAL.
// "dateMin" y "dateMax" forman el rango de busqueda para "start_date" (son string en formato fecha americana: "yyyy-mm-dd").
// "available" espera true (para paquetes en stock) o false (para paquetes fuera de stock). Por defecto trae ambos.
const { priceFilterMin, priceFilterMax, durationFilterMin, durationFilterMax } = req.body;
// son pares que forman un rango de busqueda (en los dos casos son números enteros).
```

```json
[
  {
    "id": 1,
    "name": "Nombre",
    "description": "Descripción.",
    "main_image": "https://demos.maperez.es/pfhenry/rutaAustralMain.jpg",
    "images": [
      "https://demos.maperez.es/pfhenry/rutaAustral1.jpg",
      "https://demos.maperez.es/pfhenry/rutaAustral2.jpg",
      "https://demos.maperez.es/pfhenry/rutaAustral3.jpg"
    ],
    "price": 4000,
    "start_date": "2022-08-27",
    "end_date": "2022-09-17",
    "seasson": "Invierno",
    "type": "Pack Large",
    "featured": true,
    "available": true,
    "on_sale": 0,
    "destinations": [
      {
        "name": "Argentina",
        "region": "Sudamérica"
      }
    ],
    "activities": [
      {
        "name": "Tour de Museos",
        "price": 150
      }
    ]
  }
]
```
- *POST **"/user"** => Verifica si el usuario ingresado por el pop(Auth0) es nuevo (se esta registrando) o si ya existe (se esta logeando), en base a eso lo guarda en la Database local con el rol default de client (si es nuevo) o identifica su rol si se esta logeando. Esta ruta responde con un array de dos posiciones ['accion', 'rol'], el primer elemento es un string que indica register o login, si es nuevo usuario saldra 'register' indicando que si bien ya esta registrado, debería brindar información adicional (ver modelo user), de lo contrario saldra 'login', indicando que esto no es necesario. El segundo campo muestra el rol, Admin o Client, que es siempre Client si el primer elemento es register.
IMPORTANTE: No probar esta ruta en postman, solo con el login del front ¿Por qué? porque para crear el usuario se esta requiriendo info de Auth0, por lo que se necesita primero que Auth0 verifique al usuario. Esto ya esta conectado (ver component UserPopOut, la función handleLogin, ver actions createUser)

- *GET **"/users"** => para modificar "available", "featured" y "on_sale"*

recibe por query props. opcionales:
```js
	const { limitRender, page, destroyTime, is_admin } = req.query;
  // "limitRender" y "page" controlan la cantidad de usuarios renderizados y la pagina respectivamente.
  // "destroyTime" puede recibir "active" para filtrar por usuarios activos, "deleted" para borrados, una fecha para filtrar los eliminados desde entonces (por defecto devuelve todos los casos)
  // "is_admin" recibe un true o false para filtrar la lista (en caso contrario devuelve ambos tipos de usuarios)
```

respuesta:
```json

```

- *GET **"/user/:id"** => para traer detalles de un usuario (pensado como pensado usuario)*

incluye el deslose de ordenes de compra del usuario

respuesta:

```json
{
  "full_name": "Administrador Prueba",
  "id": 2,
  "first_name": "Administrador",
  "last_name": "Prueba",
  "nickname": null,
  "email": "inventado1234sadyira@gmail.com",
  "phone": "310-214-9951",
  "city": "Los Angeles",
  "state": "California",
  "postal_code": "90045",
  "photo": "http://dummyimage.com/162x100.png/5fa2dd/ffffff",
  "orders": [
    {
      "id": 5,
      "date": "2022-09-11",
      "total_order": "5082.7",
      "status": "pending",
      "packages": [
        {
          "duration": 10,
          "name": "Triangulo monumental 10 días desde Barcelona",
          "description": "descripción.",
          "main_image": "https://demos.maperez.es/pfhenry/Triangulo%20monumental%2010%20días%20desde%20Barcelona%20-%20main.jpg",
          "start_date": "2022-11-10",
          "end_date": "2022-11-20",
          "seasson": "Otoño",
          "type": "Multidestino",
          "featured": false,
          "on_sale": 0,
          "order_item": {
            "quantity": 2,
            "orderId": 5,
            "packageId": 14
          }
        }
      ]
    },
    {/* ... */},
    {/* ... */},
    /* ... */
  ]
}
```

- *GET **"/user/status/:id"** => para verificar si un usuario es admin o no*

incluye propiedad "includeDeleted" por query (opcional) para realizar peticiones o no a usuarios eliminados

respuesta:

```json
{
  "email": "oekkel0@tuttocitta.it",
  "is_admin": false
}
```

- *GET **"/packages/orderQuantity/:id"** => para traer la cantidad de total ordenes de un paquete "orderQuantity" (tiene el id del paquete)*

respuesta:

```json
{
  "id": 3,
  "orderQuantity": 5
}
```

- *PATCH **"/packages/:id"** => para modificar "available", "featured" y "on_sale"*

Los input por body son opcionales (para mayor flexibilidad al cambiar uno o varios).

```js
const id = req.params.id;
const { featured, available, on_sale } = req.body;
// "featured" y "available" son BOOLEAN. 
// "on_sale" es INTEGER.
```

- *GET **"/packages/featured"** = array con paquetes destacados, 3 por defecto, la ruta se puede modificar con un query: "/packages/featured?limit=Numero"*

- *GET **"/types"** = array con los tipos de Packages*

- *GET **"/on_sale"** => array de 3 paquetes aleatorios con la propiedad 'on_sale' > 0 (paquetes con descuentos)*

- *GET **"/destinations"** = array con los destinos*

- *GET **"/activities"** = array con actividades*


- *GET **"/classifications"** = array con clasificaciones*


- *GET **"/packages/:id"** = array con el detalle de un paquete y paquetes recomendados (ver abajo)*

post "/packages" = crea paquetes, actividades, destinos y clasificaciones. Tambien acepta todos estos datos preexistentes.

post "/activities" = crea actividades.
IMPORTANTE: Al crear por separado elegir clasifación preexistente
```json
{
  "name": "jsalkdija",
  "description": "hjjbkhbjhbj",
  "image": "https://demos.maperez.es/pfhenry/Tour%20de%20Highlights.jpg",
  "price": 100,
  "classification": "Familiar"
}
```

post "/classification" = crea clasificaciones.
```json
{
  "name": "jsalkdija",
  "image": "https://demos.maperez.es/pfhenry/Tour%20de%20Highlights.jpg"
}
```
post "/destinations" = crea destinos.
```json
{
  "name": "jsalkdija",
  "image": "https://demos.maperez.es/pfhenry/Tour%20de%20Highlights.jpg",
  "region": "Europa Occidental"
}
```
put "/packages/id" = puede modificar todas las propiedades de un paquete, con caracteristicas preexistentes o nuevas, si no cambia un atributo, dejar el valor previo. Si se modifica un destino/clasificacion o actividad creando una nueva, esa se guardara para poder ser asignada posteriormente.

put "/destinations/id"

put "/activities/id"

put "/classifications/id"

Get activities: Se ejecuta en la ruta '/activities', se obtiene un objeto con la siguiente estructura:, un array de objetos, en el que cada objeto cuenta con las propiedades: id, name, image, description, price, classificationId, y classification, que a su vez tendra un objeto con el "name" de la clasificación. [ {"id":1, "name":"Tour de Monumentos", "description":"Hola soy una actividad", "image":"https://demos.maperez.es/pfhenry/Tour%20de%20Monumentos.jpg", "price":100, "classificationId":1, "classification":{"name":"Familiar"} }, {"id":3, "name":"Tour de Highlights", "description":"Hola soy una actividad", "image":"https://demos.maperez.es/pfhenry/Tour%20de%20Highlights.jpg", "price":100, "classificationId":1, "classification":{"name":"Familiar"} }, {"id":5, "name":"Tour Gastronomía Nacional", "description":"Hola soy una actividad", "image":"https://demos.maperez.es/pfhenry/Tour%20Gastronomía%20Nacional.jpg", "price":150, "classificationId":1, "classification":{"name":"Familiar"} }]
- *GET **"/deletedPackages"** = retorna un arreglo con los paquetes "Borrados" o en caso de no existir ningun paquete borrado retorna 'No deleted packages found'*

- *DELETE **"/packages"** = ¡¡RECIBE UN 'id' por query (/packages?id=n)!! Borra un paquete y retorna un mensaje 'Package deleted successfully' o en caso de que el paquete que se intente borrar ya haya sido borrado retorna un mensaje 'The package was already deleted'*

GET activities: Se ejecuta en la ruta '/activities', se obtiene un objeto con la siguiente estructura:, un array de objetos, en el que cada objeto cuenta con las propiedades: id, name, image, description, price, classificationId, y classification, que a su vez tendra un objeto con el "name" de la clasificación. [ {"id":1, "name":"Tour de Monumentos", "description":"Hola soy una actividad", "image":"https://demos.maperez.es/pfhenry/Tour%20de%20Monumentos.jpg", "price":100, "classificationId":1, "classification":{"name":"Familiar"} }, {"id":3, "name":"Tour de Highlights", "description":"Hola soy una actividad", "image":"https://demos.maperez.es/pfhenry/Tour%20de%20Highlights.jpg", "price":100, "classificationId":1, "classification":{"name":"Familiar"} }, {"id":5, "name":"Tour Gastronomía Nacional", "description":"Hola soy una actividad", "image":"https://demos.maperez.es/pfhenry/Tour%20Gastronomía%20Nacional.jpg", "price":150, "classificationId":1, "classification":{"name":"Familiar"} }]
>>>>>>> develop

GET Detalle y Get Recomendados, se ejecuetan ambos en la ruta '/packages/:id', se obtiene un array con DOS (2) elementos, en los cuales el primer elemento es el paquete requerido por ID (DETALLE), y el segundo elemento es un array con TRES (3) objetos, en el que cada objeto es un paquete recomendado con relación al paquete mostrado en detalle.

post "/packages" = Este post crea simultaneamente nuevos, paquetes, destinos, clasificaciones y actividades. Es decir, recibe un paquete con todos sus atributos y los crea respectivamente.
IMPORTANTE: La estructura en la que deben enviar el paquete por body, la cual se expresa acontinuación.

Post Paquete/actividad/clasificación/destino:
La estructura en la que deben enviar los datos es un objeto con todas las propiedades del paquete (name, type, etc), teniendo en cuenta que la propiedad destino es un array de objetos, cada objeto del array con las propiedades (name, image). La propiedad activities que es un array de objetos, cada objeto con las propiedades de la actividad (name, description, price, etc), teniendo en cuenta que la propiedad classification es un objeto con las propiedades (name, image).

```JSON
{
"name": "Japón, Corea del Sur y China, un viaje al antiguo oriente",
"price": 3000,
"description": "¿Alguna vez has soñado vivir en la epoca de los samurai?, ¿Conocer la dinastía Qing? ¿Visitar los palacios cerrados de la antigua Corea? Este paquete de viajes es para los amantes de la antigua Asia, y quieren recorrer sus lugares emblematicos.",
"main_image": "https://dam.ngenespanol.com/wp-content/uploads/2019/09/seul.png",
"images": [
"https://viajes.nationalgeographic.com.es/medio/2021/12/23/hanok_ebee1373_1254x837.jpg",
"https://seri.tucuman.gob.ar/wp-content/uploads/2022/05/corea-del-sur.jpg",
"https://demos.maperez.es/pfhenry/Ghibli_museum_sign.jpg"
],
"featured": false,
"destinations": [{"name":"China",
"image": "https://www.collinsdictionary.com/images/full/tajikistan_433199395_1000.jpg"
}, {"name":"Corea del Sur","image": "https://demos.maperez.es/pfhenry/main.jpg"},
{"name":"Japón",
"image": "https://www.collinsdictionary.com/images/full/tajikistan_433199395_1000.jpg"
}],
"start_date": "2022-10-09",
"end_date": "2022-10-12",
"available": true,
"on_sale": 0,
"region": "Asia Oriental",
"seasson": "Otoño",
"type": "Pack Short",
"activities": [{"name": "Tour de Highlights",
"description": "Hola soy una actividad",
"price": "100",
"image": "https://demos.maperez.es/pfhenry/Tour%20de%20Highlights.jpg",
"classification": {"name":"Familiar",
"image": "https://demos.maperez.es/pfhenry/Familiar.png"}
},{"name": "Visitar Estrellas",
"description": "Tour con estrellas de cine",
"price": "300",
"image": "https://demos.maperez.es/pfhenry/Tour%20de%20Highlights.jpg",
"classification": {"name":"Nichos",
"image": "https://www.pngitem.com/pimgs/m/411-4110616_spirited-away-hd-png-download.png"
}}]}
```

Get featured: Se ejecuta en la ruta /, se obtiene un array de objetos, estos objetos son paquetes cuya propiedad 'featured' es true.
[
{
"id": 2,
"name": "Grecia imprescindible 6 días desde Atenas",
"description": "Viaje a Grecia para conocer de la mano de expertos guías en español lo mejor de la mítica Hellas, cuna de la civilización occidental. Visitamos Atenas, la capital de Grecia, emblema universal del mundo clásico, con sus monumentos, grandes templos y majestuosas edificaciones: el Estadio Panatenaico o la Roca Sagrada del Acrópolis. Conocemos también el Teatro de Epidauro, la acrópolis de Micenas, la legendaria Olimpia o Delfos, considerado el centro del mundo por los antiguos griegos.",
"main_image": "https://demos.maperez.es/pfhenry/Grecia%20imprescindible%206%20días%20desde%20Atenas%20-%20main.jpg",
"images": [
"https://demos.maperez.es/pfhenry/Grecia%20imprescindible%206%20días%20desde%20Atenas%20-%201.jpg",
"https://demos.maperez.es/pfhenry/Grecia%20imprescindible%206%20días%20desde%20Atenas%20-%202.jpg",
"https://demos.maperez.es/pfhenry/Grecia%20imprescindible%206%20días%20desde%20Atenas%20-%203.jpg"
],
"price": 1000,
"start_date": "2022-08-15",
"end_date": "2022-08-21",
"region": "Europa Central",
"seasson": "Verano",
"type": "Pack Short",
"featured": true,
"available": true,
"on_sale": 15,
"activities": [
{
"name": "Tour de Highlights",
"classification": {
"name": "Familiar"
},
"Package_Activity": {
"createdAt": "2022-07-24T13:50:24.391Z",
"updatedAt": "2022-07-24T13:50:24.391Z",
"packageId": 2,
"activityId": 1
}
},
{
"name": "Tour de Museos",
"classification": {
"name": "Familiar"
},
"Package_Activity": {
"createdAt": "2022-07-24T13:50:25.233Z",
"updatedAt": "2022-07-24T13:50:25.233Z",
"packageId": 2,
"activityId": 2
}
}
],
"destinations": [
{
"name": "Grecia",
"Package_Destination": {
"createdAt": "2022-07-24T13:50:23.443Z",
"updatedAt": "2022-07-24T13:50:23.443Z",
"packageId": 2,
"destinationId": 9
}
}
]
},

Get activities: Se ejecuta en la ruta '/activities', se obtiene un objeto con la siguiente estructura:, un array de objetos, en el que cada objeto cuenta con las propiedades: id, name, image, description, price, classificationId, y classification, que a su vez tendra un objeto con el "name" de la clasificación.

[

    {"id":1,
    "name":"Tour de Monumentos",
    "description":"Hola soy una actividad",
    "image":"https://demos.maperez.es/pfhenry/Tour%20de%20Monumentos.jpg",
    "price":100,
    "classificationId":1,
    "classification":{"name":"Familiar"}
    },
    {"id":3,
    "name":"Tour de Highlights",
    "description":"Hola soy una actividad",
    "image":"https://demos.maperez.es/pfhenry/Tour%20de%20Highlights.jpg",
    "price":100,
    "classificationId":1,
    "classification":{"name":"Familiar"}
    },
    {"id":5,
    "name":"Tour Gastronomía Nacional",
    "description":"Hola soy una actividad",
    "image":"https://demos.maperez.es/pfhenry/Tour%20Gastronomía%20Nacional.jpg",
    "price":150,
    "classificationId":1,
    "classification":{"name":"Familiar"}
    }]

    GET Detalle y Get Recomendados, se ejecuetan ambos en la ruta '/packages/:id', se obtiene un array con DOS (2) elementos, en los cuales el primer elemento es el paquete requerido por ID (DETALLE), y el segundo elemento es un array con TRES (3) objetos, en el que cada objeto es un paquete recomendado con relación al paquete mostrado en detalle.

```json
[
  {
    "id": 2,
    "name": "Joyas de Transilvania 8 días desde Bucarest",
    "description": "Viaje a Europa del Este para visitar Rumanía, un país mágico, que combina su pasado histórico con leyendas míticas y un paisaje abrumador. Salimos desde Bucarest, una de las ciudades más grandes de Europa para cruzar los Cárpatos y adentrarnos en la mágica Transilvania, tierra de castillos medievales y palacios reales, en busca del Conde Drácula, el habitante más famoso de Transilvania.",
    "main_image": "https://demos.maperez.es/pfhenry/Joyas%20de%20Transilvania%208%20días%20desde%20Bucarest%20-%20main.jpg",
    "images": [
      "https://demos.maperez.es/pfhenry/Joyas%20de%20Transilvania%208%20días%20desde%20Bucarest%20-%201.jpg",
      "https://demos.maperez.es/pfhenry/Joyas%20de%20Transilvania%208%20días%20desde%20Bucarest%20-%202.jpg",
      "https://demos.maperez.es/pfhenry/Joyas%20de%20Transilvania%208%20días%20desde%20Bucarest%20-%203.jpg"
    ],
    "price": 1000,
    "start_date": "2022-08-15",
    "end_date": "2022-08-23",
    "region": "Europa Oriental",
    "seasson": "Verano",
    "type": "Pack Large",
    "featured": false,
    "available": true,
    "on_sale": 10,
    "activities": [
      {
        "name": "Tour de Highlights",
        "price": 100,
        "description": "Hola soy una actividad",
        "image": "https://demos.maperez.es/pfhenry/Tour%20de%20Highlights.jpg",
        "classification": {
          "name": "Familiar",
          "image": "https://demos.maperez.es/pfhenry/Familiar.png"
        },
        "Package_Activity": {
          "createdAt": "2022-07-25T00:17:50.487Z",
          "updatedAt": "2022-07-25T00:17:50.487Z",
          "packageId": 2,
          "activityId": 2
        }
      },
      {
        "name": "Tour de Museos",
        "price": 150,
        "description": "Hola soy una actividad",
        "image": "https://demos.maperez.es/pfhenry/Tour%20de%20Museos.jpg",
        "classification": {
          "name": "Familiar",
          "image": "https://demos.maperez.es/pfhenry/Familiar.png"
        },
        "Package_Activity": {
          "createdAt": "2022-07-25T00:17:51.942Z",
          "updatedAt": "2022-07-25T00:17:51.942Z",
          "packageId": 2,
          "activityId": 1
        }
      }
    ],
    "destinations": [
      {
        "name": "Rumania",
        "image": "https://demos.maperez.es/pfhenry/Joyas%20de%20Transilvania%208%20días%20desde%20Bucarest%20-%20main.jpg",
        "Package_Destination": {
          "createdAt": "2022-07-25T00:17:48.807Z",
          "updatedAt": "2022-07-25T00:17:48.807Z",
          "packageId": 2,
          "destinationId": 10
        }
      }
    ]
  },
  [
    {
      "id": 4,
      "name": "Joyas de Rusia Imperial en tren 8 días de Moscú a San Petersburgo",
      "description": "Viaje a Europa del Este para visitar lo mejor de Rusia Imperial: Moscú, la capital de Rusia, para conocer, entre otros, la famosa Plaza Roja, el Kremlin o la hermosa Catedral de San Basilio, conocida por sus coloridas cúpulas con forma de cebolla y San Petersburgo, considerada una de las ciudades más bellas del mundo, con el Museo del Hermitage, la Avenida Nevsky o la Fortaleza de Pedro y Pablo.",
      "main_image": "https://demos.maperez.es/pfhenry/Joyas%20de%20Rusia%20Imperial%20en%20tren%208%20días%20de%20Moscú%20a%20San%20Petersburgo%20-%20main.jpg",
      "images": [
        "https://demos.maperez.es/pfhenry/Joyas%20de%20Rusia%20Imperial%20en%20tren%208%20días%20de%20Moscú%20a%20San%20Petersburgo%20-%201.jpg",
        "https://demos.maperez.es/pfhenry/Joyas%20de%20Rusia%20Imperial%20en%20tren%208%20días%20de%20Moscú%20a%20San%20Petersburgo%20-%202.jpg",
        "https://demos.maperez.es/pfhenry/Joyas%20de%20Rusia%20Imperial%20en%20tren%208%20días%20de%20Moscú%20a%20San%20Petersburgo%20-%203.jpg"
      ],
      "price": 1010,
      "start_date": "2022-08-15",
      "end_date": "2022-08-23",
      "region": "Europa Oriental",
      "seasson": "Verano",
      "type": "Pack Large",
      "featured": false,
      "available": true,
      "on_sale": 10
    },
    {
      "id": 5,
      "name": "Joyas de Rusia Imperial en tren 8 días de San Petersburgo a Moscú",
      "description": "Viaje a Europa del Este para visitar lo mejor de Rusia Imperial: San Petersburgo, considerada una de las ciudades más bellas del mundo, con el Museo del Hermitage, la Avenida Nevsky o la Fortaleza de Pedro y Pablo, y Moscú, la capital de Rusia, para conocer, entre otros, la famosa Plaza Roja, el Kremlin o la hermosa Catedral de San Basilio, conocida por sus coloridas cúpulas con forma de cebolla.",
      "main_image": "https://demos.maperez.es/pfhenry/Joyas%20de%20Rusia%20Imperial%20en%20tren%208%20días%20de%20San%20Petersburgo%20a%20Moscú%20-%20main.jpg",
      "images": [
        "https://demos.maperez.es/pfhenry/Joyas%20de%20Rusia%20Imperial%20en%20tren%208%20días%20de%20San%20Petersburgo%20a%20Moscú%20-%201.jpg",
        "https://demos.maperez.es/pfhenry/Joyas%20de%20Rusia%20Imperial%20en%20tren%208%20días%20de%20San%20Petersburgo%20a%20Moscú%20-%202.jpg",
        "https://demos.maperez.es/pfhenry/Joyas%20de%20Rusia%20Imperial%20en%20tren%208%20días%20de%20San%20Petersburgo%20a%20Moscú%20-%203.jpg"
      ],
      "price": 1010,
      "start_date": "2022-09-20",
      "end_date": "2022-09-28",
      "region": "Europa Oriental",
      "seasson": "Otoño",
      "type": "Pack Large",
      "featured": false,
      "available": true,
      "on_sale": 10
    },
    {
      "id": 16,
      "name": "Europa del Este 10 días desde Berlín",
      "description": "Viajamos desde la capital de Alemania hasta Europa del Este para descubrir una región cargada de historia y salpicada de ciudades monumentales y paisajes abrumadores. Visitamos Berlín, una ciudad con personalidad, inmersa en historia y también Dresde, con su excepcional patrimonio arquitectónico y artístico. Seguimos hacia la vecina República Checa para visitar Praga. Continuamos hasta Budapest la perla del Danubio y regresamos vía Polonia hasta Alemania.",
      "main_image": "https://demos.maperez.es/pfhenry/Europa%20del%20Este%2010%20días%20desde%20Berlín%20-%20main.jpg",
      "images": [
        "https://demos.maperez.es/pfhenry/Europa%20del%20Este%2010%20días%20desde%20Berlín%20-%201.jpg",
        "https://demos.maperez.es/pfhenry/Europa%20del%20Este%2010%20días%20desde%20Berlín%20-%202.jpg",
        "https://demos.maperez.es/pfhenry/Europa%20del%20Este%2010%20días%20desde%20Berlín%20-%203.jpg"
      ],
      "price": 1075,
      "start_date": "2022-10-15",
      "end_date": "2022-10-25",
      "region": "Europa Oriental",
      "seasson": "Otoño",
      "type": "Multidestino",
      "featured": false,
      "available": true,
      "on_sale": 0
    }
  ]
]
```

GET packages (ordenamiento por precio, default los muestra por precio descendiente), se encuentra en la ruta '/packages', para ordenar ascendente el precio '/packages?price=ASC', para ordenar descendente el precio '/packages?price=DESC'. Devuelve un array con todos los paquetes, cada paquete posee la estructura siguiente:
{
"id": 1,
"name": "Grecia Peninsular 7 días desde Atenas",
"description": "Viaje de 7 días por la región continental de Grecia con guías en español. Salimos hacia la región de Tesalia en el norte de Grecia, para visitar los Monasterios de Meteora. El siguiente destino es Delfos, sede del oráculo más importante de la antigüedad. Continuamos con la visita de la mítica Atenas, emblema universal del mundo clásico. Continuamos dirección sur por el Peloponeso para conocer Corinto, Micenas, luego Olimpia, cuna de los Juegos Olímpicos y el espléndido Teatro de Epidauro.",
"main_image": "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%20main.jpg",
"images": [
"https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%201.jpg",
"https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%202.jpg",
"https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%203.jpg"
],
"price": 1000,
"start_date": "2022-08-15",
"end_date": "2022-08-22",
"region": "Europa Central",
"seasson": "Verano",
"type": "Pack Large",
"featured": false,
"available": true,
"on_sale": 10,
"activities": [
{
"name": "Tour de Highlights",
"classification": {
"name": "Familiar"
},
"Package_Activity": {
"createdAt": "2022-07-24T13:00:50.887Z",
"updatedAt": "2022-07-24T13:00:50.887Z",
"packageId": 1,
"activityId": 1
}
},
{
"name": "Tour de Museos",
"classification": {
"name": "Familiar"
},
"Package_Activity": {
"createdAt": "2022-07-24T13:00:52.342Z",
"updatedAt": "2022-07-24T13:00:52.342Z",
"packageId": 1,
"activityId": 3
}
}
],
"destinations": [
{
"name": "Grecia",
"Package_Destination": {
"createdAt": "2022-07-24T13:00:50.008Z",
"updatedAt": "2022-07-24T13:00:50.008Z",
"packageId": 1,
"destinationId": 8
}
}
]
},

GET packages (ordenamiento por precio, default los muestra por precio descendiente), se encuentra en la ruta '/packages', para ordenar ascendente el precio '/packages?price=ASC', para ordenar descendente el precio '/packages?price=DESC'.

Devuelve un array con todos los paquetes, cada paquete posee la estructura siguiente: { "id": 1, "name": "Grecia Peninsular 7 días desde Atenas", "description": "Viaje de 7 días por la región continental de Grecia con guías en español. Salimos hacia la región de Tesalia en el norte de Grecia, para visitar los Monasterios de Meteora. El siguiente destino es Delfos, sede del oráculo más importante de la antigüedad. Continuamos con la visita de la mítica Atenas, emblema universal del mundo clásico. Continuamos dirección sur por el Peloponeso para conocer Corinto, Micenas, luego Olimpia, cuna de los Juegos Olímpicos y el espléndido Teatro de Epidauro.", "main_image": "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%20main.jpg", "images": [ "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%201.jpg", "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%202.jpg", "https://demos.maperez.es/pfhenry/Grecia%20Peninsular%207%20días%20desde%20Atenas%20-%203.jpg" ], "price": 1000, "start_date": "2022-08-15", "end_date": "2022-08-22", "region": "Europa Central", "seasson": "Verano", "type": "Pack Large", "featured": false, "available": true, "on_sale": 10, "activities": [ { "name": "Tour de Highlights", "classification": { "name": "Familiar" }, "Package_Activity": { "createdAt": "2022-07-24T13:00:50.887Z", "updatedAt": "2022-07-24T13:00:50.887Z", "packageId": 1, "activityId": 1 } }, { "name": "Tour de Museos", "classification": { "name": "Familiar" }, "Package_Activity": { "createdAt": "2022-07-24T13:00:52.342Z", "updatedAt": "2022-07-24T13:00:52.342Z", "packageId": 1, "activityId": 3 } } ], "destinations": [ { "name": "Grecia", "Package_Destination": { "createdAt": "2022-07-24T13:00:50.008Z", "updatedAt": "2022-07-24T13:00:50.008Z", "packageId": 1, "destinationId": 8 } } ] },

- *GET **'/deletedUsers'** = Devuelve un arreglo con los usuarios que fueron 'eliminados' *

- *PATCH **'/restoreUser/:id'** = Restaura el usuario indicado mediante el 'id' *

- *PUT **'/user/:id'** = Actualiza propiedades del usuario indicado mediante el 'id'
  ```json
  {
    "first_name": "Olia",
    "last_name": "Ekkel",
    "nickname": null,
    "email": "oekkel0@tuttocitta.it",
    "phone": "310-214-9951",
    "city": "Los Angeles",
    "state": "California",
    "postal_code": "90045",
    "photo": "http://dummyimage.com/162x100.png/5fa2dd/ffffff"
  }
  ```
  En el Json de arriba se muestran todas las propiedades que pueden modificarse (ASI ES COMO DEBEN ENVIAR LA INFO DESDE EL FRONT).*

- *PATCH **'/user/:id'** = Actualiza la propiedad 'is_admin 'del usuario indicado mediante el 'id'
  ```json
  {
	  "is_admin": true
	}
  ```
  En el Json de arriba se muestra la forma en que se debe enviar la info desde el FRONT.
 *

- *DELETE **'/user/:id'** = Elimina el usuario indicado mediante el 'id' *

- *POST **'/favourites/:id'** = Añade un paquete a los favoritos de un usuario.
  Cómo uso esta ruta? --> Es necesario enviar el 'id' del packete en el endPoint (/user/'idPackete'). Tambien es necesario que envien en el token del usuario mediante 'headers' --> Ejemplo con sintaxis diferente a la usada en el bootcamp: 
  ```js
  axios({
    method: '', // <--- aqui insertan el tipo de peticion 'get', 'delete', 'post', 'patch'
    url: '', // <--- aqui la url: /favourites/${idDelPackete}
    data: {}, // <--- aqui envian la info por body
    headers: {'authorization': `Bearer ${token}`} //<--- aqui es donde envian la info por header y debeser enviadade esa forma ({'authorization': `Bearer ${token}`})
    //Esta exlicacion se debe a que en la peticiones de tipo post/put/patch puede ocurrir una confucion y en vez de enviar el token por 'headers' la envien por body y asi explota todo.
  })
  ```
- *GET **'/favourites'** = retorna un array con todos los packetes favoritos de un usuario.
  Cómo uso esta ruta? --> Es necesario enviar el token del usuario mediante 'headers' --> Ejemplo:
  ```js
  //FORMA 1
  axios.get('/favourites', {headers: {'authorization': `Bearer ${token}`}})
  //FORMA 2
  axios({
    method: '',
    url: '',
    headers: {'authorization': `Bearer ${token}`}
  })
  ```
*
- * DELETE **'/favourites/:id'** = Elimina de favoritos el packete indicado mediante el 'id'.
  Cómo uso esta ruta? --> ¡¡VER EJEMPLO DE LA RUTA DE POST '/favourites/:id'!!
*
- * POST **'/rating/:id'** = Agrega rating a un paquete. Para usar esta ruta es necesario enviar el id del paquete y el rating mediante query! --> Ejemplo (/rating/3?rating=5)
*
- * GET **'/rating/:id'** = Devuelve el rating de un paquete. Para usar esta ruta es necesario enviar el id del paquete.
*
- * DELETE **/rating/:id** = Elimina el rating de un paquete. Para usar esta ruta es necesario enviar el id del paquete.
*