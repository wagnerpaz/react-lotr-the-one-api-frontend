import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroller";

import theOneApi from "@/lib/theOneApi";
import CharacterCard from "@/components/CharactersCard";
import Input from "@/components/Input";
import FormControl from "@/components/FormControl";
import Select from "@/components/Select";
import genders from "@/lib/genders.json";
import races from "@/lib/races.json";
import realms from "@/lib/realms.json";
import removeEmptyProps from "@/lib/removeEmptyProps";

export interface Character {
  _id: string;
  height: string;
  race: string;
  gender: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
  name: string;
  wikiUrl: string;
}

const Characters = ({ serverCharacters }) => {
  const [characters, setCharacters] = useState(serverCharacters || []);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [race, setRace] = useState();
  const [realm, setRealm] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCharacters = useCallback(
    debounce(async function (
      name: string | undefined,
      gender: string | undefined,
      page: number | undefined,
      race: string | undefined,
      realm: string | undefined
    ) {
      try {
        setLoading(page === 1);
        const { data } = await theOneApi.get(`/character?limit=20`, {
          params: removeEmptyProps({
            page,
            name: name && `/${name}/i`,
            gender,
            race,
            realm,
          }),
        });
        setCharacters((characters: Character[]) => ({
          ...(page !== 1 ? characters : []),
          [`${page}`]: data.docs,
        }));
        setPages(data.pages);
      } catch (e) {
        //TODO
      } finally {
        setLoading(false);
      }
    },
    500),
    []
  );

  useEffect(() => {
    fetchCharacters(name, gender, 1, race, realm);
  }, [fetchCharacters, name, gender, race, realm]);

  const currPage = useMemo(
    () => +Object.keys(characters).sort((a, b) => (+a > +b ? -1 : 1))[0],
    [characters]
  );

  const unpaginatedCharacters = useMemo(
    () =>
      Object.keys(characters)
        .sort((a, b) => (+a > +b ? 1 : -1))
        .map((page) => characters[page])
        .flat(),
    [characters]
  );

  console.log(characters, unpaginatedCharacters);

  const hasMoreItems = useMemo(() => currPage < pages, [currPage, pages]);

  const [fetching, setFetching] = useState(false);
  const fetchItems = async () => {
    if (fetching) {
      return;
    }
    setFetching(true);
    await fetchCharacters(name, gender, currPage + 1, race, realm);
    setFetching(false);
  };

  const loader = (
    <div className="w-full h-full flex items-center justify-center">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );

  return (
    <div className="h-full p-4">
      <div className="flex flex-row gap-2 mb-4 justify-center">
        <FormControl label="Name">
          <Input
            value={name}
            placeholder="Search a name..."
            onChange={(e: MouseEvent) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl label="Gender">
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option className="bg-dark" value="">
              Any
            </option>
            {genders.map((gender) => (
              <option className="bg-dark" key={gender}>
                {gender}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl label="Race">
          <Select value={race} onChange={(e) => setRace(e.target.value)}>
            <option className="bg-dark" value="">
              Any
            </option>
            {races.map((race) => (
              <option className="bg-dark" key={race}>
                {race}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl label="Realm">
          <Select value={realm} onChange={(e) => setRealm(e.target.value)}>
            <option className="bg-dark" value="">
              Any
            </option>
            {realms.map((realm) => (
              <option className="bg-dark" key={realm}>
                {realm}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
      {loading ? (
        loader
      ) : (
        <InfiniteScroll
          loadMore={fetchItems}
          hasMore={hasMoreItems}
          loader={<div className="mt-6">{loader}</div>}
        >
          <ul className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {unpaginatedCharacters.map((character: Character) => (
              <CharacterCard key={character._id} character={character} />
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Characters;
