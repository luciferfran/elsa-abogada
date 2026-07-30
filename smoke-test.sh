#!/usr/bin/env bash
#
# Smoke test para la web (sitio estático, sin dependencias).
# Comprueba invariantes básicas antes de publicar: que el sitio se sirve,
# que el contenido clave está presente, que no hay referencias rotas ni
# textos placeholder olvidados.
#
# Uso:  ./smoke-test.sh
# Requisitos: bash, curl y python3 (todos presentes en Linux/Mac y en CI).

set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HTML="$ROOT/index.html"
PORT="${PORT:-8123}"

fails=0
pass() { printf '  \033[32m✓\033[0m %s\n' "$1"; }
fail() { printf '  \033[31m✗\033[0m %s\n' "$1"; fails=$((fails + 1)); }

# Aserción: el fichero HTML contiene el patrón (grep -F literal por defecto).
has() { # has "descripción" "patrón" [grep-flags] — pasa si el patrón ESTÁ
  local desc="$1" pat="$2"; shift 2
  if grep -q "$@" -- "$pat" "$HTML"; then pass "$desc"; else fail "$desc"; fi
}

lacks() { # lacks "descripción" "patrón" [grep-flags] — pasa si el patrón NO está
  local desc="$1" pat="$2"; shift 2
  if grep -q "$@" -- "$pat" "$HTML"; then fail "$desc"; else pass "$desc"; fi
}

echo "Smoke test — $ROOT"

# ── 1. Ficheros esenciales ────────────────────────────────────────────
echo "[1/5] Ficheros esenciales"
for f in index.html styles.css script.js assets/logo.jpg; do
  if [ -f "$ROOT/$f" ]; then pass "existe $f"; else fail "falta $f"; fi
done

# ── 2. Referencias internas (href/src locales) no rotas ───────────────
echo "[2/5] Referencias internas"
refs=$(grep -oE '(href|src)="[^"]+"' "$HTML" | sed -E 's/^(href|src)="//; s/"$//' | sort -u)
while IFS= read -r ref; do
  case "$ref" in
    http://*|https://*|//*|mailto:*|tel:*|\#*|data:*|"") continue ;;
  esac
  path="${ref%%[?#]*}"                       # quita query/fragment
  if [ -f "$ROOT/$path" ]; then pass "referencia OK: $ref"; else fail "referencia ROTA: $ref"; fi
done <<< "$refs"

# ── 3. Anclas internas (#id) con destino existente ────────────────────
echo "[3/5] Anclas internas"
anchors=$(grep -oE 'href="#[a-zA-Z0-9_-]+"' "$HTML" | sed -E 's/href="#//; s/"$//' | sort -u)
while IFS= read -r a; do
  [ -z "$a" ] && continue
  if grep -q "id=\"$a\"" "$HTML"; then pass "ancla #$a → id existe"; else fail "ancla #$a sin id destino"; fi
done <<< "$anchors"

# ── 4. Contenido y accesibilidad clave ────────────────────────────────
echo "[4/5] Contenido clave"
has "título con el nombre"        'Elsa Manzano Cubero'
has "idioma español (lang=es)"    'lang="es"' -F
has "meta description"            'name="description"' -F
has "CTA Solicitar Consulta"      'Solicitar Consulta'
has "enlace de teléfono"          'tel:663389819' -F
has "formulario de contacto"      'id="contact-form"' -F
has "select con aria-label"       'id="subject" name="subject" required aria-label=' -F
lacks "sin favicon mal tipado"    'type="image/png" href="assets/logo.jpg"' -F

# Placeholders olvidados (lorem/ipsum sin distinguir mayúsculas; TODO/FIXME/etc. literales)
if grep -qiE 'lorem|ipsum' "$HTML" || grep -qE 'TODO|FIXME|XXXXX|CHANGEME|PLACEHOLDER' "$HTML"; then
  fail "hay texto placeholder olvidado (lorem/ipsum/TODO/FIXME…)"
else
  pass "sin placeholders olvidados"
fi

# ── 5. El sitio se sirve (HTTP 200) ───────────────────────────────────
echo "[5/5] Sirviendo el sitio (HTTP 200)"
if command -v python3 >/dev/null 2>&1 && command -v curl >/dev/null 2>&1; then
  python3 -m http.server "$PORT" --directory "$ROOT" >/dev/null 2>&1 &
  srv=$!
  trap 'kill "$srv" 2>/dev/null' EXIT
  for _ in $(seq 1 25); do
    curl -sf "http://localhost:$PORT/index.html" >/dev/null 2>&1 && break
    sleep 0.2
  done
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$PORT/index.html")
  if [ "$code" = "200" ]; then pass "GET /index.html → 200"; else fail "GET /index.html → $code"; fi
else
  fail "faltan python3 y/o curl para el chequeo HTTP"
fi

# ── Resultado ─────────────────────────────────────────────────────────
echo
if [ "$fails" -eq 0 ]; then
  printf '\033[32mSmoke test OK\033[0m — todas las comprobaciones pasaron.\n'
  exit 0
else
  printf '\033[31mSmoke test FALLÓ\033[0m — %d comprobación(es) fallida(s).\n' "$fails"
  exit 1
fi
