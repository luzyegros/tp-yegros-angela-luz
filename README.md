# Explorador de Personajes de Rick and Morty

Aplicación web desarrollada para explorar personajes de la serie Rick and Morty mediante el consumo de una API REST. Permite realizar búsquedas por nombre y filtrar personajes según su estado, mostrando los resultados de forma dinámica.

**Autora:** Angela Luz Yegros · Fundamentos de Desarrollo Web · UCSA  
**Variante del TP:** A · Personajes

## Sitios publicados

- GitHub Pages: https://luzyegros.github.io/tp-yegros-angela-luz/
- Vercel: https://tp-yegros-angela-luz.vercel.app/

## Captura

![Captura de la aplicación](img/captura.png)

## Funcionalidades

- Buscar personajes por nombre.
- Filtrar personajes por estado: vivo, muerto o desconocido.
- Consumir datos de la API REST de Rick and Morty mediante Fetch API.
- Mostrar los resultados dinámicamente en tarjetas.
- Mostrar imagen, nombre, estado, especie y lugar de origen de cada personaje.
- Informar al usuario cuando no se encuentran personajes con los filtros seleccionados.
- Manejar errores durante la consulta a la API.
- Guardar la última búsqueda mediante localStorage.
- Restaurar automáticamente la última búsqueda almacenada.

## Tecnologías

- HTML5
- CSS3
- CSS Grid
- Flexbox
- JavaScript ES6+
- Fetch API
- async/await
- localStorage
- API de Rick and Morty

## Estructura del proyecto

```text
tp-yegros-angela-luz/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── estilos.css
├── js/
│   └── app.js
└── img/
    └── captura.png
```

- `index.html`: estructura principal de la aplicación.
- `css/estilos.css`: estilos visuales y diseño responsive.
- `js/app.js`: lógica de la aplicación, consumo de la API y manejo de búsquedas.
- `img/captura.png`: captura de la aplicación utilizada en este README.
- `.gitignore`: archivos y directorios excluidos del control de versiones.

## Cómo ejecutarlo localmente

1. Clonar el repositorio de GitHub.
2. Abrir la carpeta `tp-yegros-angela-luz` en Visual Studio Code.
3. Abrir el archivo `index.html` directamente en el navegador o utilizar la extensión Live Server.
4. Realizar una búsqueda por nombre o seleccionar un estado para consultar los personajes.

La aplicación requiere conexión a Internet para consultar la API de Rick and Morty.

## Despliegue

El proyecto utiliza la rama `main` como rama principal.

La aplicación está publicada mediante GitHub Pages y Vercel. Los cambios integrados en `main` se envían al repositorio remoto mediante Git y GitHub, permitiendo actualizar automáticamente las versiones publicadas.

Para publicar una nueva versión se realizan los cambios correspondientes, se crea un commit descriptivo y se ejecuta `git push`. GitHub Pages y Vercel actualizan posteriormente la aplicación publicada.