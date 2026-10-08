import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Experiences from "../pages/Experiences/Experiences";
import ExperienceDetail from "../pages/ExperienceDetail/ExperienceDetail";
import Bookings from "../pages/Bookings/Bookings";
import Favorites from "../pages/Favorites/Favorites";
import Contact from "../pages/Contact/Contact";
import Communities from "../pages/Communities/Communities";
import Account from "../pages/Account/Account";
import HostLogin from "../pages/HostDashboard/HostLogin";
import HostDashboard from "../pages/HostDashboard/HostDashboard";
import NotFound from "../pages/NotFound/NotFound";

export default function AppRoutes(){
 return <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/experiencias" element={<Experiences/>}/>
  <Route path="/experiencias/:id" element={<ExperienceDetail/>}/>
  <Route path="/experiences" element={<Navigate to="/experiencias" replace/>}/>
  <Route path="/reservas" element={<Bookings/>}/>
  <Route path="/bookings" element={<Navigate to="/reservas" replace/>}/>
  <Route path="/favoritos" element={<Favorites/>}/>
  <Route path="/comunidades" element={<Communities/>}/>
  <Route path="/contacto" element={<Contact/>}/>
  <Route path="/cuenta" element={<Account/>}/>
  <Route path="/anfitrion/login" element={<HostLogin/>}/>
  <Route path="/anfitrion/dashboard" element={<HostDashboard/>}/>
  <Route path="*" element={<NotFound/>}/>
 </Routes>
}
