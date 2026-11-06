const API_URL = "https://rickandmortyapi.com/api/character";

const formulario = document.querySelector("#formulario");
const campoNombre = document.querySelector("#nombre");
const campoEstado = document.querySelector("#estado");
const botonBuscar = document.querySelector("#botonBuscar");
const mensaje = document.querySelector("#mensaje");
const contador = document.querySelector("#contador");
const resultados = document.querySelector("#resultados");

const textoSeguro = (valor) => {
  if (!valor || valor === "unknown") {
    return "Desconocido";
  }

  return valor;
};

const mostrarMensaje = (texto, esError = false) => {
  mensaje.textContent = texto;
  mensaje.classList.toggle("error", esError);
};

const limpiarResultados = () => {
  resultados.replaceChildren();
  contador.textContent = "";
  contador.hidden = true;
};

const crearDato = (etiqueta, valor) => {
  const parrafo = document.createElement("p");

  const fuerte = document.createElement("strong");
  fuerte.textContent = `${etiqueta}: `;

  const texto = document.createTextNode(textoSeguro(valor));

  parrafo.append(fuerte, texto);

  return parrafo;
};

const crearTarjeta = (personaje) => {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";

  const imagen = document.createElement("img");
  imagen.src = personaje.image;
  imagen.alt = `Imagen de ${textoSeguro(personaje.name)}`;
  imagen.loading = "lazy";

  const contenido = document.createElement("div");
  contenido.className = "tarjeta-contenido";

  const nombre = document.createElement("h3");
  nombre.textContent = textoSeguro(personaje.name);

  const estado = crearDato(
    "Estado",
    personaje.status
  );

  const especie = crearDato(
    "Especie",
    personaje.species
  );

  const origen = crearDato(
    "Origen",
    personaje.origin?.name
  );

  contenido.append(
    nombre,
    estado,
    especie,
    origen
  );

  tarjeta.append(imagen, contenido);

  return tarjeta;
};

const renderizarPersonajes = (personajes, total) => {
  resultados.replaceChildren();

  personajes.forEach((personaje) => {
    const tarjeta = crearTarjeta(personaje);
    resultados.append(tarjeta);
  });

  contador.textContent =
    `${total} personajes encontrados · se muestran ${personajes.length}`;

  contador.hidden = false;
};

const construirURL = (nombre, estado) => {
  const url = new URL(API_URL);

  if (nombre) {
    url.searchParams.set("name", nombre);
  }

  if (estado) {
    url.searchParams.set("status", estado);
  }

  return url;
};

const obtenerPersonajes = async (nombre, estado) => {
  const url = construirURL(nombre, estado);

  const respuesta = await fetch(url);

  if (respuesta.status === 404) {
    return null;
  }

  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}`);
  }

  const datos = await respuesta.json();

  return datos;
};

const guardarBusqueda = (nombre, estado) => {
  const busqueda = {
    nombre,
    estado
  };

  localStorage.setItem(
    "ultimaBusqueda",
    JSON.stringify(busqueda)
  );
};

const ejecutarBusqueda = async (nombre, estado) => {
  if (!nombre && !estado) {
    limpiarResultados();

    mostrarMensaje(
      "Ingresa un nombre o selecciona un estado."
    );

    return;
  }

  botonBuscar.disabled = true;
  limpiarResultados();
  mostrarMensaje("Buscando…");

  try {
    guardarBusqueda(nombre, estado);

    const datos = await obtenerPersonajes(
      nombre,
      estado
    );

    if (!datos) {
      mostrarMensaje("Sin resultados");
      return;
    }

    renderizarPersonajes(
      datos.results,
      datos.info.count
    );

    mostrarMensaje("Búsqueda completada.");
  } catch (error) {
    console.error("Error al buscar personajes:", error);

    mostrarMensaje(
      "No se pudo completar la búsqueda.",
      true
    );
  } finally {
    botonBuscar.disabled = false;
  }
};

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = campoNombre.value.trim();
  const estado = campoEstado.value;

  await ejecutarBusqueda(nombre, estado);
});

const restaurarBusqueda = async () => {
  const guardada = localStorage.getItem("ultimaBusqueda");

  if (!guardada) {
    return;
  }

  try {
    const busqueda = JSON.parse(guardada);

    const nombre = busqueda.nombre ?? "";
    const estado = busqueda.estado ?? "";

    campoNombre.value = nombre;
    campoEstado.value = estado;

    if (nombre || estado) {
      await ejecutarBusqueda(nombre, estado);
    }
  } catch (error) {
    console.error(
      "No se pudo restaurar la búsqueda:",
      error
    );

    localStorage.removeItem("ultimaBusqueda");
  }
};

restaurarBusqueda();
