import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import LocalBarRoundedIcon from "@mui/icons-material/LocalBarRounded";
import CoffeeRoundedIcon from "@mui/icons-material/CoffeeRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import NaturePeopleRoundedIcon from "@mui/icons-material/NaturePeopleRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { api } from "../../services/api";
import Hero from "../../components/Hero/Hero";
import NicaraguaExplorer from "../../components/NicaraguaExplorer/NicaraguaExplorer";
import ExperienceCard from "../../components/ExperienceCard/ExperienceCard";
import PlaceCard from "../../components/PlaceCard/PlaceCard";
import TourismMap from "../../components/TourismMap/TourismMap";
import { tourismCategories } from "../../data/tourismCategories";
import "./Home.css";

const iconMap = {
  hospedaje: HotelRoundedIcon,
  restaurantes: RestaurantRoundedIcon,
  bares: LocalBarRoundedIcon,
  cafeterias: CoffeeRoundedIcon,
  agencias: TravelExploreRoundedIcon,
  tours: ExploreRoundedIcon,
  "centros-recreativos": ExploreRoundedIcon,
  transporte: DirectionsCarRoundedIcon,
  "rent-a-car": DirectionsCarRoundedIcon,
  guias: TravelExploreRoundedIcon,
  "turismo-rural": NaturePeopleRoundedIcon,
};

export default function Home({ searchQuery = "", setSearchQuery, favorites = [], onToggleFavorite }) {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    Promise.all([api.getExperiences({ limit: 8 }), api.getPlaces({})]).then(([e, p]) => {
      setExperiences(e.data || []);
      setPlaces((p.data || []).filter((item) => item.category === "destino").slice(0, 6));
    });
  }, []);

  return (
    <>
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={() => navigate(`/explorar?q=${encodeURIComponent(searchQuery)}`)}
      />

      <section className="section-sm home-quick">
        <div className="container-custom home-quick__grid">
          {tourismCategories.map((category) => {
            const Icon = iconMap[category.key] || ExploreRoundedIcon;
            return (
              <Link className="home-quick__item" to={category.path} key={category.key}>
                <span><Icon /></span>
                <div><strong>{category.label}</strong><small>{category.description}</small></div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="section-head"><div><span className="pill">Descubre Nicaragua</span><h2 className="section-title">Encuentra tu próximo lugar favorito</h2><p className="section-subtitle">Comienza por un departamento, un municipio, una categoría o una idea.</p></div><Link to="/departamentos" className="section-link">Ver territorio completo →</Link></div>
          <NicaraguaExplorer />
        </div>
      </section>

      <section className="section home-destinations">
        <div className="container-custom">
          <div className="section-head"><div><span className="pill">Destinos</span><h2 className="section-title">Lugares que cuentan historias</h2><p className="section-subtitle">Paisajes, ciudades y espacios para inspirarte.</p></div><Link to="/mapa" className="section-link">Abrir mapa →</Link></div>
          <div className="home-destinations__grid">{places.map((place) => <PlaceCard key={place.id} place={place} favorite={favorites.includes(`place:${place.id}`) || favorites.includes(place.id)} onToggleFavorite={onToggleFavorite} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="section-head"><div><span className="pill">Experiencias</span><h2 className="section-title">Vive Nicaragua</h2><p className="section-subtitle">Aventura, cultura, gastronomía, naturaleza y comunidad.</p></div><Link to="/experiencias" className="section-link">Ver todas →</Link></div>
          <div className="experience-grid">{experiences.slice(0, 6).map((experience) => <motion.div key={experience.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .35 }}><ExperienceCard experience={experience} isFavorite={favorites.includes(`experience:${experience.id}`) || favorites.includes(experience.id)} onToggleFavorite={onToggleFavorite} /></motion.div>)}</div>
        </div>
      </section>

      <section className="section home-map">
        <div className="container-custom">
          <div className="home-map__header"><div><span className="pill">Mapa turístico</span><h2 className="section-title">Mira Nicaragua en contexto</h2><p className="section-subtitle">Conecta lugares y experiencias en un mismo recorrido.</p></div><Link to="/mapa" className="waia-btn-primary">Abrir mapa completo</Link></div>
          <TourismMap places={[...places, ...experiences.slice(0, 6)]} height={480} />
        </div>
      </section>

      <section className="section home-planner"><div className="container-custom home-planner__box"><div><span className="pill">Planifica tu viaje</span><h2 className="section-title">¿No sabes por dónde empezar?</h2><p>Elige una duración y organiza ideas con <strong>Mi viaje</strong>. Todo queda guardado localmente.</p></div><div className="home-planner__actions">{["1 día", "Fin de semana", "3 días", "5 días", "7 días"].map((label) => <button key={label} onClick={() => navigate("/mi-viaje")}>{label}<ScheduleRoundedIcon fontSize="small" /></button>)}</div></div></section>

      <section className="section home-story">
        <div className="container-custom home-story__grid">
          <div className="home-story__copy"><span className="pill">Qué es WAIA</span><h2 className="section-title">Una guía digital para descubrir Nicaragua de una manera diferente.</h2><p>WAIA acompaña al turista desde la inspiración hasta la reserva: descubrir, explorar, comparar, planificar, elegir y disfrutar.</p><div className="home-story__steps">{[["01", "Descubre"], ["02", "Explora"], ["03", "Planifica"], ["04", "Reserva"]].map(([num, label]) => <div key={num}><b>{num}</b><span>{label}</span></div>)}</div><Link to="/sobre-waia" className="waia-btn-primary">Conoce más sobre WAIA</Link></div>
          <div className="home-story__media"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Catedral%20Le%C3%B3n%2C%20Nicaragua%20por%20Richard%20Weiss.JPG?width=1400" alt="Centro histórico de León" loading="lazy" /><div className="home-story__badge"><strong>Turismo + Cultura + Comunidad</strong><span>Una plataforma pensada para el visitante.</span></div></div>
        </div>
      </section>

      <section className="section home-cta"><div className="container-custom home-cta__inner"><div><span className="pill">Empieza ahora</span><h2>Comienza a explorar Nicaragua</h2><p>Descubre lugares increíbles, experiencias auténticas y servicios turísticos en un solo lugar.</p></div><Link to="/explorar" className="home-cta__btn">Explorar ahora <TravelExploreRoundedIcon /></Link></div></section>
    </>
  );
}
