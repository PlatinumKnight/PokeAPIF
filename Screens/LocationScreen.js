import React, { useContext, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { PokeContext } from "../context/PokeContext";

export default function LocationScreen() {
  const { searchPokemon, allPokemons } = useContext(PokeContext);

  const [search, setSearch] = useState("");

  const onChange = (e) => {
    const temporal = e.target.value;
    setSearch(temporal.toLowerCase());
  };
  const onClick = async (e) => {
    const data = await searchPokemon(search);
    console.log(data);
  };
  return (
    <View style={styles.Back}>
      <View style={[{ width: "50%", margin: 10, backgroundColor: "red" }]}>
        <Button title="Ubicaciones" color="#FF3D00" />
      </View>

      <View style={[{ width: "50%", margin: 10, backgroundColor: "red" }]}>
        <Button title="Ubicaciones de areas" color="#FF3D00" />
      </View>

      <View style={[{ width: "50%", margin: 10, backgroundColor: "red" }]}>
        <Button title="Ubicaciones de parques" color="#FF3D00" />
      </View>
      <View style={[{ width: "50%", margin: 10, backgroundColor: "red" }]}>
        <Button title="Regiones" color="#FF3D00" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Back: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  Button: {
    fontSize: 20,
  },
});
