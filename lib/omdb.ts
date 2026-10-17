import "server-only";
import type { MovieDetails } from "./movie-types";

const BASE_URL = "https://www.omdbapi.com/";

export async function getMovieById(
  imdbID: string
): Promise<MovieDetails | null> {
  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    throw new Error("Falta OMDB_API_KEY en .env.local");
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    i: imdbID,
    plot: "full",
  });

  const response = await fetch(`${BASE_URL}?${params}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al consultar OMDb");
  }

  const data = await response.json();

  if (data.Response === "False") {
    return null;
  }

  return data as MovieDetails;
}
