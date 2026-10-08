import { useState } from "react";
import BrokenImageRoundedIcon from "@mui/icons-material/BrokenImageRounded";
import "./SmartImage.css";
export default function SmartImage({src,alt="",className="",...props}){const [failed,setFailed]=useState(!src);if(failed)return <div className={`smart-image smart-image--fallback ${className}`} role="img" aria-label={alt}><BrokenImageRoundedIcon/><span>Imagen no disponible</span></div>;return <img className={`smart-image ${className}`} src={src} alt={alt} onError={()=>setFailed(true)} loading={props.loading||"lazy"} {...props}/>}
