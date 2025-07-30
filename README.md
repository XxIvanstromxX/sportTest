# SportTest API

Una API RESTful para gestión de productos deportivos con sistema de autenticación y gestión de usuarios.

## 📋 Descripción

SportTest es una API backend desarrollada en Node.js con Express y MongoDB que proporciona funcionalidades para:
- Gestión de usuarios con roles (user/admin)
- Sistema de autenticación con JWT
- Gestión de productos deportivos
- Preferencias de usuario (tallas, colores, marcas favoritas)
- Historial de chat para cada usuario

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **Morgan** - Logger de peticiones HTTP
- **dotenv** - Variables de entorno

## 📁 Estructura del Proyecto

```
api_principal/
├── app.js                 # Archivo principal de la aplicación
├── package.json           # Dependencias y scripts
├── config/
│   └── db.js             # Configuración de base de datos
├── controllers/
│   ├── adminController.js # Controladores para administradores
│   ├── authController.js  # Controladores de autenticación
│   └── userController.js  # Controladores de usuarios
├── middlewares/
│   ├── authMiddleware.js  # Middleware de autenticación
│   └── roleMiddleware.js  # Middleware de roles
├── models/
│   ├── products.js       # Modelo de productos
│   └── users.js          # Modelo de usuarios
└── routes/
    ├── admin.js          # Rutas de administrador
    ├── auth.js           # Rutas de autenticación
    └── user.js           # Rutas de usuarios
```

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (versión 14 o superior)
- MongoDB
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/XxIvanstromxX/sportTest.git
   cd SportTest/api_principal
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del directorio `api_principal`:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/SportTEST
   JWT_SECRET=tu_jwt_secret_aqui
   ```

4. **Ejecutar la aplicación**
   ```bash
   # Modo desarrollo (con nodemon)
   npm run dev
   
   # Modo producción
   node app.js
   ```

## 📊 Modelos de Datos

### Usuario (User)
```javascript
{
  name: String,           // Nombre único del usuario
  email: String,          // Email único
  password: String,       // Contraseña encriptada
  role: String,          // "user" o "admin"
  preferences: {
    favoriteSizes: [String],    // ["XS", "S", "M", "L", "XL", "XXL"]
    favoriteColors: [String],   // ["negro", "blanco", "azul", etc.]
    favoriteBrands: [String]    // ["Nike", "Adidas", "Puma", etc.]
  },
  chatHistory: [{
    preguntaUsuario: String,
    respuestaChatbot: String,
    fecha: Date
  }],
  createdAt: Date
}
```

### Producto (Product)
```javascript
{
  name: String,          // Nombre único del producto
  description: String,   // Descripción del producto
  price: Number,         // Precio (mínimo 0)
  category: String,      // Categoría del producto
  brand: String,         // Marca (Nike, Adidas, Puma, etc.)
  size: String,          // Talla (XS, S, M, L, XL, XXL)
  color: String,         // Color (negro, blanco, azul, etc.)
  stock: Number,         // Stock disponible
  createdAt: Date
}
```

## 🔌 Endpoints de la API

### Autenticación (`/api/auth`)
- `POST /register` - Registrar nuevo usuario
- `POST /login` - Iniciar sesión

### Usuarios (`/api/users`)
- `GET /profile` - Obtener perfil del usuario (requiere autenticación)
- `PUT /profile` - Actualizar perfil del usuario (requiere autenticación)

### Administración (`/api/admin`)
- `GET /users` - Obtener todos los usuarios (requiere rol admin)

### Productos (`/api/products`) *[En desarrollo]*
- Endpoints para gestión de productos (próximamente)

## 🔐 Sistema de Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación:

1. **Registro/Login**: El usuario obtiene un token JWT
2. **Middleware de protección**: Valida el token en rutas protegidas
3. **Middleware de roles**: Controla acceso basado en roles (user/admin)

### Ejemplo de uso:
```javascript
// Incluir token en headers
Authorization: Bearer <tu_jwt_token>
```

## 👥 Roles de Usuario

- **user**: Usuario estándar con acceso a funciones básicas
- **admin**: Administrador con acceso completo al sistema

## 🎨 Características Destacadas

### Preferencias de Usuario
- **Tallas favoritas**: XS, S, M, L, XL, XXL
- **Colores favoritos**: negro, blanco, azul, rojo, verde, gris, rosa, amarillo
- **Marcas favoritas**: Nike, Adidas, Puma, Under Armour, Reebok, New Balance

### Historial de Chat
Cada usuario puede mantener un historial de conversaciones con el chatbot del sistema.

## 🔧 Scripts Disponibles

```bash
npm run dev    # Ejecutar en modo desarrollo con nodemon
npm test       # Ejecutar tests (no configurado aún)
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Estado del Proyecto

- ✅ Sistema de autenticación y usuarios
- ✅ Modelos de datos (Users y Products)
- ✅ Middlewares de seguridad
- ✅ Rutas básicas implementadas
- 🔄 Gestión completa de productos (en desarrollo)
- 🔄 Tests unitarios (pendiente)
- 🔄 Documentación con Swagger (pendiente)

## 📄 Licencia

ISC License

## 👨‍💻 Autor

**XxIvanstromxX**

---

*Proyecto en desarrollo activo. Más funcionalidades proximamente.*