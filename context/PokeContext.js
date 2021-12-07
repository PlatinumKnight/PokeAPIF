import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import Location from "../Screens/Location";

export const PokeContext = createContext();

const PokeProvider = (props) => {
  const [search, setSearch] = useState("");
  const [allPokemons, setallPokemons] = useState([]);
  const [Locations] = useState([]);
  const [Items] = useState([]);
  const [Machines] = useState([]);

  const searchPokemon = async (pokemon) => {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
      Alert.alert("No se encontro al pokemon");
    }
  };

  const searchLocations = async (i = 1) => {
    let url = `https://pokeapi.co/api/v2/location/${i}/`;
    const res = await fetch(url);
    const data = await res.json();
    const Temp = {
      id: data.id,
      name: data.names[1].name,
      region: data.region.name,
    };
    Locations.push(Temp);
  };

  const searchItems = async (i = 1) => {
    let url = `https://pokeapi.co/api/v2/item/${i}/`;
    const res = await fetch(url);
    const data = await res.json();

    const Temp = {
      name: data.names[5].name,
      cost: data.cost,
      sprites: data.sprites.default,
      effect: data.effect_entries[0].short_effect,
    };
    Items.push(Temp);
  };

  const searchMachines = async (i = 1) => {
    let url = `https://pokeapi.co/api/v2/machine/${i}/`;
    const res = await fetch(url);
    const data = await res.json();
    const URLM = [];
    URLM.push(data.item.url);

    fetch(URLM)
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        console.log(data.effect_entries[0]?.short_effect);
        const Temp = {
          id: data.id,
          cost: data.cost,
          name: data.names[5].name,
          sprites: data.sprites.default,
          text: data.flavor_text_entries[1].text,
          effect: data.effect_entries[0]?.short_effect,
        };
        Machines.push(Temp);
      });
  };

  const id = () => {
    for (let i = 2; i <= 5; i++) {
      searchLocations(i);
      searchItems(i);
    }
  };

  useEffect(() => {
    id();
    searchLocations();
    searchItems();
    searchMachines();
  }, []);

  return (
    <PokeContext.Provider
      value={{
        Machines,
        Items,
        Locations,
        searchLocations,
        searchPokemon,
        allPokemons,
      }}
    >
      {props.children}
    </PokeContext.Provider>
  );
};

export default PokeProvider;
