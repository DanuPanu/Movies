"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

export default function Favourites() {
  const [favourites, setFavourites] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Haetaan suosikkielokuvat API:sta
  const fetchFavourites = async () => {
    try {
      const response = await fetch("/api/favourites");
      if (!response.ok) {
        throw new Error("Failed to fetch favourites");
      }
      const data = await response.json();
      setFavourites(data); // Tallennetaan elokuvat tilaan
    } catch (error) {
      setError((error as Error).message); // Tallennetaan virhe tilaan
    }
  };

  // Poistaa elokuvan suosikeista
  const handleRemoveFromFavourites = async (id: number) => {
    try {
      const response = await fetch("/api/favourites", {
        method: "DELETE", // Lähetetään DELETE-pyyntö
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Lähetetään elokuvan ID pyynnön bodyssa
      });
      if (!response.ok) {
        throw new Error("Failed to delete movie from favourites");
      }
      setFavourites((prevFavourites) => prevFavourites.filter((movie) => movie.id !== id)); // Poistetaan elokuva tilasta
    } catch (error) {
      setError((error as Error).message); // Tallennetaan virhe tilaan
    }
  };

  useEffect(() => {
    fetchFavourites(); // Haetaan suosikkielokuvat API:sta
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-slate-800 text-white min-h-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (favourites.length === 0) {
    return (
      <div className="p-4 bg-slate-800 text-white min-h-screen">
        <p className="text-center text-xl">No favourite movies found!</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Favourite Movies</h1>
      <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 justify-center">
        {favourites.map((movie) => (
          <li
            key={movie.id}
            className="border border-black rounded max-w-[300px] bg-slate-500 shadow-lg"
          >
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
            <button
              onClick={() => handleRemoveFromFavourites(movie.id)} // Poistetaan elokuva suosikeista
              className="bg-red-500 text-white py-2 px-4 rounded mt-3 w-full"
            >
              Remove from Favourites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
