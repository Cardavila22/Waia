/**
 * ==========================================================
 * WAIA
 * Funciones auxiliares reutilizables
 * ==========================================================
 */

/**
 * Genera un ID único para una reserva.
 *
 * Ejemplo:
 * BK-1721435489213-X7F4A
 */
export function generateBookingId() {
  const random = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase();

  return `BK-${Date.now()}-${random}`;
}

/**
 * Formatea un precio.
 *
 * @param {number} value
 * @param {string} currency
 * @param {string} locale
 */
export function formatPrice(
  value,
  currency = "USD",
  locale = "es-NI"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

/**
 * Convierte una fecha ISO
 * a formato español.
 *
 * 2026-07-20
 * ↓
 * 20 de julio de 2026
 */
export function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("es-NI", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Fecha + Hora
 */
export function formatDateTime(date) {
  if (!date) return "";

  return new Date(date).toLocaleString("es-NI", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

/**
 * USD → Córdoba
 *
 * Tipo de cambio configurable.
 */
export function usdToNio(
  usd,
  exchangeRate = 36.62
) {
  return Number((usd * exchangeRate).toFixed(2));
}

/**
 * Córdoba → USD
 */
export function nioToUsd(
  nio,
  exchangeRate = 36.62
) {
  return Number((nio / exchangeRate).toFixed(2));
}

/**
 * Capitaliza un texto.
 *
 * hola mundo
 * ↓
 * Hola mundo
 */
export function capitalize(text = "") {
  if (!text) return "";

  return text.charAt(0).toUpperCase() +
    text.slice(1);
}

/**
 * Recorta un texto largo.
 */
export function truncate(
  text = "",
  maxLength = 120
) {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength) + "...";
}

/**
 * Formatea coordenadas.
 */
export function formatCoordinates({
  lat,
  lng,
}) {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

/**
 * Calcula porcentaje.
 */
export function percentage(
  value,
  total
) {
  if (!total) return 0;

  return ((value / total) * 100).toFixed(1);
}

/**
 * Agrupa elementos por propiedad.
 */
export function groupBy(array, key) {
  return array.reduce((acc, item) => {
    const group = item[key];

    if (!acc[group]) {
      acc[group] = [];
    }

    acc[group].push(item);

    return acc;
  }, {});
}

/**
 * Ordena alfabéticamente.
 */
export function sortAlphabetically(
  array,
  property
) {
  return [...array].sort((a, b) =>
    a[property].localeCompare(
      b[property],
      "es"
    )
  );
}

/**
 * Número aleatorio.
 */
export function randomBetween(
  min,
  max
) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}

/**
 * Espera asíncrona.
 */
export function delay(ms = 500) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}