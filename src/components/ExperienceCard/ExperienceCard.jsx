import { Link } from "react-router-dom";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import SmartImage from "../common/SmartImage/SmartImage";
import "./ExperienceCard.css";
export default function ExperienceCard({experience,isFavorite=false,onToggleFavorite}){return <article className="experience-card"><div className="experience-card__media"><SmartImage src={experience.imageUrl} alt={experience.title}/><div className="experience-card__overlay"><span>{experience.category}</span>{experience.isDemo&&<small>Información de demostración</small>}</div><button className={`experience-card__fav ${isFavorite?'is-active':''}`} onClick={()=>onToggleFavorite?.(experience.id,'experience')} aria-label={isFavorite?'Quitar de favoritos':'Guardar en favoritos'}>{isFavorite?<FavoriteRoundedIcon/>:<FavoriteBorderRoundedIcon/>}</button></div><div className="experience-card__body"><div className="experience-card__location"><PlaceRoundedIcon/> {experience.location}</div><h3>{experience.title}</h3><p>{experience.shortDescription}</p><div className="experience-card__bottom"><div><strong>US${Number(experience.price||0).toFixed(0)}</strong><span> · {experience.priceLabel||'Precio estimado'}</span></div><Link to={`/experiencias/${experience.id}`}>Ver detalles <ArrowOutwardRoundedIcon fontSize="small"/></Link></div></div></article>}
