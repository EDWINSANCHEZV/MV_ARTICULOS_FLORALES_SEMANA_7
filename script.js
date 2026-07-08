// ===============================
// SEMANA 7 - CONTENIDO DINÁMICO
// Proyecto: MV Artículos Florales
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  // ===============================
  // PRODUCTOS DINÁMICOS
  // ===============================

  const productos = [
    {
      nombre: "Papel Floral",
      descripcion: "Papeles decorativos para arreglos florales, empaques y presentación de rosas.",
      categoria: "Papel floral",
      imagen: "img/producto_1.png",
      estado: "Disponible"
    },
    {
      nombre: "Malla Protectora",
      descripcion: "Material utilizado para proteger flores durante el cultivo, empaque y transporte.",
      categoria: "Mallas",
      imagen: "img/producto_2.png",
      estado: "Disponible"
    },
    {
      nombre: "Fundas para Rosas",
      descripcion: "Fundas plásticas para proteger las flores y mejorar su presentación comercial.",
      categoria: "Empaques",
      imagen: "img/producto_3.png",
      estado: "Por consultar"
    }
  ];

  function mostrarProductos() {
    const contenedorProductos = document.getElementById("contenedorProductos");

    if (!contenedorProductos) {
      return;
    }

    contenedorProductos.innerHTML = "";

    productos.forEach(function (producto) {
      let claseEstado = "bg-success";

      if (producto.estado === "Por consultar") {
        claseEstado = "bg-warning text-dark";
      }

      contenedorProductos.innerHTML += `
        <article class="col-md-4 mb-4">
          <div class="card h-100 shadow card-dinamica">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body text-center">
              <h4 class="card-title text-success">${producto.nombre}</h4>
              <p class="card-text">${producto.descripcion}</p>
              <p><strong>Categoría:</strong> ${producto.categoria}</p>
              <span class="badge ${claseEstado}">${producto.estado}</span>
              <br><br>
              <a href="#contacto" class="btn btn-success">Solicitar información</a>
            </div>
          </div>
        </article>
      `;
    });
  }

  // ===============================
  // BLOQUES PARA PLANTILLAS
  // ===============================

  const bloquesPlantilla = [
    {
      titulo: "Encabezado",
      descripcion: "Contiene la parte superior de la página y puede reutilizarse en todas las vistas."
    },
    {
      titulo: "Navegación",
      descripcion: "Incluye el menú principal con enlaces a las secciones del sitio web."
    },
    {
      titulo: "Contenido principal",
      descripcion: "Muestra información dinámica como productos y solicitudes registradas."
    },
    {
      titulo: "Pie de página",
      descripcion: "Presenta datos del proyecto, autor y año de elaboración."
    }
  ];

  function mostrarBloquesPlantilla() {
    const resumenPlantillas = document.getElementById("resumenPlantillas");

    if (!resumenPlantillas) {
      return;
    }

    resumenPlantillas.innerHTML = "";

    bloquesPlantilla.forEach(function (bloque) {
      resumenPlantillas.innerHTML += `
        <article class="col-md-3 mb-4">
          <div class="card h-100 shadow text-center p-3">
            <h5 class="text-success">${bloque.titulo}</h5>
            <p>${bloque.descripcion}</p>
          </div>
        </article>
      `;
    });
  }

  // ===============================
  // VALIDACIONES SEMANA 6
  // ===============================

  const formulario = document.getElementById("formSolicitud");
  const nombreProducto = document.getElementById("nombreProducto");
  const descripcionProducto = document.getElementById("descripcionProducto");
  const categoriaProducto = document.getElementById("categoriaProducto");
  const mensajeValidacion = document.getElementById("mensajeValidacion");
  const listaSolicitudes = document.getElementById("listaSolicitudes");
  const totalRegistros = document.getElementById("totalRegistros");

  let solicitudes = [];

  function validarCampo(campo, idError, mensaje, valido) {
    const error = document.getElementById(idError);

    if (!campo || !error) {
      return false;
    }

    if (valido) {
      campo.classList.remove("is-invalid");
      campo.classList.add("is-valid");
      error.textContent = "";
      return true;
    } else {
      campo.classList.remove("is-valid");
      campo.classList.add("is-invalid");
      error.textContent = mensaje;
      return false;
    }
  }

  function validarNombre() {
    const nombre = nombreProducto.value.trim();

    if (nombre === "") {
      return validarCampo(nombreProducto, "errorNombre", "El nombre del producto es obligatorio.", false);
    }

    if (nombre.length < 3) {
      return validarCampo(nombreProducto, "errorNombre", "El nombre debe tener mínimo 3 caracteres.", false);
    }

    return validarCampo(nombreProducto, "errorNombre", "", true);
  }

  function validarDescripcion() {
    const descripcion = descripcionProducto.value.trim();

    if (descripcion === "") {
      return validarCampo(descripcionProducto, "errorDescripcion", "La descripción es obligatoria.", false);
    }

    if (descripcion.length < 10) {
      return validarCampo(descripcionProducto, "errorDescripcion", "La descripción debe tener mínimo 10 caracteres.", false);
    }

    return validarCampo(descripcionProducto, "errorDescripcion", "", true);
  }

  function validarCategoria() {
    const categoria = categoriaProducto.value;

    if (categoria === "") {
      return validarCampo(categoriaProducto, "errorCategoria", "Seleccione una categoría antes de registrar.", false);
    }

    return validarCampo(categoriaProducto, "errorCategoria", "", true);
  }

  function validarFormulario() {
    const nombreValido = validarNombre();
    const descripcionValida = validarDescripcion();
    const categoriaValida = validarCategoria();

    return nombreValido && descripcionValida && categoriaValida;
  }

  function mostrarMensaje(texto, tipo) {
    if (!mensajeValidacion) {
      return;
    }

    mensajeValidacion.innerHTML = `
      <div class="alert ${tipo}" role="alert">
        ${texto}
      </div>
    `;
  }

  function mostrarSolicitudes() {
    if (!listaSolicitudes || !totalRegistros) {
      return;
    }

    listaSolicitudes.innerHTML = "";

    if (solicitudes.length === 0) {
      listaSolicitudes.innerHTML = `
        <div class="alert alert-info mt-3">
          Todavía no existen solicitudes registradas.
        </div>
      `;
    } else {
      solicitudes.forEach(function (solicitud, index) {
        listaSolicitudes.innerHTML += `
          <div class="card mt-3 shadow">
            <div class="card-body">
              <h5 class="card-title">${solicitud.nombre}</h5>
              <p class="card-text">${solicitud.descripcion}</p>
              <span class="badge bg-success">${solicitud.categoria}</span>
              <span class="badge bg-secondary">${solicitud.estado}</span>
              <p class="mt-2 mb-2"><strong>Fecha:</strong> ${solicitud.fecha}</p>

              <button class="btn btn-danger btn-sm" onclick="eliminarSolicitud(${index})">
                Eliminar
              </button>
            </div>
          </div>
        `;
      });
    }

    totalRegistros.textContent = solicitudes.length;
  }

  window.eliminarSolicitud = function (index) {
    solicitudes.splice(index, 1);
    mostrarSolicitudes();
    mostrarMensaje("Solicitud eliminada correctamente.", "alert-success");
  };

  if (formulario) {
    formulario.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validarFormulario()) {
        mostrarMensaje("Revise los campos marcados antes de registrar.", "alert-danger");
        return;
      }

      const nuevaSolicitud = {
        nombre: nombreProducto.value.trim(),
        descripcion: descripcionProducto.value.trim(),
        categoria: categoriaProducto.value,
        fecha: new Date().toLocaleDateString("es-EC"),
        estado: "Pendiente de revisión"
      };

      solicitudes.push(nuevaSolicitud);

      mostrarSolicitudes();
      mostrarMensaje("Solicitud registrada correctamente.", "alert-success");

      formulario.reset();

      nombreProducto.classList.remove("is-valid");
      descripcionProducto.classList.remove("is-valid");
      categoriaProducto.classList.remove("is-valid");
    });

    nombreProducto.addEventListener("input", validarNombre);
    nombreProducto.addEventListener("blur", validarNombre);

    descripcionProducto.addEventListener("input", validarDescripcion);
    descripcionProducto.addEventListener("blur", validarDescripcion);

    categoriaProducto.addEventListener("change", validarCategoria);
    categoriaProducto.addEventListener("blur", validarCategoria);
  }

  // ===============================
  // EJECUCIÓN PRINCIPAL
  // ===============================

  mostrarProductos();
  mostrarBloquesPlantilla();
  mostrarSolicitudes();

});