# 🎬 Laboratorio 09 — Next.js | SSR y CSR

**Desarrollo de Aplicaciones Web Avanzado**

Proyecto desarrollado como parte del Laboratorio 09, donde se implementan diferentes estrategias de renderizado utilizando Next.js, React y TypeScript. El laboratorio incluye una aplicación de Pokémon, un dashboard del clima y una galería interactiva de películas y series.

## 📌 Descripción del proyecto

El objetivo de este laboratorio es comprender las diferencias entre **Server-Side Rendering (SSR)** y **Client-Side Rendering (CSR)** mediante aplicaciones que consumen APIs externas.

Como actividad integradora se desarrolló **CineVerse**, una galería de películas y series que permite explorar títulos destacados, realizar búsquedas interactivas y consultar información detallada utilizando la API de OMDb.

## 🚀 Tecnologías utilizadas

- **Next.js 16:** framework principal de la aplicación.
- **React 19:** desarrollo de componentes interactivos.
- **TypeScript:** tipado de datos y componentes.
- **Tailwind CSS 4:** diseño de interfaces modernas y responsivas.
- **Axios y Fetch API:** consultas HTTP.
- **Lucide React:** iconos para la interfaz.
- **OMDb API:** información de películas y series.
- **PokéAPI:** información de Pokémon.
- **Open-Meteo API:** información meteorológica.
- **Git y GitHub:** control de versiones.
- **Vercel:** plataforma para el despliegue.

## 📂 Estructura del proyecto

```text
my-first-project/
├── app/
│   ├── api/
│   │   └── movies/
│   │       └── route.ts
│   ├── movies/
│   │   └── page.tsx
│   ├── pokemon-csr/
│   │   └── page.tsx
│   ├── pokemon-ssr/
│   │   └── page.tsx
│   ├── weather/
│   │   ├── page.tsx
│   │   └── ClientWeatherWidget.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   └── movies/
│       ├── FeaturedMovies.tsx
│       └── MovieExplorer.tsx
├── lib/
│   ├── movie-types.ts
│   └── omdb.ts
├── public/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🧪 Ejercicio 1: PokeApp — CSR y SSR

Se desarrollaron dos páginas que consultan información de Pokémon utilizando la PokéAPI.

### Pokémon CSR

**Ruta:** `/pokemon-csr`

La información se obtiene desde el navegador mediante `useEffect` y `useState`. Primero carga la página y después se muestra el Pokémon consultado.

### Pokémon SSR

**Ruta:** `/pokemon-ssr`

La consulta se realiza desde el servidor antes de mostrar el contenido. Se utiliza un componente asíncrono para obtener los datos.

Este ejercicio permitió observar cómo cambia la carga de información dependiendo de la estrategia utilizada.

## 🌤️ Ejercicio 2: Dashboard del clima

**Ruta:** `/weather`

Se desarrolló un dashboard que combina SSR y CSR utilizando Open-Meteo.

**Funcionalidades:**

- Consulta del clima de Lima mediante SSR.
- Consulta del clima de ciudades internacionales mediante CSR.
- Selector interactivo de ciudades.
- Visualización de temperatura y velocidad del viento.
- Tabla comparativa de SSR y CSR.
- Actualización de datos sin recargar toda la página.

El clima de Lima se obtiene desde el servidor, mientras que las consultas de otras ciudades se realizan desde el navegador.

## 🎥 Actividad integradora: CineVerse

**Ruta:** `/movies`

CineVerse es una galería interactiva de películas y series desarrollada con Next.js y la API de OMDb.

La aplicación combina renderizado del servidor para mostrar títulos destacados y renderizado del cliente para permitir búsquedas e interacciones.

### ✨ Funcionalidades principales

- Página principal con películas destacadas.
- Banner cinematográfico interactivo.
- Carrusel para cambiar la película destacada.
- Buscador de películas y series.
- Resultados dinámicos sin recargar la página.
- Filtros de películas y series.
- Categorías por género.
- Ventanas modales con información detallada.
- Pósteres y calificaciones IMDb.
- Diseño adaptable a diferentes pantallas.
- Manejo de estados de carga y errores.

### 📖 Información de cada película

Al seleccionar una película o serie, se puede consultar información como:

- Título y año de estreno.
- Póster oficial disponible en OMDb.
- Género y duración.
- Sinopsis.
- Director y actores.
- País e idioma.
- Premios y reconocimientos.
- Calificación IMDb.
- Enlace externo a IMDb.

## ⚙️ Estrategias de renderizado

### Server-Side Rendering (SSR)

Se utilizó SSR en la página principal de CineVerse para obtener las películas destacadas desde el servidor.

La consulta se realiza utilizando `async/await`, lo que permite preparar la información antes de enviarla al navegador.

**Ventajas:**

- Contenido disponible desde la carga inicial.
- Mejor accesibilidad del contenido para buscadores.
- Consultas realizadas desde el servidor.

### Client-Side Rendering (CSR)

Se utilizó CSR para implementar el buscador, los filtros, el carrusel y las ventanas de detalles.

Los componentes interactivos utilizan la directiva `"use client"` y los hooks `useState` y `useEffect`.

**Ventajas:**

- Búsquedas sin recargar toda la página.
- Actualización dinámica de resultados.
- Mayor interactividad para el usuario.

### ¿Por qué combinar SSR y CSR?

Se combinaron ambas estrategias porque cada una cumple una función diferente. SSR permite mostrar las películas destacadas desde el inicio, mientras que CSR facilita que el usuario busque, filtre y consulte información de manera interactiva.

## 🔐 Configuración de OMDb API

Para utilizar CineVerse es necesario obtener una clave gratuita desde:

https://www.omdbapi.com/apikey.aspx

Una vez activada, se debe crear un archivo `.env.local` en la raíz del proyecto:

```env
OMDB_API_KEY=TU_API_KEY
```

La clave se utiliza desde el servidor y mediante una ruta interna de Next.js para las búsquedas.

**Importante:** el archivo `.env.local` no debe subirse al repositorio, ya que contiene información privada.

## 💻 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Chanok18/Lab09_WEB.git
cd Lab09_WEB
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear `.env.local` y agregar la clave de OMDb:

```env
OMDB_API_KEY=TU_API_KEY
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Abrir en el navegador:

