/* ============================================================
   FUNCIONES PRINCIPALES DEL SITIO — Technosoft Solutions
   Menú móvil, año del footer, precios dinámicos, envío de
   formularios por Web3Forms (AJAX) y precarga del formulario
   de contratación con el servicio que el usuario eligió.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. Menú móvil (hamburguesa) ---------- */
  var botonMenu = document.getElementById("botonMenu");
  var menu = document.getElementById("menuNavegacion");
  if (botonMenu && menu) {
    botonMenu.addEventListener("click", function () {
      var abierto = menu.classList.toggle("abierto");
      botonMenu.setAttribute("aria-expanded", String(abierto));
      botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
    menu.addEventListener("click", function (evento) {
      if (evento.target.closest("a")) {
        menu.classList.remove("abierto");
        botonMenu.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 2. Año actual en el footer ---------- */
  var anio = document.getElementById("anioActual");
  if (anio) {
    anio.textContent = String(new Date().getFullYear());
  }

  /* ---------- 3. Precios configurables ---------- */
  document.querySelectorAll("[data-servicio]").forEach(function (bloque) {
    var clave = bloque.getAttribute("data-servicio");
    var precio = TECH_CONFIG.precios[clave];
    if (precio && String(precio).trim() !== "") {
      var valor = bloque.querySelector(".ficha-precio-valor");
      if (valor) {
        valor.textContent = precio;
        valor.classList.add("tiene-precio");
      }
      var nota = bloque.querySelector(".ficha-precio-nota");
      if (nota) {
        nota.textContent = "Este es el precio publicado para este servicio.";
      }
    }
  });

  /* ---------- 4. Preferencias de animación ---------- */
  var prefiereMovimientoLigero = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 5. Animación de aparición al hacer scroll ---------- */
  if (!prefiereMovimientoLigero && "IntersectionObserver" in window) {
    var elementosAnimables = document.querySelectorAll(".animar");
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });
    elementosAnimables.forEach(function (elemento) {
      observador.observe(elemento);
    });
  } else {
    document.querySelectorAll(".animar").forEach(function (elemento) {
      elemento.classList.add("visible");
    });
  }

  /* ---------- 6. Desplegables dependientes (servicio -> categoría) ---------- */
  function rellenarCategorias() {
    var servicio = document.getElementById("servicio");
    var categoria = document.getElementById("categoria");
    if (!servicio || !categoria) {
      return;
    }
    var seleccion = servicio.value;
    categoria.innerHTML = '<option value="">-- Seleccione la categoría correspondiente --</option>';
    if (seleccion && TECH_CATEGORIAS[seleccion]) {
      TECH_CATEGORIAS[seleccion].forEach(function (item) {
        var opcion = document.createElement("option");
        opcion.value = item;
        opcion.textContent = item;
        categoria.appendChild(opcion);
      });
    }
  }

  var selectServicio = document.getElementById("servicio");
  if (selectServicio) {
    selectServicio.addEventListener("change", rellenarCategorias);
  }

  /* Prellenar el formulario de contratación con el servicio elegido
     (llega a través de la URL, p. ej. contratar.html?servicio=...&categoria=...). */
  var formularioContratar = document.getElementById("formularioContratar");
  if (formularioContratar) {
    var parametros = new URLSearchParams(window.location.search);
    var servicioUrl = parametros.get("servicio");
    var categoriaUrl = parametros.get("categoria");
    var selectServicio2 = document.getElementById("servicio");
    var selectCategoria = document.getElementById("categoria");
    if (servicioUrl && selectServicio2) {
      selectServicio2.value = servicioUrl;
      rellenarCategorias();
    }
    if (categoriaUrl && selectCategoria) {
      selectCategoria.value = categoriaUrl;
    }
  }

  /* ---------- 7. Envío de formularios (Web3Forms AJAX) ---------- */
  function esMarcador(clave) {
    return !clave || clave.indexOf("TU_ACCESS_KEY") !== -1;
  }

  function mostrarResultado(form, tipo, mensaje) {
    var caja = form.querySelector("[data-tec-resultado]");
    if (!caja) {
      return;
    }
    caja.className = "mensaje-formulario " + tipo;
    caja.textContent = mensaje;
    caja.hidden = false;
  }

  function obtenerTokenCaptcha(form) {
    var textarea = form.querySelector('textarea[name="h-captcha-response"]');
    if (textarea && textarea.value) {
      return textarea.value;
    }
    if (window.hcaptcha) {
      try {
        return window.hcaptcha.getResponse() || "";
      } catch (e) {
        return "";
      }
    }
    return "";
  }

  document.querySelectorAll("form[data-tec-form]").forEach(function (form) {
    form.addEventListener("submit", function (evento) {
      evento.preventDefault();

      var caja = form.querySelector("[data-tec-resultado]");
      if (caja) {
        caja.hidden = true;
        caja.textContent = "";
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (esMarcador(TECH_CONFIG.accessKey)) {
        mostrarResultado(form, "error",
          "El formulario aún no está configurado: pega tu Access Key de Web3Forms " +
          "en el archivo js/config.js (campo accessKey) para recibir los envíos.");
        return;
      }

      var datos = new FormData(form);
      var cuerpo = {};
      datos.forEach(function (valor, clave) {
        cuerpo[clave] = valor;
      });
      cuerpo.access_key = TECH_CONFIG.accessKey;

      var token = obtenerTokenCaptcha(form);
      if (token) {
        cuerpo["h-captcha-response"] = token;
      }

      var boton = form.querySelector('button[type="submit"]');
      var textoOriginal = boton.textContent;
      boton.disabled = true;
      boton.textContent = "Enviando…";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(cuerpo)
      })
        .then(function (respuesta) { return respuesta.json(); })
        .then(function (datosServidor) {
          if (datosServidor.success) {
            mostrarResultado(form, "exito",
              "¡Listo! Tu solicitud se envió correctamente. Te responderemos a la brevedad.");
            form.reset();
            if (window.hcaptcha) {
              try { window.hcaptcha.reset(); } catch (e) { /* ignorar */ }
            }
            if (form.id === "formularioContratar") {
              rellenarCategorias();
            }
          } else {
            mostrarResultado(form, "error",
              "No se pudo enviar la solicitud: " +
              (datosServidor.message || "Error del servidor. Revisa tu conexión e inténtalo de nuevo."));
          }
        })
        .catch(function () {
          mostrarResultado(form, "error",
            "Error de conexión. Verifica tu internet e inténtalo de nuevo.");
        })
        .finally(function () {
          boton.disabled = false;
          boton.textContent = textoOriginal;
        });
    });
  });

  /* ---------- 8. Modo claro / oscuro ---------- */
  var botonTemaEl = document.getElementById("botonTema");
  if (botonTemaEl) {
    botonTemaEl.addEventListener("click", function () {
      var actual = document.documentElement.getAttribute("data-tema");
      var siguiente = actual === "claro" ? "oscuro" : "claro";
      document.documentElement.setAttribute("data-tema", siguiente);
      botonTemaEl.setAttribute("aria-pressed", String(siguiente === "claro"));
      var metaTema = document.querySelector('meta[name="theme-color"]');
      if (metaTema) { metaTema.setAttribute("content", siguiente === "claro" ? "#eef2fb" : "#070b17"); }
      try { localStorage.setItem("tec-tema", siguiente); } catch (e) { /* ignorar */ }
    });
  }
})();
