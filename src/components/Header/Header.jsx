import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

const menu=[
  ["Inicio","/",HomeRoundedIcon],["Experiencias","/experiencias",TravelExploreRoundedIcon],
  ["Destinos","/departamentos",PublicRoundedIcon],["Comunidades","/comunidades",GroupsRoundedIcon],
  ["Contacto","/contacto",EmailRoundedIcon]
];

export default function Header({bookings=[],favoritesCount=0}){
  const [open,setOpen]=useState(false);
  const count=Array.isArray(bookings)?bookings.length:0;
  const user=(()=>{try{return JSON.parse(localStorage.getItem("waia_user")||"null")}catch{return null}})();
  const close=()=>setOpen(false);
  return <header className="waia-header">
    <div className="waia-header-inner">
      <Link to="/" onClick={close} className="waia-brand" aria-label="WAIA - inicio">
        <img src="/Logo-Waia.png" alt="WAIA"/>
        <span><strong>WAIA</strong><small>Donde la Cultura Conecta</small></span>
      </Link>
      <nav className="waia-nav" aria-label="Navegación principal">
        {menu.map(([label,href,Icon])=><NavLink key={href} to={href} className={({isActive})=>`waia-nav-link ${isActive?"active":""}`}><Icon fontSize="small"/>{label}</NavLink>)}
      </nav>
      <div className="waia-header-actions">
        <Link className="waia-icon-link" to="/favoritos" aria-label={`Favoritos (${favoritesCount})`}><FavoriteRoundedIcon fontSize="small"/><b>{favoritesCount}</b></Link>
        <Link className="waia-host-link" to="/anfitrion/dashboard"><StorefrontRoundedIcon fontSize="small"/> Panel anfitrión</Link>
        <Link className="waia-account-link" to="/cuenta" title={user?`Cuenta de ${user.name}`:"Iniciar sesión"}><AccountCircleRoundedIcon fontSize="small"/><span>{user?user.name:"Entrar"}</span></Link>
        <Link className="waia-booking-link" to="/reservas"><EventAvailableRoundedIcon fontSize="small"/><span>Mis Reservas</span><b>{count}</b></Link>
      </div>
      <button className="waia-menu-button" type="button" onClick={()=>setOpen(true)} aria-label="Abrir menú"><MenuRoundedIcon/></button>
    </div>
    {open&&<div className="waia-mobile-overlay" onClick={close}>
      <aside className="waia-mobile-menu" onClick={e=>e.stopPropagation()}>
        <div className="waia-mobile-head"><img src="/Logo-Waia.png" alt="WAIA"/><button type="button" onClick={close} aria-label="Cerrar menú"><CloseRoundedIcon/></button></div>
        <div className="waia-mobile-profile"><span>{user?.name?.slice(0,1)||"W"}</span><div><strong>{user?user.name:"Explora Nicaragua"}</strong><small>{user?.email||"Turismo comunitario"}</small></div></div>
        <nav>{menu.map(([label,href,Icon])=><NavLink key={href} to={href} onClick={close} className={({isActive})=>`waia-mobile-link ${isActive?"active":""}`}><Icon/>{label}</NavLink>)}</nav>
        <div className="waia-mobile-divider"/>
        <Link to="/favoritos" onClick={close} className="waia-mobile-link"><FavoriteRoundedIcon/> Favoritos <b>{favoritesCount}</b></Link>
        <Link to="/anfitrion/dashboard" onClick={close} className="waia-mobile-host"><StorefrontRoundedIcon/> Panel de anfitrión</Link>
        <Link to="/reservas" onClick={close} className="waia-mobile-bookings"><EventAvailableRoundedIcon/> Mis Reservas <b>{count}</b></Link>
      </aside>
    </div>}
  </header>
}

import "./Header.css";