```text
http://localhost:3000
```

Para acceder directamente a CineVerse:

```text
http://localhost:3000/movies
```

### 5. Compilar para producción

```bash
npm run build
```

## 🌐 Rutas disponibles

| Ruta | Descripción | Renderizado |
|---|---|---|
| `/pokemon-csr` | Consulta interactiva de Pokémon | CSR |
| `/pokemon-ssr` | Consulta de Pokémon desde el servidor | SSR |
| `/weather` | Dashboard híbrido del clima | SSR + CSR |
| `/movies` | Galería CineVerse | SSR + CSR |
| `/api/movies` | Ruta interna de consultas a OMDb | API del servidor |

## 🧪 Pruebas realizadas

Se realizaron pruebas para comprobar el funcionamiento de las aplicaciones:

1. Carga de películas destacadas desde OMDb.
2. Búsqueda de títulos como Batman, Avengers e Interstellar.
3. Filtrado de resultados entre películas y series.
4. Consulta de detalles en ventanas modales.
5. Navegación entre secciones y categorías.
6. Actualización de información sin recargar la página.
7. Visualización del sitio en diferentes tamaños de pantalla.
8. Revisión de solicitudes HTTP mediante DevTools.

## ☁️ Despliegue en Vercel

El proyecto está preparado para desplegarse en Vercel.

Para realizar el despliegue:

1. Importar el repositorio desde GitHub.
2. Seleccionar Next.js como framework.
3. Configurar la variable de entorno `OMDB_API_KEY`.
4. Ejecutar el despliegue.
5. Verificar el funcionamiento de las rutas publicadas.

**URL del proyecto:** pendiente de agregar después del despliegue.

## 📝 Conclusiones

1. En este laboratorio aprendí a trabajar con SSR y CSR usando Next.js. Pude notar que cada uno tiene sus ventajas dependiendo de cómo queremos mostrar la información.

2. Al conectar la API de OMDb tuve algunos inconvenientes con la clave, pero después de activarla logré obtener los datos de las películas y series correctamente.

3. Utilizar Tailwind CSS me ayudó bastante a mejorar la apariencia de la página. También fui haciendo cambios para que el diseño sea más ordenado y fácil de utilizar.

4. Con `useState` y `useEffect` pude realizar búsquedas y actualizar los resultados sin recargar la página. Esto hizo que la aplicación fuera más cómoda e interactiva.

5. Este trabajo me permitió practicar mejor Next.js y la conexión con APIs externas. Considero que combinar SSR y CSR fue útil para lograr una aplicación más completa y funcional.

---

## 👨‍💻 Autor

**Kevin Jair Quispe Ccolque**

Carrera: Diseño y Desarrollo de Software  
Institución: TECSUP  
Curso: Desarrollo de Aplicaciones Web Avanzado

**GitHub:** https://github.com/Chanok18

**Repositorio:** https://github.com/Chanok18/Lab09_WEB

---

Proyecto académico desarrollado con Next.js, React, TypeScript, Tailwind CSS y APIs externas.