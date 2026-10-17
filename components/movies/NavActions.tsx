"use client";
import { useRouter } from "next/navigation";
export default function NavActions() {
  const router = useRouter();
  function findSeries() {
    window.dispatchEvent(new CustomEvent("cineverse:search", { detail: { term: "Stranger Things", type: "series" } }));
    router.prefetch("/movies");
  }
  function explore() {
    document.getElementById("buscar")?.scrollIntoView({behavior:"smooth",block:"start"});
    document.querySelector<HTMLInputElement>('#buscar input')?.focus({preventScroll:true});
  }
  return <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
    <a href="#inicio" className="border-b-2 border-violet-500 py-2 text-violet-300 hover:text-white">Inicio</a>
    <a href="#peliculas" className="py-2 transition hover:text-white">Películas</a>
    <button onClick={findSeries} className="py-2 transition hover:text-white">Series</button>
    <button onClick={explore} className="py-2 transition hover:text-white">Explorar</button>
  </nav>;
}
