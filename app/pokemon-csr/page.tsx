"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export default function PokemonCSR() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const randomId = Math.floor(Math.random() * 150) + 1;
        const response = await axios.get<Pokemon>(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        setPokemon(response.data);
      } catch {
        setError("No se pudo cargar el Pokémon.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="mx-auto max-w-2xl">
        <header className="rounded-t-xl border-4 border-black bg-yellow-400 px-6 py-4 text-center">
          <h1 className="text-3xl font-bold text-black">🎮 Pokémon CSR</h1>
          <p className="text-sm text-gray-800">Client-Side Rendering</p>
        </header>

        <section className="rounded-b-xl border-4 border-t-0 border-black bg-white p-8 text-center shadow-2xl">
          {loading ? (
            <p className="py-12 text-gray-700">Cargando Pokémon...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : pokemon ? (
            <>
              {pokemon.sprites.front_default && (
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="mx-auto h-48 w-48"
                />
              )}

              <h2 className="mt-4 text-4xl font-bold capitalize text-gray-800">
                {pokemon.name}
              </h2>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {pokemon.types.map((item) => (
                  <span
                    key={item.type.name}
                    className="rounded-full bg-blue-500 px-4 py-2 font-semibold text-white"
                  >
                    {item.type.name}
                  </span>
                ))}
              </div>
            </>
          ) : null}

          <div className="mt-8 rounded-lg border-2 border-blue-200 bg-blue-50 p-4 text-left">
            <p className="text-sm text-blue-800">
              💡 CSR: Los datos se cargan desde el navegador después
              de renderizar la página.
            </p>
            <p className="mt-2 text-sm text-blue-800">
              Revisa DevTools → Network para observar la petición a PokéAPI.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
