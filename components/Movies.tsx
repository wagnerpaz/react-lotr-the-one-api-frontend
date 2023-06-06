import { memo, useEffect, useMemo, useState } from "react";

import theOneApi from "@/lib/theOneApi";
import MovieCard from "@/components/MovieCard";
import defaultToastError from "@/lib/defaultToastError";
import useToast from "@/hooks/useToast";

export interface Movie {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
}

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function get() {
      try {
        setLoading(true);
        const { data } = await theOneApi.get("/movie");
        setMovies(data.docs);
      } catch (e) {
        toast(defaultToastError(e));
      } finally {
        setLoading(false);
      }
    }
    get();
  }, [toast]);

  const moviesFiltered = useMemo(
    () => movies.filter((f: Movie) => !f.name.includes("Series")),
    [movies]
  );

  return loading ? (
    <div className="w-full h-full flex items-center justify-center">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    <ul className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
      {moviesFiltered.map((movie: Movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </ul>
  );
};

export default memo(Movies);
