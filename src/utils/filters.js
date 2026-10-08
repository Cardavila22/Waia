/**
 * ==========================================================
 * WAIA
 * Utilidades de filtrado
 * ==========================================================
 */

/**
 * Filtra experiencias por búsqueda y categoría.
 *
 * @param {Array} experiences
 * @param {string} searchQuery
 * @param {string} selectedCategory
 * @returns {Array}
 */
export function filterExperiences(
  experiences,
  searchQuery = "",
  selectedCategory = "Todas"
) {
  const query = searchQuery.trim().toLowerCase();

  return experiences.filter((experience) => {
    // Filtrar por categoría
    const matchesCategory =
      selectedCategory === "Todas" ||
      experience.category === selectedCategory;

    // Filtrar por texto
    const matchesSearch =
      query === "" ||
      experience.title.toLowerCase().includes(query) ||
      experience.host.toLowerCase().includes(query) ||
      experience.location.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}

/**
 * Genera automáticamente el listado de categorías.
 *
 * @param {Array} experiences
 * @returns {Array}
 */
export function getCategories(experiences) {
  const categories = experiences.map(
    (experience) => experience.category
  );

  return ["Todas", ...new Set(categories)];
}

/**
 * Devuelve una experiencia por ID.
 *
 * @param {Array} experiences
 * @param {number|string} id
 * @returns {Object|null}
 */
export function getExperienceById(experiences, id) {
  return (
    experiences.find(
      (experience) => String(experience.id) === String(id)
    ) || null
  );
}

/**
 * Obtiene todas las experiencias de una categoría.
 *
 * @param {Array} experiences
 * @param {string} category
 * @returns {Array}
 */
export function getExperiencesByCategory(
  experiences,
  category
) {
  if (category === "Todas") {
    return experiences;
  }

  return experiences.filter(
    (experience) => experience.category === category
  );
}

/**
 * Ordena experiencias por precio.
 *
 * @param {Array} experiences
 * @param {"asc"|"desc"} order
 * @returns {Array}
 */
export function sortByPrice(
  experiences,
  order = "asc"
) {
  const sorted = [...experiences];

  return sorted.sort((a, b) =>
    order === "asc"
      ? a.price - b.price
      : b.price - a.price
  );
}