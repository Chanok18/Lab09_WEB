"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Film, LoaderCircle, Search, Star, X } from "lucide-react";
import type { Movie, MovieDetails, OMDbSearchResponse } from "@/lib/movie-types";

type Filter = "all" | "movie" | "series";
const popular = ["Batman", "Avengers", "Stranger Things", "Interstellar"];
export default function MovieExplorer() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<MovieDetails | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    function handleNavigation(event: Event) {
      const { term, type } = (event as CustomEvent<{term: string; type: Filter}>).detail;
      setFilter(type);
      setQuery(term);
      document.getElementById("buscar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.addEventListener("cineverse:search", handleNavigation);
    return () => window.removeEventListener("cineverse:search", handleNavigation);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) { setMovies([]); setSearched(false); setLoading(false); setError(""); return; }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true); setError("");
      try {
        const params = new URLSearchParams({s:q});
        if (filter !== "all") params.set("type", filter);
        const response = await fetch(`/api/movies?${params}`, {signal:controller.signal});
        const data: OMDbSearchResponse = await response.json();
        if (!response.ok) throw new Error(data.Error || "No se pudo buscar");
        if (!controller.signal.aborted) {
          setMovies(data.Response === "True" ? data.Search || [] : []);
          setSearched(true);
          if (data.Response === "False" && data.Error !== "Movie not found!") setError(data.Error || "Sin resultados");
        }
      } catch(e) {
        if (!controller.signal.aborted) {setMovies([]);setSearched(true);setError(e instanceof Error ? e.message : "Error de conexión");}
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }, 650);
    return () => {clearTimeout(timer);controller.abort();};
  }, [query, filter]);

  useEffect(() => {
    if (!selected) return;
    const close = (e:KeyboardEvent) => {if(e.key === "Escape") setSelected(null);};
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [selected]);

  async function openDetails(id:string) {
    setDetailLoading(true);setError("");
    try {
      const response = await fetch(`/api/movies?i=${encodeURIComponent(id)}`);
      const data = await response.json();
      if (!response.ok || data.Response === "False") throw new Error(data.Error || "No se pudo cargar el detalle");
      setSelected(data as MovieDetails);
    } catch(e) {setError(e instanceof Error ? e.message : "Error al cargar detalles");}
    finally {setDetailLoading(false);}
  }
  return (
    <section id="buscar" className="relative z-20 mx-auto max-w-[1500px] scroll-mt-24 px-5 pt-5 pb-4 md:px-10">
      <div className="rounded-[24px] border border-violet-400/25 bg-gradient-to-r from-[#11162c] via-[#0c162d] to-[#18112e] p-4 shadow-[0_18px_55px_#0008] md:p-5">
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-[#0a1325] px-4 py-3 focus-within:border-violet-400 md:px-5">
          <Search className="shrink-0 text-violet-300" size={22}/>
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Busca una película o serie... Ej: Batman, Marvel, Dark, Avengers..." aria-label="Buscar película o serie" className="min-w-0 flex-1 bg-transparent py-1 text-sm text-white outline-none placeholder:text-slate-400 md:text-base" />
          {query && <button aria-label="Limpiar búsqueda" onClick={()=>setQuery("")} className="text-slate-400 hover:text-white"><X size={18}/></button>}
          <button onClick={()=>document.getElementById("resultados")?.scrollIntoView({behavior:"smooth",block:"start"})} className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-bold shadow-lg shadow-violet-900/40 transition hover:brightness-125 sm:flex">Buscar <ArrowRight size={16}/></button>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">{([ ["all","Todo"], ["movie","Películas"], ["series","Series"] ] as const).map(([value,label])=><button key={value} onClick={()=>setFilter(value)} className={`rounded-full border px-4 py-2 text-xs font-semibold transition md:text-sm ${filter===value ? "border-violet-400 bg-violet-700 text-white shadow-lg shadow-violet-900/50" : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"}`}>{label}</button>)}</div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400"><span className="hidden lg:inline">Búsquedas populares:</span>{popular.map((term)=><button key={term} onClick={()=>setQuery(term)} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300 transition hover:border-violet-400 hover:text-white">{term}</button>)}</div>
        </div>
      </div>
      {(query.trim().length >= 2 || loading || searched) && <div id="resultados" className="scroll-mt-28 pt-8">
        <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-extrabold md:text-2xl">Resultados <span className="text-violet-400">de búsqueda</span></h2>{movies.length > 0 && <span className="text-sm text-slate-400">{movies.length} resultados</span>}</div>
        {loading && <p className="flex items-center gap-2 py-8 text-violet-300"><LoaderCircle className="animate-spin"/> Buscando películas...</p>}
        {error && <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">{error}</p>}
        {!loading && searched && !error && movies.length === 0 && <p className="py-6 text-slate-400">No encontramos títulos. Prueba otra búsqueda.</p>}
        {!loading && movies.length > 0 && <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">{movies.map((movie)=><button key={movie.imdbID} onClick={()=>openDetails(movie.imdbID)} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#10182a] text-left transition hover:-translate-y-1 hover:border-violet-400/60"><div className="relative aspect-[2/3] overflow-hidden">{movie.Poster && movie.Poster!=="N/A" ? <img src={movie.Poster} alt={movie.Title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110"/> : <div className="flex h-full items-center justify-center bg-slate-800"><Film size={35}/></div>}<span className="absolute left-2 top-2 rounded-md bg-black/75 px-2 py-1 text-[10px] font-bold uppercase">{movie.Type === "series" ? "Serie" : "Película"}</span></div><div className="p-3"><p className="truncate text-sm font-bold">{movie.Title}</p><p className="mt-1 text-xs text-slate-400">{movie.Year}</p></div></button>)}</div>}
      </div>}
      {detailLoading && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80"><LoaderCircle className="animate-spin text-violet-400" size={40}/></div>}
      {selected && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md" onClick={()=>setSelected(null)}><div role="dialog" aria-modal="true" aria-label={`Detalles de ${selected.Title}`} onClick={(e)=>e.stopPropagation()} className="relative grid max-h-[90vh] w-full max-w-4xl gap-6 overflow-y-auto rounded-3xl border border-white/15 bg-[#10192d] p-6 shadow-2xl md:grid-cols-[220px_1fr] md:p-8"><button aria-label="Cerrar detalles" onClick={()=>setSelected(null)} className="absolute right-4 top-4 rounded-full bg-black/70 p-2 hover:bg-violet-600"><X/></button>{selected.Poster !== "N/A" ? <img src={selected.Poster} alt={selected.Title} className="w-full rounded-xl"/> : <div className="flex aspect-[2/3] items-center justify-center bg-slate-800"><Film/></div>}<div><span className="text-xs font-bold uppercase tracking-widest text-violet-400">{selected.Type === "series" ? "Serie" : "Película"}</span><h2 className="mt-3 pr-8 text-3xl font-black">{selected.Title}</h2><p className="mt-3 flex items-center gap-2 text-amber-400"><Star size={18} fill="currentColor"/> {selected.imdbRating}/10 <span className="ml-3 text-sm text-slate-300">{selected.Year} · {selected.Runtime}</span></p><p className="mt-4 text-sm font-medium text-violet-300">{selected.Genre}</p><p className="mt-4 leading-7 text-slate-300">{selected.Plot !== "N/A" ? selected.Plot : "Sin sinopsis disponible"}</p><div className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm text-slate-300"><p><strong className="text-white">Director:</strong> {selected.Director}</p><p><strong className="text-white">Actores:</strong> {selected.Actors}</p><p><strong className="text-white">Estreno:</strong> {selected.Released}</p><p><strong className="text-white">País:</strong> {selected.Country}</p><p><strong className="text-white">Premios:</strong> {selected.Awards}</p><p><strong className="text-white">Idioma:</strong> {selected.Language}</p></div><a href={`https://www.imdb.com/title/${selected.imdbID}/`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500">Ver en IMDb ↗</a></div></div></div>}
    </section>
  );
}
