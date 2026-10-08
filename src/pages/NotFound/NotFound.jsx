import { Link } from "react-router-dom";

export default function NotFound() {
  return <main className="flex min-h-[60vh] items-center justify-center bg-[#f7f7f7] px-6 py-16 text-center"><div><span className="text-7xl font-extrabold text-[#D50F35]">404</span><h1 className="mt-3 text-3xl font-extrabold">Página no encontrada</h1><p className="mt-3 text-black/55">La página que buscas no existe o fue movida.</p><Link to="/" className="mt-7 inline-block rounded-full bg-[#D50F35] px-6 py-3 font-extrabold text-white no-underline">Volver al inicio</Link></div></main>;
}
