import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroller";

import theOneApi from "@/lib/theOneApi";
import Input from "@/components/Input";
import FormControl from "@/components/FormControl";
import removeEmptyProps from "@/lib/removeEmptyProps";
import ReactSelectAsync from "./ReactSelectAsync";
import { Character } from "./Characters";
import { Movie } from "./Movies";
import defaultToastError from "@/lib/defaultToastError";

export interface Quote {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
}

const Quotes = ({ serverQuotes }) => {
  const [quotes, setQuotes] = useState(serverQuotes || []);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [dialog, setDialog] = useState("");
  const [movieSearch, setMovieSearch] = useState("");
  const [movie, setMovie] = useState("");
  const [characterSearch, setCharacterSearch] = useState("");
  const [character, setCharacter] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchQuotes = useCallback(
    debounce(async function (
      dialog: string | undefined,
      movie: string | undefined,
      character: string | undefined,
      page: number | undefined = 1
    ) {
      try {
        setLoading(page === 1);
        const { data } = await theOneApi.get(`/quote?limit=20`, {
          params: removeEmptyProps({
            page,
            dialog: dialog && `/${dialog}/i`,
            movie,
            character,
          }),
        });
        setQuotes((quotes: Quote[]) => ({
          ...(page !== 1 ? quotes : []),
          [`${page}`]: data.docs,
        }));
        setPages(data.pages);
      } catch (e) {
        defaultToastError(e);
      } finally {
        setLoading(false);
      }
    },
    500),
    []
  );

  useEffect(() => {
    fetchQuotes(dialog, movie, character);
  }, [fetchQuotes, dialog, movie, character]);

  const currPage = useMemo(
    () => +Object.keys(quotes).sort((a, b) => (+a > +b ? -1 : 1))[0],
    [quotes]
  );

  const unpaginatedQuotes = useMemo(
    () =>
      Object.keys(quotes)
        .sort((a, b) => (+a > +b ? 1 : -1))
        .map((page) => quotes[page])
        .flat(),
    [quotes]
  );

  const hasMoreItems = useMemo(() => currPage < pages, [currPage, pages]);

  const fetchItems = () => fetchQuotes(dialog, movie, character, currPage + 1);
  useEffect(() => {
    async function get() {
      try {
        const { data } = await theOneApi.get("/character", {
          params: {
            _id: quotes[`${currPage}`].map((q: Quote) => q.character).join(","),
          },
        });
        setCharacters((characters: Character[]) =>
          Array.from(new Set([...characters, ...(data.docs as Character[])]))
        );
      } catch (e) {
        defaultToastError(e);
      }
    }
    if (quotes[`${currPage}`]) get();
  }, [quotes, currPage]);

  const loader = (
    <div className="w-full h-full flex items-center justify-center">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMovieSearch = useCallback(
    debounce(async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 2) {
        setMovie("");
      } else {
        try {
          const { data } = await theOneApi.get("/movie", {
            params: { name: `/${e.target.value}/i` },
          });
          setMovie(data.docs.map((m: Movie) => m._id).join(","));
        } catch (e) {
          defaultToastError(e);
        }
      }
    }, 500),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCharacterSearch = useCallback(
    debounce(async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 2) {
        setCharacter("");
      } else {
        try {
          const { data } = await theOneApi.get("/character", {
            params: { name: `/${e.target.value}/i` },
          });
          setCharacter(data.docs.map((m: Movie) => m._id).join(","));
        } catch (e) {
          defaultToastError(e);
        }
      }
    }, 500),
    []
  );

  return (
    <div className="h-full p-4">
      <div className="flex flex-row gap-2 mb-4 justify-center">
        <FormControl label="Dialog">
          <Input
            value={dialog}
            placeholder="Search for a dialog..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDialog(e.target.value)
            }
          />
        </FormControl>
        <FormControl label="Movie" className="w-48">
          <Input
            value={movieSearch}
            placeholder="Search for a movie..."
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setMovieSearch(e.target.value);
              handleMovieSearch(e);
            }}
          />
        </FormControl>
        <FormControl label="Character">
          <Input
            value={characterSearch}
            placeholder="Search for a character..."
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCharacterSearch(e.target.value);
              handleCharacterSearch(e);
            }}
          />
        </FormControl>
      </div>
      {loading ? (
        loader
      ) : unpaginatedQuotes.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          Nothing found!
        </div>
      ) : (
        <InfiniteScroll
          loadMore={fetchItems}
          hasMore={hasMoreItems}
          loader={<div className="mt-6">{loader}</div>}
        >
          <ul className="relative flex flex-col gap-4">
            {unpaginatedQuotes.map((quote: Quote) => (
              <li key={quote._id}>
                <span className="font-bold">
                  {characters.find((f) => f._id === quote.character)?.name}:{" "}
                </span>
                <span className="text-sm">{quote.dialog}</span>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Quotes;
