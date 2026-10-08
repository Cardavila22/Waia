import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, TextField } from "@mui/material";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import "./HostDashboard.css";
export default function HostLogin(){const [email,setEmail]=useState('anfitrion@waia.local'),[password,setPassword]=useState('WaiaHost2026!'),[loading,setLoading]=useState(false);const nav=useNavigate();return <div className="host-login"><div className="host-login__card"><span className="pill">WAIA para anfitriones</span><h1>Gestiona tus experiencias</h1><p>Accede al dashboard local de demostración.</p><form onSubmit={async e=>{e.preventDefault();setLoading(true);try{await api.hostLogin(email,password);toast.success('Sesión de anfitrión iniciada');nav('/anfitrion/dashboard')}catch(err){toast.error(err.message)}finally{setLoading(false)}}}><TextField label="Correo" fullWidth value={email} onChange={e=>setEmail(e.target.value)}/><TextField label="Contraseña" type="password" fullWidth value={password} onChange={e=>setPassword(e.target.value)}/><Alert severity="info">Modo local. Las credenciales se reemplazarán por autenticación segura cuando conectemos el backend.</Alert><Button disabled={loading} type="submit" variant="contained">{loading?'Ingresando...':'Entrar'}</Button></form></div></div>}
