# WAIA 2026 — cambios aplicados

## Objetivo

La interfaz activa se amplió para que WAIA funcione como guía turística digital: descubrimiento, información, planificación, experiencias y reservas.

## Frontend local

El `src/` raíz es la aplicación activa y utiliza datos locales + `localStorage`. No consume el backend durante la demo.

### LocalStorage principal

- `waia_user`
- `waia_users`
- `waia_bookings`
- `waia_favorites`
- `waia_itinerary`
- `waia_hosts`
- `waia_reviews`

## Funcionalidades añadidas

- Explorador global `/explorar`.
- Directorio por categoría.
- Cobertura territorial nacional.
- Detalle de destino `/destino/:id`.
- Mapa turístico `/mapa`.
- Itinerario `/mi-viaje`.
- Favoritos para lugares y experiencias.
- Home turística ampliada.
- Cuenta local turista.
- Dashboard local de anfitrión.
- Sistema SmartImage con fallback.
- Tema MUI WAIA.

## Backend preparado

Se conserva el backend PHP/MySQL heredado y se incorpora un modelo futuro en `database/waia.sql`.

El backend no es requisito para ejecutar la aplicación actual.
