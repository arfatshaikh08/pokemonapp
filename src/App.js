import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [CurrentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon",
  );
  const [NextPageUrl, setNextPageUrl] = useState();
  const [PrevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [SearchedPokemon, setSearchedPokemon] = useState(null);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(CurrentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        const requests = res.data.results.map((p) => axios.get(p.url));
        Promise.all(requests).then((responses) => {
          const pokemon = responses.map((responses) => ({
            name: responses.data.name,
            image: responses.data.sprites.front_default,
            type: responses.data.types.map((typeInfo) => typeInfo.type.name),
          }));
          setPokemon(pokemon);
        });
      });

    return () => cancel();
  }, [CurrentPageUrl]);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  function NextPage() {
    setCurrentPageUrl(NextPageUrl);
  }

  function PrevPage() {
    setCurrentPageUrl(PrevPageUrl);
  }
  function searchPokemon() {
    if (search.trim === "") {
      setSearchedPokemon(null);
      return;
    }
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${search}`)
      .then((response) => {
        const SPokemon = {
          name: response.data.name,
          image: response.data.sprites.front_default,
          type: response.data.types.map((typeInfo) => typeInfo.type.name),
        };
        setSearchedPokemon([SPokemon]);
      })
      .catch((error) => {
        setSearchedPokemon([]);
        console.log(error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="PokeLogo">POKÉDEX</h1>
        <SearchBar
          search={search}
          setSearch={setSearch}
          searchPokemon={searchPokemon}
        />
        {loading && <p>Loading....</p>}
        {SearchedPokemon && SearchedPokemon.length > 0 ? (
          <PokemonList pokemon={SearchedPokemon} />
        ) : filteredPokemon.length > 0 ? (
          <PokemonList pokemon={filteredPokemon} />
        ) : (
          <p>No Results</p>
        )}
        {!SearchedPokemon ? (
          <Pagination
            NextPage={NextPageUrl ? NextPage : null}
            PrevPage={PrevPageUrl ? PrevPage : null}
          />
        ) : (
          <></>
        )}
      </header>
    </div>
  );
}

export default App;
