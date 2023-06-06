import { ComponentProps, useEffect, useState } from "react";
import Image from "next/image";
import tmdb from "@/lib/tmdb";
import { Movie } from "./Movies";
import defaultToastError from "@/lib/defaultToastError";
import useToast from "@/hooks/useToast";

interface MovieCardProps extends ComponentProps<"section"> {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [posterPath, setPosterPath] = useState("");
  const toast = useToast();

  useEffect(() => {
    async function get() {
      try {
        const { data } = await tmdb.get("/search/movie", {
          params: { query: movie.name },
        });
        setPosterPath(data.results[0].poster_path);
      } catch (e) {
        toast(defaultToastError(e));
      }
    }
    get();
  }, [movie.name, toast]);

  return (
    <li className="relative aspect-[2/3] group overflow-hidden rounded-b-2xl bg-transparent perspective p-4 reflection">
      <div className="relative preserve-3d group-hover:rotate-y-180 w-full h-full duration-500">
        <div className="absolute backface-hidden w-full h-full">
          <Image
            className="w-full h-full rounded-2xl"
            src={`http://image.tmdb.org/t/p/w500/${posterPath}`}
            alt="poster"
            fill
            loading="eager"
          />
        </div>
        <div className="absolute rotate-y-180 backface-hidden w-full h-full">
          <Image
            className="w-full h-full rounded-2xl"
            src={`http://image.tmdb.org/t/p/w500/${posterPath}`}
            alt="poster"
            fill
            loading="eager"
          />
          <div className="p-4 flex flex-col h-full font-lato text-xl backdrop-blur-sm bg-semi-dark-1 rounded-2xl">
            <h3>{movie.name}</h3>
            <div className="text-xs overflow-auto flex-1 custom-scrollbar -mr-4 pr-4 pt-2">
              <ul className="flex flex-col gap-2">
                <li className="flex flex-col">
                  <span className="font-bold">Runtime</span>
                  <span>{movie.runtimeInMinutes} mins</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold">Budget</span>
                  <span>{movie.budgetInMillions}M</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold">Box Office Revenue</span>
                  <span>{movie.boxOfficeRevenueInMillions}M</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold">Academy Award Nominations</span>
                  <span>{movie.academyAwardNominations}</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold">Academy Award Wins</span>
                  <span>{movie.academyAwardWins}</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold">Rotten Tomatoes Score</span>
                  <span>{movie.rottenTomatoesScore}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

MovieCard.displayName = "WatchGridItem";

export default MovieCard;
