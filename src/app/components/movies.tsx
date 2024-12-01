"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useMovies } from '../context/MovieContext'; // Tuodaan context

export default function Movies() {
  const { movies, setMovies, error, setError } = useMovies(); // Käytetään contextia

  const url =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`, // Älä unohda vaihtaa oikeaa API-avainta
    },
  };

  // Funktio elokuvien hakemiseen
  const fetchMovies = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.results); // Asetetaan elokuvat contextiin
    } catch (error) {
      setError((error as Error).message); // Asetetaan virhe contextiin
    }
  };

  // Käytetään useEffectiä elokuvien hakemiseen komponentin latautuessa
  useEffect(() => {
    fetchMovies();
  }, [setMovies, setError]); // Varmistetaan, että funktio ajetaan vain kerran

  return (
    <main className="bg-slate-800 pb-3">
      <h1 className="text-3xl font-bold mt-4 text-center text-white">Now Playing Movies</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>} {/* Näytetään virheviesti */}
      <div className="p-4 bg-slate-800 text-white min-h-screen">
      <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 justify-center">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="border border-black rounded max-w-[300px] bg-slate-500 shadow-lg p-2"
          >
            <Link href={`/movies/${movie.id}`}>
              <h2 className="font-bold text-xl text-center">{movie.title}</h2>
              <p className="text-center">Release Date: {movie.release_date}</p>
              {movie.poster_path && (
                <Image
                  className="mx-auto mb-2 shadow-md border rounded border-black"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={250}
                  height={375}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </main>

  );
}
