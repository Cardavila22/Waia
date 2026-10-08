import {
  useState,
  useEffect,
  useRef
} from "react";

import PropTypes from "prop-types";


/* ==========================================
   MATERIAL UI ICONS
========================================== */

import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PaidIcon from "@mui/icons-material/Paid";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import GroupsIcon from "@mui/icons-material/Groups";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";



/* ==========================================
   REACT LEAFLET
========================================== */


import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";


import L from "leaflet";




/* ==========================================
   TOAST
========================================== */


import toast from "react-hot-toast";





/* ==========================================
   HELPERS
========================================== */


import {
  formatPrice,
  formatCoordinates,
} from "../../utils/helpers";



import "./DetailModal.css";






/* ==========================================
   LEAFLET ICON CONFIGURATION
========================================== */


import markerIcon2x from
"leaflet/dist/images/marker-icon-2x.png";


import markerIcon from
"leaflet/dist/images/marker-icon.png";


import markerShadow from
"leaflet/dist/images/marker-shadow.png";





delete L.Icon.Default.prototype._getIconUrl;



L.Icon.Default.mergeOptions({

  iconRetinaUrl: markerIcon2x,

  iconUrl: markerIcon,

  shadowUrl: markerShadow,

});








/* ==========================================
   GENERADOR CÓDIGO RESERVA WAIA
========================================== */


const generateReservationCode = () => {


  const random = Math.random()

    .toString(36)

    .substring(2,7)

    .toUpperCase();



  return `WAIA-LEON-${random}`;

};









