# Technosoft Solutions V2

Sitio web oficial de **Technosoft Solutions**: soluciones informáticas a tu medida — desarrollo de software, tutorías y cursos de ofimática, y optimización de sistemas operativos.

## ✨ Características

- **Modo claro/oscuro** con persistencia en `localStorage` y detección de preferencia del sistema
- **Diseño totalmente responsive** (media queries para móvil y escritorio)
- **17 páginas**: inicio, software (web, escritorio, automatización), sistemas, tutorías, cursos de ofimática, packs y contacto
- **Formularios funcionales** con Web3Forms + hCaptcha (`contratar.html` y `atencion-cliente.html`)
- **Metadatos SEO/Open Graph** para compartir en redes sociales y WhatsApp
- **Sin dependencias de build**: HTML, CSS y JavaScript puros

## 🚀 Desplegar en GitHub Pages

1. Crea un repositorio **público** llamado `technosoft-solutions` (puedes usar otro nombre, pero actualiza las URLs en `sitemap.xml`, `robots.txt` y los metadatos `og:image`).
2. Sube el contenido de esta carpeta a la raíz del repositorio (rama `main`).
3. En el repositorio: **Settings → Pages → Deploy from a branch → `main` → `/root`**.
4. El sitio quedará disponible en:
   `https://Technosoft-Solutions35.github.io/technosoft-solutions/`

## 🖥️ Ejecutar en local

Abre `index.html` directamente en el navegador o usa un servidor local:

```bash
# Opción 1: Python
python -m http.server 8080

# Opción 2: Node.js
npx serve .
```

Luego visita `http://127.0.0.1:8080`.

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 (variables, flexbox, grid, media queries)
- JavaScript vanilla (`js/config.js`, `js/main.js`)
- [Web3Forms](https://web3forms.com) para el envío de formularios
- hCaptcha para protección de formularios

## 📬 Contacto

- Correo: [technosoftsolutions35@gmail.com](mailto:technosoftsolutions35@gmail.com)
