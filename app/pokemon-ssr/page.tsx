import axios from "axios";

export const dynamic = "force-dynamic";

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

async function getPokemon(): Promise<Pokemon> {
  const randomId = Math.floor(Math.random() * 150) + 1;

  const response = await axios.get<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${randomId}`
  );

  return response.data;
}

export default async function PokemonSSR() {
  let pokemon: Pokemon | null = null;

  try {
    pokemon = await getPokemon();
  } catch {
    // Mostramos un mensaje si la API externa falla.
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-500 to-teal-600 p-8">
      <div className="mx-auto max-w-2xl">
        <header className="rounded-t-xl border-4 border-black bg-yellow-400 px-6 py-4 text-center">
          <h1 className="text-3xl font-bold text-black">⚡ Pokémon SSR</h1>
          <p className="text-sm text-gray-800">Server-Side Rendering</p>
        </header>

        <section className="rounded-b-xl border-4 border-t-0 border-black bg-white p-8 text-center shadow-2xl">
          {pokemon ? (
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
                    className="rounded-full bg-green-500 px-4 py-2 font-semibold text-white"
                  >
                    {item.type.name}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="py-12 text-red-600">
              No se pudo obtener el Pokémon desde el servidor.
            </p>
          )}

          <div className="mt-8 rounded-lg border-2 border-green-200 bg-green-50 p-4 text-left">
            <p className="text-sm text-green-800">
              💡 SSR: Los datos se obtienen en el servidor antes de
              enviar el contenido al navegador.
            </p>
            <p className="mt-2 text-sm text-green-800">
              Revisa el código fuente de la página para observar el contenido.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
