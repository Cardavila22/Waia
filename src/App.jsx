import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppErrorBoundary from "./components/AppErrorBoundary";
import PageLoader from "./components/PageLoader";
import { api, storageKeys } from "./services/api";
import useLocalStorage from "./hooks/useLocalStorage";
import toast from "react-hot-toast";
import "./App.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Explore = lazy(() => import("./pages/Explore/Explore"));
const Experiences = lazy(() => import("./pages/Experiences/Experiences"));
const ExperienceDetail = lazy(() => import("./pages/ExperienceDetail/ExperienceDetail"));
const PlaceDetail = lazy(() => import("./pages/PlaceDetail/PlaceDetail"));
const CategoryPage = lazy(() => import("./pages/CategoryPage/CategoryPage"));
const Departments = lazy(() => import("./pages/Departments/Departments"));
const DepartmentDetails = lazy(() => import("./pages/DepartmentDetails/DepartmentDetails"));
const MapPage = lazy(() => import("./pages/Map/MapPage"));
const MyTrip = lazy(() => import("./pages/MyTrip/MyTrip"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
const Bookings = lazy(() => import("./pages/Bookings/Bookings"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Communities = lazy(() => import("./pages/Communities/Communities"));
const About = lazy(() => import("./pages/About/About"));
const HowItWorks = lazy(() => import("./pages/HowItWorks/HowItWorks"));
const Account = lazy(() => import("./pages/Account/Account"));
const HostLogin = lazy(() => import("./pages/HostDashboard/HostLogin"));
const HostDashboard = lazy(() => import("./pages/HostDashboard/HostDashboard"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

export default function App() {
  const [bookings, setBookings] = useLocalStorage(storageKeys.bookings, []);
  const [favorites, setFavorites] = useLocalStorage(storageKeys.favorites, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.currentUser().then(setUser).catch(() => setUser(null));
  }, []);

  const toggleFavorite = async (id, type = "experience") => {
    const key = `${type}:${id}`;
    const list = Array.isArray(favorites) ? favorites : [];
    const exists = list.includes(key) || list.includes(id);
    const next = exists ? list.filter((x) => x !== key && x !== id) : [...list, key];
    setFavorites(next);

    try {
      if (exists) await api.removeFavorite(user?.id || 1, id, type);
      else await api.addFavorite(user?.id || 1, id, type);
      toast.success(exists ? "Eliminado de favoritos" : "Guardado en favoritos");
    } catch (error) {
      console.error(error);
      setFavorites(list);
      toast.error("No se pudo guardar el favorito.");
    }
  };

  const handleBookingCreated = (booking) => {
    setBookings((current) => [...(Array.isArray(current) ? current : []), booking]);
  };

  const handleCancelBooking = async (id) => {
    const updated = await api.cancelBooking(id);
    setBookings(updated);
    toast.success("Reserva cancelada en modo local.");
  };

  return (
    <div className="waia-app">
      <ScrollToTop />
      <Header favoritesCount={favorites.length} bookings={bookings} />
      <main className="page-shell">
        <AppErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
              <Route path="/explorar" element={<Explore searchQuery={searchQuery} setSearchQuery={setSearchQuery} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
              <Route path="/experiencias" element={<Experiences searchQuery={searchQuery} setSearchQuery={setSearchQuery} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
              <Route path="/experiencias/:id" element={<ExperienceDetail onBookingCreated={handleBookingCreated} />} />
              <Route path="/destino/:id" element={<PlaceDetail favorites={favorites} onToggleFavorite={toggleFavorite} />} />
              <Route path="/destinos" element={<Navigate to="/departamentos" replace />} />
              <Route path="/departamentos" element={<Departments />} />
              <Route path="/departamentos/:slug" element={<DepartmentDetails favorites={favorites} onToggleFavorite={toggleFavorite} />} />
              <Route path="/mapa" element={<MapPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
              <Route path="/mi-viaje" element={<MyTrip />} />
              <Route path="/favoritos" element={<Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />} />
              <Route path="/reservas" element={<Bookings bookings={bookings} onCancel={handleCancelBooking} />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/comunidades" element={<Communities />} />
              <Route path="/sobre-waia" element={<About />} />
              <Route path="/como-funciona" element={<HowItWorks />} />
              <Route path="/cuenta" element={<Account user={user} onAuth={setUser} />} />
              <Route path="/anfitrion/login" element={<HostLogin />} />
              <Route path="/anfitrion/dashboard" element={<HostDashboard />} />
              {[
                ["/hospedaje", "hospedaje"],
                ["/restaurantes", "restaurantes"],
                ["/bares", "bares"],
                ["/cafeterias", "cafeterias"],
                ["/agencias", "agencias"],
                ["/tours", "tours"],
                ["/centros-recreativos", "centros-recreativos"],
                ["/transporte", "transporte"],
                ["/rent-a-car", "rent-a-car"],
                ["/guias", "guias"],
                ["/turismo-rural", "turismo-rural"],
              ].map(([path, category]) => (
                <Route key={path} path={path} element={<CategoryPage category={category} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
              ))}
              <Route path="/experiences" element={<Navigate to="/experiencias" replace />} />
              <Route path="/bookings" element={<Navigate to="/reservas" replace />} />
              <Route path="/favorites" element={<Navigate to="/favoritos" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
