"use client"

import { createContext, useContext, useState } from "react";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface MoviesContextType {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  error: string | null;
  setError: (error: string | null) => void;
  favourites: Movie[];
  setFavourites: (favourites: Movie[]) => void;
  addToFavourites: (movie: Movie) => void; // Toiminto elokuvan lisäämiseksi suosikkeihin
  removeFromFavourites: (id: number) => void; // Toiminto elokuvan poistamiseksi suosikeista
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<Movie[]>([]);

  // Toiminto elokuvan lisäämiseksi suosikkeihin
  const addToFavourites = (movie: Movie) => {
    setFavourites([...favourites, movie]); // Lisää elokuva suosikkeihin
  };
  

  // Toiminto elokuvan poistamiseksi suosikeista
  const removeFromFavourites = (id: number) => {
    setFavourites((prevFavourites) => prevFavourites.filter((movie) => movie.id !== id));
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMovies,
        error,
        setError,
        favourites,
        setFavourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

// Hook kontekstin käyttämiseksi
export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
  return context;
};
