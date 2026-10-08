import experiencesData from "../data/experiencesData";
import placesData from "../data/placesData";
import { departmentsData, municipalitiesData } from "../data/nicaraguaTerritory";
import { tourismCategories } from "../data/tourismCategories";

export const API_BASE_URL = import.meta.env.VITE_API_URL || null;
export const USE_API = import.meta.env.VITE_USE_API === "true";

const KEYS = {
  users: "waia_users",
  user: "waia_user",
  bookings: "waia_bookings",
  favorites: "waia_favorites",
  itinerary: "waia_itinerary",
  hosts: "waia_hosts",
  reviews: "waia_reviews",
  contacts: "waia_contacts",
};

const sleep = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

function read(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "null");
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function ensureSeed() {
  try {
  if (!localStorage.getItem(KEYS.users)) {
    write(KEYS.users, [{ id: 1, name: "Turista Demo", email: "turista@waia.local", password: "WaiaDemo2026!", role: "turista", createdAt: new Date().toISOString() }]);
  }
  if (!localStorage.getItem(KEYS.hosts)) {
    write(KEYS.hosts, [{ id: 1, userId: 1, name: "Anfitrión WAIA Demo", email: "anfitrion@waia.local", password: "WaiaHost2026!", description: "Perfil local de demostración para el dashboard de anfitriones.", services: ["Experiencias", "Tours"], experiences: experiencesData.filter((item) => item.department === "León").slice(0, 4).map((item) => item.id) }]);
  }
  if (!localStorage.getItem(KEYS.bookings)) write(KEYS.bookings, []);
  if (!localStorage.getItem(KEYS.favorites)) write(KEYS.favorites, []);
  if (!localStorage.getItem(KEYS.itinerary)) write(KEYS.itinerary, { id: "trip-1", name: "Mi viaje a Nicaragua", items: [] });
  if (!localStorage.getItem(KEYS.reviews)) write(KEYS.reviews, []);
  if (!localStorage.getItem(KEYS.contacts)) write(KEYS.contacts, []);
  } catch (error) {
    console.warn("WAIA: no se pudo inicializar el almacenamiento local. La interfaz continuará en modo lectura.", error);
  }
}

ensureSeed();

