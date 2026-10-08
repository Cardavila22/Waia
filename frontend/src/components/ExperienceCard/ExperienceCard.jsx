import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

/* ==========================================
   MATERIAL UI ICONS
========================================== */

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SellIcon from "@mui/icons-material/Sell";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/* ==========================================
   UTILS
========================================== */

import { formatPrice } from "../../utils/helpers";

/* ==========================================
   STYLES
========================================== */

import "./ExperienceCard.css";


function ExperienceCard({ experience }) {

  const navigate = useNavigate();


  /* ==========================================
     NAVEGAR A DETALLE DE EXPERIENCIA
  ========================================== */

  const handleDiscover = () => {

    navigate(`/experiencias/${experience.id}`);

  };


  /* ==========================================
     RENDER
  ========================================== */

  return (

    <article className="experience-card">

      {/* ======================================
          IMAGEN
      ====================================== */}

      <div className="experience-card-image-wrapper">

        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="experience-card-image"
          loading="lazy"
        />


        {/* Overlay */}

        <div className="experience-card-overlay"></div>


        {/* ==================================
            CATEGORÍA
        ================================== */}

        <span className="experience-card-category">

          <SellIcon fontSize="small" />

          {experience.category}

        </span>


        {/* ==================================
            FAVORITO
        ================================== */}

        <button
          type="button"
          className="favorite-card-button"
          aria-label={`Agregar ${experience.title} a favoritos`}
        >

          <FavoriteBorderIcon />

        </button>

      </div>


      {/* ======================================
          CONTENIDO
      ====================================== */}

      <div className="experience-card-content">


        {/* Marca */}

        <span className="experience-card-brand">
          WAIA EXPERIENCE
        </span>


        {/* ==================================
            TÍTULO
        ================================== */}

        <h3 className="experience-card-title">

          {experience.title}

        </h3>


        {/* ==================================
            INFORMACIÓN
        ================================== */}

        <div className="experience-card-info">


          {/* Ubicación */}

          <div className="experience-card-info-item">

            <LocationOnIcon />

            <span>
              {experience.location}
            </span>

          </div>


          {/* Anfitrión */}

          <div className="experience-card-info-item">

            <PersonIcon />

            <span>
              {experience.host}
            </span>

          </div>


        </div>


        {/* ==================================
            DESCRIPCIÓN
        ================================== */}

        <p className="experience-card-description">

          {experience.shortDescription}

        </p>


        {/* ======================================
            FOOTER
        ====================================== */}

        <div className="experience-card-footer">


          {/* PRECIO */}

          <div className="experience-card-price">

            <span className="price-label">
              Desde
            </span>

            <strong>
              {formatPrice(experience.price)}
            </strong>

          </div>


          {/* ==================================
              BOTÓN
          ================================== */}

          <button
            type="button"
            className="discover-btn"
            onClick={handleDiscover}
          >

            <span>
              Descubrir
            </span>

            <ArrowForwardIcon />

          </button>


        </div>

      </div>

    </article>

  );

}


/* ==========================================
   PROP TYPES
========================================== */

ExperienceCard.propTypes = {

  experience: PropTypes.shape({

    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,

    title: PropTypes.string.isRequired,

    category: PropTypes.string.isRequired,

    location: PropTypes.string.isRequired,

    host: PropTypes.string.isRequired,

    price: PropTypes.number.isRequired,

    shortDescription: PropTypes.string.isRequired,

    imageUrl: PropTypes.string.isRequired,

  }).isRequired,

};


/* ==========================================
   EXPORT
========================================== */

export default ExperienceCard;