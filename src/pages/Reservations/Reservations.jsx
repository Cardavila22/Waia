import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Reservations.css";

function Reservations() {
  return (
    <div className="reservations-page">
      <Header />
      <main className="container py-5">
        <p className="text-uppercase fw-bold">WAIA</p>
        <h1>Mis reservas</h1>
        <p>Las reservas se conectarán con localStorage en esta etapa.</p>
      </main>
      <Footer />
    </div>
  );
}

export default Reservations;