function textMatches(item, query) {
  if (!query) return true;
  const text = [item.name, item.title, item.category, item.categoryLabel, item.department, item.municipality, item.location, item.host, item.description, item.shortDescription, ...(item.tags || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return text.includes(query.toLowerCase());
}

export const api = {
  async getExperiences(filters = {}) {
    await sleep();
    let data = [...experiencesData];
    if (filters.category && filters.category !== "Todas") data = data.filter((item) => item.category === filters.category);
    if (filters.department) data = data.filter((item) => item.department === filters.department);
    if (filters.municipality) data = data.filter((item) => item.municipality === filters.municipality);
    if (filters.query) data = data.filter((item) => textMatches(item, filters.query));
    if (filters.sort === "price-asc") data.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") data.sort((a, b) => b.price - a.price);
    return { data: filters.limit ? data.slice(0, filters.limit) : data, total: data.length };
  },

  async getExperience(id) {
    await sleep();
    return experiencesData.find((item) => String(item.id) === String(id)) || null;
  },

  async getPlaces(filters = {}) {
    await sleep();
    let data = [...placesData];
    if (filters.category && filters.category !== "todas") data = data.filter((item) => item.category === filters.category || item.categoryLabel?.toLowerCase() === filters.category.toLowerCase());
    if (filters.department) data = data.filter((item) => item.department === filters.department);
    if (filters.municipality) data = data.filter((item) => item.municipality === filters.municipality);
    if (filters.query) data = data.filter((item) => textMatches(item, filters.query));
    if (filters.sort === "rating") data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return { data, total: data.length };
  },

  async getPlace(id) {
    await sleep();
    return placesData.find((item) => String(item.id) === String(id)) || null;
  },

  async getCategories() { await sleep(); return tourismCategories; },
  async getDepartments() { await sleep(); return departmentsData; },
  async getMunicipalities(department) { await sleep(); return department ? municipalitiesData.filter((item) => item.department === department) : municipalitiesData; },

  async createBooking(payload) {
    await sleep(180);
    const list = read(KEYS.bookings, []);
    const now = new Date();
    const booking = {
      ...payload,
      id: `WAIA-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      status: "confirmed",
      createdAt: now.toISOString(),
    };
    write(KEYS.bookings, [...list, booking]);
    return booking;
  },

  async getBookings() { await sleep(); return read(KEYS.bookings, []); },
  async cancelBooking(id) { await sleep(); const list = read(KEYS.bookings, []); const updated = list.map((item) => item.id === id ? { ...item, status: "cancelled" } : item); write(KEYS.bookings, updated); return updated; },

  async getFavorites() { await sleep(); return read(KEYS.favorites, []); },
  async addFavorite(userId, itemId, type = "experience") { await sleep(); const list = read(KEYS.favorites, []); const key = `${type}:${itemId}`; const next = list.includes(key) || list.includes(itemId) ? list : [...list, key]; write(KEYS.favorites, next); return next; },
  async removeFavorite(userId, itemId, type = "experience") { await sleep(); const key = `${type}:${itemId}`; const next = read(KEYS.favorites, []).filter((item) => item !== key && item !== itemId); write(KEYS.favorites, next); return next; },

  async sendContact(form) { await sleep(150); const list = read(KEYS.contacts, []); write(KEYS.contacts, [...list, { ...form, id: Date.now(), createdAt: new Date().toISOString() }]); return { ok: true }; },

  async register(data) {
    await sleep(180);
    const users = read(KEYS.users, []);
    if (users.some((user) => user.email.toLowerCase() === data.email.toLowerCase())) throw new Error("Ese correo ya está registrado en modo local.");
    const user = { id: Date.now(), ...data, createdAt: new Date().toISOString() };
    write(KEYS.users, [...users, user]);
    write(KEYS.user, { id: user.id, name: user.name, email: user.email, role: user.role });
    return user;
  },

  async login(email, password) {
    await sleep(180);
    const user = read(KEYS.users, []).find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
    if (!user) throw new Error("Correo o contraseña incorrectos en el modo local.");
    const session = { id: user.id, name: user.name, email: user.email, role: user.role };
    write(KEYS.user, session);
    return session;
  },

  async currentUser() { await sleep(); return read(KEYS.user, null); },
  async logout() { localStorage.removeItem(KEYS.user); },

  async getItinerary() { await sleep(); return read(KEYS.itinerary, { id: "trip-1", name: "Mi viaje a Nicaragua", items: [] }); },
  async saveItinerary(payload) { await sleep(); write(KEYS.itinerary, payload); return payload; },

  async hostLogin(email, password) {
    await sleep(180);
    const host = read(KEYS.hosts, []).find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
    if (!host) throw new Error("Credenciales del anfitrión demo incorrectas.");
    write("waia_host_session", { id: host.id, name: host.name, email: host.email });
    return host;
  },
  async hostSession() { await sleep(); return read("waia_host_session", null); },
  async hostLogout() { localStorage.removeItem("waia_host_session"); },
  async hostDashboard() {
    await sleep();
    const host = read(KEYS.hosts, [])[0];
    const bookings = read(KEYS.bookings, []);
    const hostExperienceIds = host?.experiences || [];
    const hostExperiences = experiencesData.filter((item) => hostExperienceIds.includes(item.id));
    const hostBookings = bookings.filter((booking) => hostExperienceIds.includes(booking.experienceId));
    const revenue = hostBookings.filter((item) => item.status === "confirmed").reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.guests) || 1), 0);
    return { host, experiences: hostExperiences, bookings: hostBookings, revenue };
  },
  async hostUpdateBooking(id, status) { await sleep(); const list = read(KEYS.bookings, []); const updated = list.map((item) => item.id === id ? { ...item, status } : item); write(KEYS.bookings, updated); return updated; },
  async hostUpdateProfile(updates) { await sleep(); const hosts = read(KEYS.hosts, []); const updated = hosts.map((item) => item.id === 1 ? { ...item, ...updates } : item); write(KEYS.hosts, updated); return updated[0]; },
};

export const storageKeys = KEYS;
