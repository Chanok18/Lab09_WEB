import NavActions from "@/components/movies/NavActions";
import Link from "next/link";
import { Clapperboard, Film, UserRound, Sparkles } from "lucide-react";
import { getMovieById } from "@/lib/omdb";
import FeaturedMovies from "@/components/movies/FeaturedMovies";
import MovieExplorer from "@/components/movies/MovieExplorer";

export const dynamic = "force-dynamic";
const featuredIds = ["tt0816692", "tt1375666", "tt0468569", "tt0133093", "tt0111161", "tt4154796", "tt0110912", "tt7286456"];

export default async function MoviesPage() {
  const results = await Promise.allSettled(featuredIds.map((id) => getMovieById(id)));
  const movies = results.flatMap((r) => r.status === "fulfilled" && r.value ? [r.value] : []);
  return (
    <main className="min-h-screen bg-[#050b18] text-white selection:bg-violet-600/60">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060c1b]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between gap-5 px-5 md:px-10">
          <Link href="/movies" className="group flex shrink-0 items-center gap-3">
            <span className="relative flex h-12 w-12 rotate-[-9deg] items-center justify-center rounded-2xl border border-violet-400/40 bg-gradient-to-br from-indigo-500 via-violet-600 to-fuchsia-600 shadow-[0_0_25px_#7c3aed55] transition group-hover:rotate-0"><Film size={28} strokeWidth={2.3}/><Sparkles size={13} className="absolute -right-2 -top-2 text-amber-300"/></span>
            <span className="leading-tight"><span className="block text-2xl font-black tracking-tight">Cine<span className="text-violet-400">Verse</span></span><span className="block text-[9px] font-semibold uppercase tracking-[.32em] text-slate-400">Tu universo de cine</span></span>
          </Link>
          <NavActions />
          <span title="Función próximamente" className="flex cursor-default items-center gap-2 rounded-full border border-violet-400/40 bg-gradient-to-r from-violet-700 to-indigo-600 px-4 py-2.5 text-sm font-semibold opacity-90"><UserRound size={17}/><span className="hidden sm:inline">Iniciar sesión</span></span>
        </div>
      </header>
      <MovieExplorer />
      <FeaturedMovies movies={movies} />
      <footer className="border-t border-white/10 px-5 py-9 text-center text-sm text-slate-400">© CineVerse · Galería académica · Next.js + OMDb API · SSR + CSR</footer>
    </main>
  );
}
