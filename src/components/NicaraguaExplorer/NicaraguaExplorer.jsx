import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { departmentsData } from "../../data/nicaraguaTerritory";
import "./NicaraguaExplorer.css";

export default function NicaraguaExplorer({ compact = false }) {
  const [department, setDepartment] = useState(null);
  const [municipality, setMunicipality] = useState(null);
  const municipalities = useMemo(() => department?.municipalities || [], [department]);

  return (
    <section className={`nicaragua-explorer ${compact ? "nicaragua-explorer--compact" : ""}`}>
      <div className="nicaragua-explorer__head">
        <div><span className="waia-kicker">Explora Nicaragua</span><h2>Del departamento a la experiencia.</h2><p>Selecciona un territorio para descubrir cómo WAIA puede conectar destinos, municipios y servicios turísticos.</p></div>
        <PlaceRoundedIcon className="nicaragua-explorer__globe" />
      </div>
      <div className="nicaragua-explorer__selectors">
        <Autocomplete options={departmentsData} value={department} onChange={(_, value) => { setDepartment(value); setMunicipality(null); }} getOptionLabel={(option) => option?.name || ""} isOptionEqualToValue={(a,b)=>a.id===b.id} renderInput={(params)=><TextField {...params} label="Departamento o región" placeholder="Busca un territorio" />} />
        <Autocomplete options={municipalities} value={municipality} disabled={!department} onChange={(_, value)=>setMunicipality(value)} getOptionLabel={(option)=>option?.name || ""} isOptionEqualToValue={(a,b)=>a.id===b.id} renderInput={(params)=><TextField {...params} label="Municipio" placeholder={department ? "Selecciona un municipio" : "Primero elige un departamento"} />} />
        <Link className="nicaragua-explorer__cta" to={department ? `/departamentos/${department.slug}${municipality ? `?municipio=${encodeURIComponent(municipality.name)}` : ""}` : "/departamentos"}>Explorar <ArrowForwardRoundedIcon fontSize="small" /></Link>
      </div>
      <div className="nicaragua-explorer__stats"><span><strong>{departmentsData.length}</strong> territorios principales</span><span><strong>153</strong> municipios</span><span><strong>1</strong> experiencia nacional en crecimiento</span></div>
    </section>
  );
}
