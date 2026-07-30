# AGENTS.md

Instrucciones para agentes de IA que trabajen en este repositorio.

## Proyecto

Web de presentación de **Elsa Manzano Cubero**, abogada en Burela (Lugo), especializada
en Derecho Civil, Familia, Penal y Violencia de Género.

- Sitio en producción: https://emcabogados.es
- Idioma del contenido: español (`<html lang="es">`)

## Stack

Sitio **estático puro**, sin build ni dependencias:

- `index.html` — página única (one-page con secciones: inicio, servicios, sobre mí, contacto).
- `styles.css` — estilos. Fuentes vía Google Fonts (Playfair Display + Inter).
- `script.js` — JavaScript vanilla (menú, scroll, `IntersectionObserver` para animaciones). Sin librerías externas.
- `assets/` — imágenes (`logo.jpg`).

No hay `package.json`, framework, ni paso de compilación.

## Cómo trabajar

- **Editar directamente** los ficheros HTML/CSS/JS. No inventes un sistema de build.
- Para previsualizar en local basta con abrir `index.html` en el navegador (o servir la carpeta con cualquier servidor estático).
- Mantén el HTML **accesible**: usa `aria-label`, `alt` en imágenes y estructura semántica (ya se usa a lo largo del sitio).
- Conserva el estilo y la nomenclatura de clases CSS existentes (BEM-ish: `hero-title`, `nav-logo`, `btn btn-primary`, etc.).
- Los textos de cara al público van en español y con tono profesional.

## Despliegue

`main` es la rama de producción: al hacer `push` a `main`, los cambios quedan publicados en https://emcabogados.es.
Verifica cambios importantes contra la web en producción tras el push.

## Git

- Nombre: `luciferfran` · Email: `luciferfran@gmail.com`
- Commits en español, concisos y descriptivos.
