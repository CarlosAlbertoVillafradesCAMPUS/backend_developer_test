# PROPUSTA DESARROLLO PRUEBA NODEJS

se realizo la prueba de node js, en base a la plantila de repositoria existente, se debe tener en cuenta que por motivos de comodidad, se optó por no trabajar directamente en la carpeta **./database** si no de lo contrario, crear una propia carpeta con propuesta de desarrollo a la prueba.

### Requisitos previos
- Node.js instalado en tu máquina.

### A tener en cuenta
- En la carpeta **/database** estan el codigo plantilla que se suministraba, con los endpoints por defecto, entonces si se quieren utilizar los ednpoints por defecto se debe entrar a la carpeta **/database** y ejecutar el comando `npm i` para instalar dependencias y a continuacion `npm run start` para inicar el servidor. **RECORDAR**, de esta manera solo se podra acceder al codigo plantilla y a los endpoints por defecto.

- En la carpeta **/api** se encuentra el codigo realizado para la solucion de la prueba, entonces se debe entrar a la arpeta **/api** y ejecutar los comandos `npm i` para instalar dependencias y el comando `npm run start` para inciar el servidor.

- **IMPORTANTE**, Los dos servirdores apuntan a la mismas carpeta de los archivos JSON

- Si se quiere utilizar los dos servdiores a la vez importante cambiar el puerto de ejecucion

### Dependecias utilizadas

```js
    "dotenv": "16.4.5",
    "express": "4.18.2",
    "express-rate-limit": "7.1.5",
    "express-validator": "7.0.1"
```

### Estrctura de crapetas MVC
```json
proyecto/
│
├── config/
│
├── controllers/
│
├── middleware/
│
├── dto/
│
├── models/
│
├── routers/
│
└── app.js
```

## Endpoints o Servicios
1- Consultar las cuentas a las que un usuario tiene acceso y los formularios dentro de cada cuenta a los
que puede acceder con el permiso de lectura.
Se espera un objeto JSON con dos propiedades. Una propiedad debe llamarse accounts y debe
tener una lista con los nombres de las cuentas a las que el usuario tiene acceso. La segunda
propiedad se debe llamar forms y debe ser una lista de objetos, cada uno con el nombre de la cuenta
y el nombre del formulario.

**GET** `http://localhost:20000/api/users/account/:id_user`

**ejemplo de entrada PARAMS**
`api/users/account/user1`

**OUTPUT**
```js
{
  "status": 200,
  "message": {
    "accounts": [
      "Café",
      "Cacao"
    ],
    "forms": [
      {
        "nameAccount": "Café",
        "nameForm": [
          "Cosecha",
          "Secado"
        ]
      },
      {
        "nameAccount": "Cacao",
        "nameForm": [
          "Cosecha",
          "Fermentación"
        ]
      }
    ]
  }
}
```

2- Creación de registros de cosecha.
El identificador del usuario debe enviarse en el encabezado Authorization en cada petición. No se
requiere una capa de autenticación ni autorización, solamente se debe recibir un identificador de
usuario válido en el encabezado.
El servicio debe validar que el usuario que hizo la petición tenga los permisos necesarios para crear
registros de cosecha. Para esto necesita que se especifique la cuenta en la que desea crear los
registros. La cuenta debe especificarse como parte de la ruta.
El nombre para esta ruta debe ser harvest y debe permitir únicamente propiedades que estén
definidas en el documento form1 de la base de datos, el cual contiene la definición del formulario de
cosecha.

**POST** `http://localhost:20000/api/harvest/:account`

**ejemplo de entrada**

**PARAMS**:
`api/harvest/account2`

**HEADERS**:
`Authorization = user1`

**Importante** si no se le pasa por el HEADER el Authorization con el id_user, el endpoint no va funcionar

**BODY**
```js
{
  "date":"2024-02-05",  //obligatoria tipo DATE
  "employee":"Carlos",  //obligatoria tipo STRING
  "quantity":20 //obligatoria tipo INT
}
```

3- CRUD de registros de fermentación.
Aplican las mismas condiciones que para el servicio número 2:

● El usuario se especifica en los encabezados.

● Se deben validar los permisos para cada operación.

● Solamente se permiten propiedades definidas para form3.

Al momento de crear y actualizar datos, validar que la fecha de salida sea mayor o igual a la fecha de
entrada y que la cantidad de salida sea menor o igual a la cantidad de entrada.
Un requerimiento especial para este servicio es que la consulta de los datos de fermentación (GET)
debe retornar un objeto con dos propiedades.
Una propiedad debe llamarse data y contiene un objeto con los datos guardados hasta ese momento.
La otra propiedad debe llamarse summary y debe ser un objeto con las siguientes propiedades:

● avg_days: Promedio de la cantidad de días que pasan entre la entrada y salida del cacao a la
estación de fermentación.

● avg_weight_loss: Promedio de la merma. Recordar que es un porcentaje, por lo cual debería
retornarse un valor decimal menor o igual a 1 y tener en cuenta que no es válido promediar
porcentajes. En su lugar, se deben sumar todos los poquitos perdidos en cada fermentación y
dividir por la suma del total de entradas.

**ENDPOINTS**

- Obtener los registros de ferment

**GET** `http://localhost:20000/api/ferment/`

**ejemplo de entrada**

**HEADERS**:
`Authorization = user1`

**Importante** si no se le pasa por el HEADER el Authorization con el id_user, el endpoint no va funcionar

**OUTPUT**
```js
{
  "status": 201,
  "message": {
    "data": {
      "1709312776244": {
        "start_date": "2024-02-05",
        "input": 20,
        "end_date": "2024-02-05",
        "output": 20
      },
      "1709314427239": {
        "start_date": "2024-02-05",
        "input": 20,
        "end_date": "2024-02-05",
        "output": 20
      },
      "1709314449156": {
        "start_date": "2024-02-05",
        "input": 20,
        "end_date": "2024-03-05",
        "output": 14
      }
    },
    "summary": {
      "avg_days": 9.666666666666666,
      "avg_weight_loss": 10
    }
  }
}
```


- Agregar un registro de fermentacion

**GET** `http://localhost:20000/api/ferment/:account`

**ejemplo de entrada**

**PARAMS**:
`api/ferment/account2`

**HEADERS**:
`Authorization = user1`

**Importante** si no se le pasa por el HEADER el Authorization con el id_user, el endpoint no va funcionar

**BODY**
```js

{
  "start_date":"2024-02-05", //obligatoria tipo DATE
  "input":20, //obligatoria tipo INT
  "end_date":"2024-03-05", //obligatoria tipo DATE
  "output":14 //obligatoria tipo INT
}
```

- Eliminar un registro de fermentacion

**DELETE** `http://localhost:20000/api/ferment/:id_ferment`

**ejemplo de entrada**

**PARAMS**:
`api/ferment/1709312776244`

**HEADERS**:
`Authorization = user1`

**Importante** si no se le pasa por el HEADER el Authorization con el id_user, el endpoint no va funcionar

