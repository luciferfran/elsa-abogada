# Elsa Manzano Cubero — Abogada

Sitio web de presentación de **Elsa Manzano Cubero**, abogada en Burela (Lugo),
especializada en Derecho Civil, Familia, Penal y Violencia de Género.

🌐 **En producción:** https://emcabogados.es

## Características

- Página única (*one-page*) con secciones: inicio, sobre mí, áreas de especialización y contacto.
- Diseño responsive (móvil y escritorio).
- Formulario de contacto y enlace directo de llamada.
- Mapa de ubicación del despacho, que se carga sólo al pulsar.
- **PageSpeed Insights 100/100/100/100** en móvil y en escritorio.

## Stack

Sitio **estático puro**, sin dependencias ni paso de compilación:

| Fichero | Descripción |
|---|---|
| `index.html` | Estructura y contenido de la página. |
| `styles.css` | Estilos y declaraciones `@font-face` de las fuentes autoalojadas. |
| `script.js` | JavaScript vanilla (menú, scroll suave, animaciones con `IntersectionObserver`, carga del mapa bajo demanda). |
| `assets/` | Logo en WebP y JPEG. |
| `assets/fonts/` | Playfair Display e Inter autoalojadas (variables, `woff2`). |
| `vercel.json` | Cabeceras `Cache-Control` de los recursos estáticos. |

## Rendimiento

Resultados en PageSpeed Insights (agosto de 2026):

| Métrica | Móvil | Escritorio |
|---|---|---|
| Rendimiento | 100 | 100 |
| Accesibilidad | 100 | 100 |
| Prácticas recomendadas | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 0,8 s | 0,2 s |
| Largest Contentful Paint | 1,4 s | 0,3 s |
| Total Blocking Time | 0 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 1,6 s | 0,8 s |

La página pesa **101 KiB en 7 peticiones**, sin ningún recurso de terceros.

### Optimizaciones aplicadas

- **Mapa bajo demanda.** El `iframe` de Google Maps suponía 455 KiB de terceros y
  227 KiB de JavaScript sin usar en cada visita. Ahora se muestra un botón y el
  `iframe` se inserta sólo al pulsarlo (patrón *facade*).
- **Fuentes autoalojadas.** Playfair Display e Inter se sirven desde `assets/fonts/`
  en lugar de Google Fonts, en formato variable `woff2` y subdivididas por
  `unicode-range`. Elimina dos orígenes externos y reduce la cadena crítica de
  301 ms a 65 ms. Se precargan las variantes `latin` y se usa `font-display: swap`.
- **Logo optimizado.** Redimensionado a 176 px y servido en WebP con `<picture>` y
  respaldo JPEG: de 11,6 KB a 2,1 KB. Con `width`/`height` explícitos para evitar
  desplazamientos de diseño.
- **Contraste accesible.** El dorado corporativo no llegaba al mínimo AA sobre fondo
  claro (2,15:1). Se añadió la variable `--accent-text` para texto, con ratio 5,14:1.
  `--accent-color` se mantiene para bordes, fondos y adornos.
- **Animaciones sin parpadeo.** El contenido ya visible al cargar no recibe la clase
  `fade-in-up`: al aplicarla se devolvía a `opacity: 0` algo que el navegador acababa
  de pintar, lo que provocaba un destello y empeoraba el Speed Index. Los elementos
  por debajo del pliegue siguen animándose al hacer scroll.
- **Cabeceras de caché** (`vercel.json`): fuentes `immutable` durante un año, imágenes
  un día con `stale-while-revalidate` de una semana, y CSS y JS cinco minutos con
  `stale-while-revalidate` de un día. El HTML se revalida siempre, de modo que
  cualquier cambio publicado se ve de inmediato.

> Al no llevar *hash* en el nombre, `styles.css` y `script.js` pueden servirse desde
> la caché del navegador hasta cinco minutos después de un despliegue. Si haces un
> cambio en el que HTML y CSS deban ir sincronizados, verifícalo con una recarga forzada.

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

## Smoke test

Antes de publicar puedes ejecutar el smoke test (bash, sin dependencias), que
comprueba que el sitio se sirve, que el contenido clave está presente, que no hay
referencias ni anclas rotas y que no quedan textos placeholder:

```bash
./smoke-test.sh
```

Se ejecuta automáticamente en cada *push* y *pull request* a `main` mediante
GitHub Actions (`.github/workflows/smoke.yml`).

## Despliegue

La rama `main` es la de producción: al hacer *push* a `main`, los cambios se publican en https://emcabogados.es.

## Créditos

Diseño y desarrollo del sitio. Contenido © Elsa Manzano Cubero.
