import {
  useState
} from "react";


import PropTypes from "prop-types";


// Icons
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PaletteIcon from "@mui/icons-material/Palette";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import TerrainIcon from "@mui/icons-material/Terrain";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";



import "./FilterBar.css";





/* ==========================================================
   ICONOS
========================================================== */


const getCategoryIcon = (category)=>{


switch(category){


case "Gastronomía":

return <RestaurantIcon/>;



case "Artesanía":

return <PaletteIcon/>;



case "Mitos e Historias":

return <HistoryEduIcon/>;



case "Naturaleza y Aventura":

return <TerrainIcon/>;



default:

return <AppsIcon/>;


}


};







/* ==========================================================
   INFORMACIÓN CATEGORÍAS WAIA
========================================================== */


const categoryInfo = {


"Gastronomía":{

title:"Sabores de León",

description:
"Descubre la gastronomía tradicional de León mediante recetas locales, productos artesanales y experiencias culinarias comunitarias.",


},



"Artesanía":{

title:"Manos creadoras de León",

description:
"Conoce artesanos locales y descubre procesos tradicionales llenos de historia, creatividad y cultura.",


},



"Mitos e Historias":{

title:"Historias que viven",

description:
"Explora leyendas, relatos antiguos y personajes que forman parte de la identidad cultural de León.",


},



"Naturaleza y Aventura":{

title:"Naturaleza WAIA",

description:
"Vive aventuras entre volcanes, paisajes naturales y escenarios únicos de León.",


},



};



function FilterBar({


categories,

selectedCategory,

onSelectCategory,


}){



const [
selectedCategoryModal,
setSelectedCategoryModal
]=useState(null);






const handleCategoryClick=(category)=>{


onSelectCategory(category);



if(category !== "Todas"){

setSelectedCategoryModal(category);

}


};






const closeModal=()=>{


setSelectedCategoryModal(null);


};







return (



<section

className="filter-bar section-sm"

id="experiencias"


>



<div className="container-custom">







<div className="filter-header">



<span className="filter-subtitle">


Explora por categoría


</span>





<h2 className="section-title">


Experiencias disponibles


</h2>






<p className="section-subtitle">


Descubre experiencias auténticas creadas por comunidades,
artesanos y anfitriones locales de León.


</p>





</div>









<div className="filter-buttons">



{

categories.map((category)=>{



const active =
selectedCategory === category;




return(



<button


key={category}


type="button"


className={`filter-btn ${
active ? "active":""
}`}



onClick={()=>handleCategoryClick(category)}




>



{

getCategoryIcon(category)

}




<span>


{category}


</span>





</button>



);



})

}




</div>













{/* ==================================================
      MODAL CATEGORÍA WAIA
================================================== */}




{

selectedCategoryModal && (




<div

className="category-modal-overlay"

onClick={closeModal}

>




<div

className="category-modal"

onClick={(e)=>e.stopPropagation()}

>





<button


className="category-close"


type="button"


onClick={closeModal}


>


<CloseIcon/>


</button>







<div className="category-modal-icon">


{

getCategoryIcon(
selectedCategoryModal
)

}


</div>






<h3>


{

categoryInfo[selectedCategoryModal]?.title

}


</h3>







<p>


{

categoryInfo[selectedCategoryModal]?.description

}


</p>








<button


className="category-discover-btn"


type="button"


onClick={closeModal}


>


Descubrir experiencias


<ArrowForwardIcon/>




</button>








</div>



</div>



)


}









</div>


</section>



);


}








FilterBar.propTypes={



categories:

PropTypes.arrayOf(

PropTypes.string

).isRequired,



selectedCategory:

PropTypes.string.isRequired,



onSelectCategory:

PropTypes.func.isRequired,


};

export default FilterBar;