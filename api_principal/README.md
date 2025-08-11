# API Principal — SportTest

API REST en Node.js/Express que gestiona usuarios, autenticación (JWT), autorización por roles y productos almacenados en MongoDB. Esta API es la “principal” del proyecto y contiene los productos. Incluye un punto de integración para un chatbot (Gemini) mediante una API Key para omitir la autenticación JWT en casos específicos.

## Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- Autenticación JWT (jsonwebtoken)
- Hash de contraseñas (bcryptjs)
- Variables de entorno (dotenv)
- Logging HTTP (morgan)

## Estructura del proyecto

```
app.js
package.json
config/
	db.js
controllers/
	adminController.js
	authController.js
	productController.js
	userController.js
middlewares/
	authMiddleware.js
	roleMiddleware.js
models/
	productsModel.js
	users.js
routes/
	admin.js
	auth.js
	products.js
	user.js
```

## Variables de entorno

Definir en un archivo `.env` en la raíz del proyecto:

- PORT: Puerto donde corre la API. Ejemplo: `3000`.
- MONGO_URI: Cadena de conexión a MongoDB.
- DATABASE_NAME: Nombre de la base de datos usada por Mongoose.
- JWT_SECRET: Clave secreta para firmar tokens JWT.
- JWT_EXPIRATION: Tiempo de expiración del token (por ejemplo, `1d`, `2h`).
- CHATBOT_API_KEY: API Key que permite a un chatbot omitir la autenticación JWT mediante el header `X-API-Key`.

## Puesta en marcha

1) Instalar dependencias con el gestor de paquetes de tu preferencia.
2) Crear el archivo `.env` con las variables anteriores.
3) Iniciar en desarrollo o producción con los scripts definidos en `package.json`.

Scripts disponibles:
- `dev`: inicia `app.js` con nodemon.
- `start`: inicia `app.js` con Node.

El servidor levanta Express y conecta a MongoDB en el arranque.

## Conexión a Base de Datos

`config/db.js` realiza la conexión a MongoDB usando `MONGO_URI` y configura `dbName` con el valor de `DATABASE_NAME`. Ante error, el proceso termina con código 1.

## Middlewares

- Autenticación (`authMiddleware.protect`):
	- Si la petición incluye el header `X-API-Key` y coincide con `CHATBOT_API_KEY`, se omite la verificación JWT (pensado para el chatbot).
	- En caso contrario, espera un header `Authorization: Bearer <token>` y valida el JWT con `JWT_SECRET`. Agrega el usuario a `req.user` (sin contraseña).
- Autorización por rol (`roleMiddleware.authRoleMiddleware(requiredRole)`):
	- Verifica que `req.user.role` contenga el rol requerido (e.g., `"admin"`).

## Modelos

### Product (`models/productsModel.js`)

Campos principales:
- name: String, requerido, único, indexado.
- description: String, requerido.
- price: Number, requerido, min 0, indexado.
- category: String, requerido.
- brand: String, requerido, enum: ["Nike", "Adidas", "Puma", "Under Armour", "Reebok", "New Balance"], indexado.
- size: String, requerido, enum: ["XS", "S", "M", "L", "XL", "XXL"], indexado.
- color: String, requerido, enum: ["negro", "blanco", "azul", "rojo", "verde", "gris", "rosa", "amarillo"], indexado.
- stock: Number, requerido, min 0.
- createdAt: Date, `Date.now` por defecto.

### User (`models/users.js`)

Campos principales:
- name: String, requerido, único.
- email: String, requerido, único, en minúsculas.
- password: String, requerido, minLength 6.
- role: String, enum ["user", "admin"], por defecto `"user"`.
- preferences: Objeto con:
	- favoriteSizes: [String], enum mismas tallas válidas, por defecto `[]`.
	- favoriteColors: [String], enum mismos colores válidos, por defecto `[]`.
	- favoriteBrands: [String], enum mismas marcas válidas, por defecto `[]`.
- createdAt: Date, `Date.now` por defecto.

## Endpoints

Base URL (por defecto): `http://localhost:<PORT>/api`

### Auth (`/auth`)

1) POST `/api/auth/register`
- Body JSON: `{ name, email, password }`.
- Respuestas:
	- 201: `{ message: "User registered successfully" }`
	- 400: `{ message: "All fields are required" }` o `{ message: "User already exists" }`
	- 500: `{ message: "Server error" }`

2) POST `/api/auth/login`
- Body JSON: `{ email, password }`.
- Respuestas:
	- 200: `{ message: "Login successful", token, user: { id, name, email, role } }`
	- 400: `{ message: "Email and password are required" }` o `{ message: "Invalid email or password" }`
	- 500: `{ message: "Server error" }`

### Usuario (`/users`)

Requiere autenticación con JWT en el header `Authorization: Bearer <token>` o bien `X-API-Key` igual a `CHATBOT_API_KEY`.

1) GET `/api/users/profile`
- Respuesta 200: `{ id, name, email, preferences }`
- 401: `{ message: "No token provided, authorization denied" }` o `{ message: "Token is not valid" }`
- 404: `{ message: "User not found" }`

2) PUT `/api/users/profile`
- Body JSON opcional: `{ name?, email?, preferences? }`
- Respuesta 200: `{ id, name, email, preferences }`
- 401/404/500 según corresponda

### Admin (`/admin`)

Todos los endpoints requieren autenticación y rol `admin`.

1) GET `/api/admin/users`
- Retorna usuarios (sin contraseña ni `__v`).
- Respuestas:
	- 200: `{ message: "Usuarios encontrados", users: [...] }`
	- 403: `{ message: "Access denied. You do not have the required role." }`
	- 404: `{ message: "No users found" }`

2) POST `/api/admin/create-product`
- Body JSON requerido: `{ name, description, price, category, brand, size, color, stock }`
- Validaciones: todos los campos requeridos; `brand`, `size`, `color` deben estar dentro de sus enums; `price` y `stock` no negativos.
- Respuestas:
	- 201: `{ message: "Product created successfully", product }`
	- 400: `{ message: "All fields are required" }`
	- 500: `{ message: "Server error", error? }`

### Productos (`/products`)

1) GET `/api/products/`
- Respuesta 200: `[{ ...product }]`
- 500: `{ message: "Server error" }`

2) GET `/api/products/:id`
- Respuestas:
	- 200: `{ ...product }`
	- 404: `{ message: "Product not found" }`
	- 500: `{ message: "Server error" }`

## Integración con Chatbot (Gemini)

Para permitir que el chatbot consuma esta API sin JWT, envía el header `X-API-Key` con el valor configurado en `CHATBOT_API_KEY`. El middleware de autenticación detecta esta cabecera y omite la validación del token.

## Dependencias relevantes

- express, mongoose, jsonwebtoken, bcryptjs, dotenv, morgan
- Dev: nodemon

## Licencia

ISC (según `package.json`).

## Autor

Ivan Martinez (XxIvanstromxX)

