import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { Response: "False", Error: "API no configurada" },
      { status: 500 }
    );
  }

  const search = request.nextUrl.searchParams.get("s")?.trim();
  const id = request.nextUrl.searchParams.get("i")?.trim();
  const type = request.nextUrl.searchParams.get("type");

  if (!search && !id) {
    return NextResponse.json(
      { Response: "False", Error: "Ingresa una búsqueda" },
      { status: 400 }
    );
  }

  if (search && search.length < 2) {
    return NextResponse.json(
      { Response: "False", Error: "Escribe al menos 2 caracteres" },
      { status: 400 }
    );
  }

  const params = new URLSearchParams({ apikey: apiKey });

  if (id) {
    params.set("i", id);
    params.set("plot", "full");
  } else if (search) {
    params.set("s", search);

    if (type === "movie" || type === "series") {
      params.set("type", type);
    }
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?${params.toString()}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Error de conexión con OMDb");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { Response: "False", Error: "No se pudo consultar OMDb" },
      { status: 502 }
    );
  }
}
