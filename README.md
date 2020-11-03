## courseraNodeExpress

Este es el proyecto del curso de Coursera. Para la semana 1 se hace entrega del template en localHost en el puerto 8000 en donde se puede encontrar además el mapa con los dos punteros en la ciudad de Medellín.

A partir de esta ruta se puede ingresar a /bicicletas donde se listan las bicicletas añadidas donde se puede Editar o Eliminar la bicicleta.

No usé mi repositorio en Bitbucket dado que estoy familiarizado con github y como el docente habló de este en el curso no le vi ningún problema.

Para el uso de la API, el servidor recibe las peticiones de la siguiente manera:

# Listar
url: http://localhost:8000/api/bicicletas

# Crear
url: http://localhost:8000/api/bicicletas/create
body: {
"id": 10, 
"color": "Morado", 
"modelo": 2021, 
"latitud": -35, 
"longitud": -75
}

# Actualizar
url: http://localhost:8000/api/bicicletas/update
body: {
"id": 10, 
"color": "Morado", 
"modelo": 2021, 
"latitud": -35, 
"longitud": -75
}

# Eliminar
url: http://localhost:8000/api/bicicletas/delete
body: {
"id": 10
}

