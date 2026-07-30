# Elsa Manzano Cubero — Abogada

Sitio web de presentación de **Elsa Manzano Cubero**, abogada en Burela (Lugo),
especializada en Derecho Civil, Familia, Penal y Violencia de Género.

🌐 **En producción:** https://emcabogados.es

## Características

- Página única (*one-page*) con secciones: inicio, sobre mí, áreas de especialización y contacto.
- Diseño responsive (móvil y escritorio).
- Formulario de contacto y enlace directo de llamada.
- Mapa de ubicación del despacho.
- **Lighthouse 100/100/100/100** (Accesibilidad, Buenas Prácticas, SEO y Agentic Browsing) con Core Web Vitals excelentes.

## Stack

Sitio **estático puro**, sin dependencias ni paso de compilación:

| Fichero | Descripción |
|---|---|
| `index.html` | Estructura y contenido de la página. |
| `styles.css` | Estilos. Fuentes vía Google Fonts (Playfair Display + Inter). |
| `script.js` | JavaScript vanilla (menú, scroll suave, animaciones con `IntersectionObserver`). |
| `assets/` | Imágenes (logo). |

## Desarrollo local

No hace falta instalar nada. Basta con servir la carpeta con cualquier servidor estático:

```bash
# Con Python
python3 -m http.server 8000

# Con Node
npx serve
```

Luego abre http://localhost:8000 en el navegador.
También puedes abrir `index.html` directamente, aunque un servidor local reproduce mejor el comportamiento real.

## Despliegue

La rama `main` es la de producción: al hacer *push* a `main`, los cambios se publican en https://emcabogados.es.

## Créditos

Diseño y desarrollo del sitio. Contenido © Elsa Manzano Cubero.