function DetailModal({

  experience,

  isOpen,

  onClose,

  handleBooking,


}) {



/* ==========================================
   SEGURIDAD
========================================== */


if(!experience){

  return null;

}






/* ==========================================
   REFERENCES
========================================== */


const modalRef = useRef(null);









/* ==========================================
   FORM STATE WAIA
========================================== */


const [bookingData,setBookingData] = useState({


  name:"",


  email:"",


  date:"",


  guests:1,


});





const [errors,setErrors] = useState({});





const [isFavorite,setIsFavorite] = useState(false);









/* ==========================================
   BLOQUEAR SCROLL AL ABRIR
========================================== */


useEffect(()=>{


  if(isOpen){


    document.body.style.overflow = "hidden";


  }



  return()=>{


    document.body.style.overflow = "auto";


  };


},[isOpen]);









/* ==========================================
   CERRAR CON ESCAPE
========================================== */


useEffect(()=>{



  const handleEscape = (event)=>{



    if(event.key==="Escape"){


      onClose();


    }


  };




  if(isOpen){


    document.addEventListener(

      "keydown",

      handleEscape

    );


  }




  return()=>{


    document.removeEventListener(

      "keydown",

      handleEscape

    );


  };




},[
  isOpen,
  onClose
]);









/* ==========================================
   CERRAR CLICK FUERA
========================================== */


const handleOverlayClick = (event)=>{


  if(

    modalRef.current &&

    !modalRef.current.contains(
      event.target
    )

  ){


    onClose();


  }


};









/* ==========================================
   CONTROL INPUTS
========================================== */


const handleChange = (event)=>{


  const {

    name,

    value

  } = event.target;




  setBookingData((prev)=>({


    ...prev,


    [name]:value,


  }));





  if(errors[name]){


    setErrors((prev)=>({


      ...prev,


      [name]:"",


    }));


  }


};









/* ==========================================
   VALIDACIÓN FORMULARIO
========================================== */


const validateForm = ()=>{


  const newErrors = {};




  if(!bookingData.name.trim()){


    newErrors.name =
    "Ingrese su nombre completo.";


  }







  if(!bookingData.email.trim()){


    newErrors.email =
    "Ingrese un correo electrónico.";


  }


  else{


    const regex =

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    if(!regex.test(
      bookingData.email
    )){


      newErrors.email =
      "Correo electrónico inválido.";


    }


  }








  if(!bookingData.date){


    newErrors.date =
    "Seleccione una fecha.";


  }







  if(
    bookingData.guests < 1
  ){


    newErrors.guests =
    "Debe seleccionar al menos una persona.";


  }








  setErrors(newErrors);



  return Object.keys(newErrors).length === 0;


};









/* ==========================================
   FAVORITOS
========================================== */


const toggleFavorite = ()=>{


  setIsFavorite((prev)=>!prev);



  if(!isFavorite){


    toast.success(
      "Experiencia guardada en favoritos ❤️"
    );


  }
  else{


    toast(
      "Experiencia eliminada de favoritos"
    );


  }


};









/* ==========================================
   RESERVA
========================================== */


const handleSubmit = (event)=>{


  event.preventDefault();





  if(!validateForm()){


    toast.error(
      "Complete correctamente el formulario."
    );


    return;


  }






  const reservation = {


    id:
    crypto.randomUUID(),



    reservationCode:
    generateReservationCode(),



    experienceId:
    experience.id,



    experienceTitle:
    experience.title,



    category:
    experience.category,



    location:
    experience.location,



    host:
    experience.host,



    price:
    experience.price,



    guests:
    bookingData.guests,



    customerName:
    bookingData.name,



    customerEmail:
    bookingData.email,



    visitDate:
    bookingData.date,



    createdAt:
    new Date().toISOString(),


  };







  handleBooking(reservation);






  toast.success(

    `Reserva confirmada ${reservation.reservationCode}`

  );






  setBookingData({

    name:"",

    email:"",

    date:"",

    guests:1,

  });






  setErrors({});






  onClose();


};
/* ==========================================
   RENDER MODAL
========================================== */


return (

<div

className={`modal-overlay ${
  isOpen ? "show" : ""
}`}

onClick={handleOverlayClick}

>


<div

ref={modalRef}

className={`detail-modal ${
  isOpen ? "show" : ""
}`}

>



{/* ======================================
    BOTÓN CERRAR
====================================== */}


<button

className="close-button"

onClick={onClose}

type="button"

aria-label="Cerrar modal"

>

<CloseIcon />

</button>






{/* ======================================
    IMAGEN EXPERIENCIA
====================================== */}



<div className="modal-image">



<img

src={experience.imageUrl}

alt={experience.title}

loading="lazy"

/>




<div className="image-overlay"></div>




<button

className={`favorite-button ${
isFavorite ? "active" : ""
}`}

onClick={toggleFavorite}

type="button"

>

<FavoriteBorderIcon />


</button>






<span className="modal-category">


<TravelExploreIcon fontSize="small"/>


{experience.category}


</span>



</div>








{/* ======================================
    CUERPO MODAL
====================================== */}


<div className="modal-body">






<div className="modal-header">



<div>


<span className="waia-label">

WAIA EXPERIENCE

</span>



<h2>

{experience.title}

</h2>



<p className="experience-location">


<LocationOnIcon />


{experience.location}


</p>


</div>






<div className="modal-price">


<small>

Desde

</small>


<strong>

{formatPrice(
experience.price
)}

</strong>


<span>

por persona

</span>


</div>



</div>









{/* ======================================
 INFORMACIÓN PRINCIPAL
====================================== */}



<div className="modal-info">





<div className="info-item">


<LocationOnIcon />


<div>


<strong>

Ubicación

</strong>


<span>

{experience.location}

</span>


</div>


</div>







<div className="info-item">


<PersonIcon />


<div>


<strong>

Anfitrión

</strong>


<span>

{experience.host}

</span>


</div>


</div>








<div className="info-item">


<PaidIcon />


<div>


<strong>

Precio

</strong>


<span>

{formatPrice(
experience.price
)}

</span>


</div>


</div>





</div>









{/* ======================================
 DESCRIPCIÓN
====================================== */}



<div className="modal-description">


<h3>

Sobre esta experiencia

</h3>




<p>

{experience.longDescription}

</p>


</div>









{/* ======================================
 COORDENADAS
====================================== */}



<div className="coordinates-box">


<strong>

Ubicación GPS

</strong>



<p>

{formatCoordinates(
experience.coordinates
)}

</p>



</div>









{/* ======================================
 MAPA
====================================== */}



<div className="modal-map-section">


<h3>

Explora la ubicación

</h3>



<p className="map-description">


Consulta el punto aproximado donde vivirás
esta experiencia WAIA.


</p>





<div className="map-container">



<MapContainer


center={[

experience.coordinates.lat,

experience.coordinates.lng,

]}


zoom={14}


scrollWheelZoom={false}


>



<TileLayer


attribution="&copy; OpenStreetMap contributors"


url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"


/>





<Marker


position={[

experience.coordinates.lat,

experience.coordinates.lng,

]}


>



<Popup>


<div className="popup-content">


<strong>

{experience.title}

</strong>


<br/>


{experience.location}


<br/><br/>


<strong>

Anfitrión:

</strong>


<br/>

{experience.host}



</div>



</Popup>



</Marker>





</MapContainer>



</div>



</div>









{/* ======================================
 INFORMACIÓN EXTRA
====================================== */}




<div className="experience-extra-info">






<div className="extra-card">


<LocationOnIcon />


<div>


<strong>

Punto de encuentro

</strong>



<p>

Recibirás la ubicación exacta después
de confirmar tu reserva.

</p>



</div>



</div>








<div className="extra-card">


<EventIcon />


<div>


<strong>

Disponibilidad

</strong>



<p>

Selecciona la fecha que prefieras
para tu visita.

</p>



</div>



</div>








<div className="extra-card">


<GroupsIcon />


<div>


<strong>

Experiencia local

</strong>



<p>

Comparte momentos con anfitriones
de León.

</p>



</div>



</div>







</div>









{/* ======================================
 FORMULARIO RESERVA
====================================== */}



<div className="booking-section">


<h3>

Reserva tu experiencia

</h3>




<p>

Completa tus datos para confirmar tu
aventura con WAIA.

</p>





<form

className="booking-form"

onSubmit={handleSubmit}

>







<div className="form-group">


<label>

Nombre completo

</label>



<div className="input-wrapper">


<PersonIcon />



<input


type="text"


name="name"


placeholder="Ej: Carlos Pérez"


value={bookingData.name}


onChange={handleChange}


/>


</div>





{errors.name && (

<small className="error-text">

{errors.name}

</small>

)}



</div>








<div className="form-group">


<label>

Correo electrónico

</label>



<div className="input-wrapper">


<EmailIcon />



<input


type="email"


name="email"


placeholder="correo@ejemplo.com"


value={bookingData.email}


onChange={handleChange}


/>


</div>





{errors.email && (

<small className="error-text">

{errors.email}

</small>

)}



</div>









<div className="form-group">


<label>

Fecha de visita

</label>



<div className="input-wrapper">


<EventIcon />



<input


type="date"


name="date"


value={bookingData.date}


onChange={handleChange}


/>


</div>





{errors.date && (

<small className="error-text">

{errors.date}

</small>

)}



</div>









<div className="form-group">


<label>

Número de visitantes

</label>



<div className="input-wrapper">


<GroupsIcon />



<input


type="number"


min="1"


name="guests"


value={bookingData.guests}


onChange={handleChange}


/>


</div>




{errors.guests && (

<small className="error-text">

{errors.guests}

</small>

)}




</div>









<button

className="booking-button"

type="submit"

>


Confirmar reserva WAIA


</button>







</form>






</div>






</div>







</div>





</div>

);



}








/* ======================================
   PROP TYPES
====================================== */


DetailModal.propTypes = {


experience: PropTypes.shape({


id: PropTypes.oneOfType([

PropTypes.string,

PropTypes.number,

]).isRequired,



title: PropTypes.string.isRequired,



category: PropTypes.string.isRequired,



location: PropTypes.string.isRequired,



host: PropTypes.string.isRequired,



price: PropTypes.number.isRequired,



imageUrl: PropTypes.string.isRequired,



longDescription: PropTypes.string.isRequired,



coordinates: PropTypes.shape({

lat: PropTypes.number.isRequired,

lng: PropTypes.number.isRequired,

}).isRequired,



}).isRequired,





isOpen:

PropTypes.bool.isRequired,





onClose:

PropTypes.func.isRequired,





handleBooking:

PropTypes.func.isRequired,



};







export default DetailModal;