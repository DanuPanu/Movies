import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma"; // Prisma-yhteys

// Lisää elokuva suosikkeihin
export async function POST(req: Request) {
  try {
    const { title, release_date, poster_path, overview, genres } = await req.json();
    
    // Lisää elokuva käyttäjän suosikkeihin (olettaen, että käyttäjä on kirjautunut)
    const movie = await prisma.movie.create({
      data: {
        title,
        release_date,
        poster_path,
        overview,
        genres,
      },
    });

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json({ error: "Error adding movie to favourites" }, { status: 500 });
  }
}

export async function GET() {
    try {
      const favourites = await prisma.movie.findMany(); // Hakee kaikki elokuvat
      return NextResponse.json(favourites);
    } catch (error) {
      return NextResponse.json({ error: "Error fetching favourite movies" }, { status: 500 });
    }
  }

// Poistaa elokuvan suosikeista tietokannasta
export async function DELETE(request: Request) {
    try {
      // Haetaan pyynnön body
      const { id }: { id: number } = await request.json(); 
  
      if (!id) {
        return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
      }
  
      const deletedMovie = await prisma.movie.delete({
        where: {
          id, // Poistetaan elokuva ID:n perusteella
        },
      });
  
      return NextResponse.json(deletedMovie); // Palautetaan poistettu elokuva
    } catch (error) {
      return NextResponse.json({ error: "Error deleting movie from favourites" }, { status: 500 });
    }
  }
