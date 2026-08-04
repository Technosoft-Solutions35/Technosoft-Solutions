/* ============================================================
   CONFIGURACIÓN DEL SITIO — Technosoft Solutions
   ------------------------------------------------------------
   ÚNICA carpeta donde debes editar datos que son tuyos:
   access key de Web3Forms, precios y datos de contacto opcionales.
   ============================================================ */

const TECH_CONFIG = {
  /* ACCESS KEY de Web3Forms (OBLIGATORIA para recibir los correos).
     Consíguela gratis en https://app.web3forms.com (verifica tu email).
     Reemplaza "TU_ACCESS_KEY_AQUI" por tu clave (formato: letras/números).
     Mientras esté el marcador, los formularios avisarán que faltan configurar. */
  accessKey: "064384de-6384-4dd2-8e83-f837579a4fc7",

  /* Sitekey compartida de hCaptcha de Web3Forms (plan gratis, NO cambia
     por formulario). Se usa internamente por el script
     https://web3forms.com/client/script.js; en el HTML solo ponemos
     <div class="h-captcha" data-captcha="true"></div>. Solo se referencia
     aquí a modo de documentación. */
  sitekey: "50b2fe65-b00b-4b9e-ad62-3ba471098be2",

  /* PRECIOS (opcional).
     Escribe aquí el precio de cada servicio/curso/pack como texto y
     aparecerá automáticamente en su página de detalle.
     Déjalo con "" para que muestre "A consultar".
     Ejemplo: "Pack Básico: Instalación Esencial": "S/ 90",  */
  precios: {
    "Pack Básico: Instalación Esencial": "",
    "Pack Intermedio: Listo para Trabajar": "",
    "Pack Avanzado: Software Especializado": "",
    "Automatización y Scripts": "",
    "Desarrollo Web": "",
    "Aplicaciones de Escritorio": "",
    "Microsoft Excel": "",
    "Microsoft Word": "",
    "Microsoft PowerPoint": "",
    "Microsoft Publisher": "",
    "Paquete Master: Ofimática Completa": ""
  },

  /* Datos de contacto (opcional). Se usan para construir los enlaces
     directos de email si algún día los quieres dinámicos.
     Cuando quieras dar WhatsApp, completa el número aquí y añade el
     enlace en el footer de las páginas. */
  contacto: {
    email: "technosoftsolutions35@gmail.com",
    whatsapp: ""
  }
};

/* Categorías de cada servicio principal (las mismas que usan los
   formularios de "Contratar Servicio" y "Atención al Cliente"). */
const TECH_CATEGORIAS = {
  "Desarrollo de Software": [
    "Automatización y Scripts",
    "Desarrollo Web",
    "Aplicaciones de Escritorio"
  ],
  "Tutorías y Cursos": [
    "Microsoft Excel",
    "Microsoft Word",
    "Microsoft PowerPoint",
    "Microsoft Publisher",
    "Paquete Master: Ofimática Completa"
  ],
  "Sistemas Operativos": [
    "Pack Básico: Instalación Esencial",
    "Pack Intermedio: Listo para Trabajar",
    "Pack Avanzado: Software Especializado"
  ]
};
