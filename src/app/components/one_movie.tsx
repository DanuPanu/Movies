"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMovies } from "../context/MovieContext"; // Tuodaan context

export default function MovieDetails() {
  const { movies, addToFavourites, favourites, } = useMovies(); // Käytetään contextia

  const pathname = usePathname(); // Haetaan nykyinen polku
  const id = pathname.split("/")[2]; // Haetaan elokuvan ID polusta

  // Uudet tilat elokuvan yksityiskohtaisille tiedoille
  const [movieDetails, setMovieDetails] = useState<any>(null); // Tiedot tarkemmista elokuvista
  const [error, setError] = useState<string | null>(null); // Virhetila
  const [movieInFavourites, setMovieInFavourites] = useState(false);

  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  // Haetaan elokuvan tarkempia tietoja
  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await response.json();
      setMovieDetails(data); // Tallennetaan elokuvan tiedot
      setMovieInFavourites(favourites.some((movie) => movie.id === data.id))
    } catch (error) {
      setError((error as Error).message); // Virheen käsittely
    }
  };

  // Haetaan elokuvan tarkempia tietoja kun komponentti renderöidään
  useEffect(() => {
    fetchMovieDetails();
  }, [id, favourites]); // Riippuvuus id:stä, jos URL-polku muuttuu

  const handleAddToFavourites = async () => {
    try {
      const response = await fetch("/api/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: movieDetails.id,
          title: movieDetails.title,
          release_date: movieDetails.release_date,
          poster_path: movieDetails.poster_path,
          overview: movieDetails.overview,
          genres: movieDetails.genres.map((genre: any) => genre.name).join(", "),
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add movie to favourites");
      }
  
      const data = await response.json();
      addToFavourites(movieDetails); // Lisää elokuva contextiin
      setMovieInFavourites(true); // Merkitään elokuva lisätyksi
    } catch (error) {
      setError("Error adding movie to favourites");
    }
  };
  

  // Etsitään elokuvan tieto contextista
  const movie = movies.find((leffa) => leffa.id === Number(id));

  // Jos elokuvaa ei löydy, näytetään virhe
  if (!movie) {
    return (
      <div className="p-4 bg-slate-800 text-white min-h-screen">
        <p>Elokuvaa ei löytynyt!</p>
      </div>
    );
  }

  // Jos virhe, näytetään virheilmoitus
  if (error) {
    return (
      <div className="p-4 bg-slate-800 text-white min-h-screen">
        <p>Virhe: {error}</p>
      </div>
    );
  }

  return (
    <main className="p-4 bg-slate-800 text-white min-h-screen flex flex-col items-center">
      <div className="flex gap-10 max-w-[800px] p-2">
        {movieDetails?.poster_path && (
            <Image
            src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
            alt={movieDetails?.title}
            className="mb-4"
            width={300}
            height={450}
            />
          )}
            <div>
              <h1 className="text-3xl font-bold mb-4">{movieDetails?.title}</h1>
              <p className="text-xl">{movieDetails?.overview}</p>
              {!movieInFavourites ? (
              <button onClick={handleAddToFavourites} className="bg-yellow-500 text-black py-2 px-4 rounded mt-3">
                Add to Favourites
              </button>
              ) : (
                <p className="text-green-500">This movie is in your favourites</p>
              )}
              <p className="mt-5">Release Date: {movieDetails?.release_date}</p>
            </div>
      </div>
        <p><strong>Genres:</strong> {movieDetails?.genres?.map((genre: any) => genre.name).join(", ")}</p>
    </main>
  );
}
