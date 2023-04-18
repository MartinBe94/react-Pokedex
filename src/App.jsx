import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [pokemon, setPokemon] = useState("pikachu")
  const [pokemonData,setPokemonData] = useState([]);
  const [pokemonType,setPokemonType] = useState("");

  const getPokemon = async()=>{
    const toArray =[];

    try{
      const url =`https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      toArray.push(result);
      setPokemonType(result.types[0].type.name);
      setPokemonData(toArray);

    }catch (e){
      console.log(e);
    }
  };

  // useEffect(() =>{
  //   getPokemon();
  // },[])
  const handleChange = (e) => {
    setPokemon (e.target.value.toLowerCase())
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    getPokemon();
  }

  return (
    <div className="App">
      <form onSubmit = {handleSubmit}>
        <input type="text" 
        onChange={handleChange} 
        placeholders="Enter pokemon name">

        </input>
      </form>
      {pokemonData.map((data) =>{
        return(
          <div>
            <img src={data.sprites["front_default"]}></img>
            <ul>
              <li>Name: {data.name}</li>
              <li>Type: {pokemonType}</li>
              <li>Height: {data.height} Dm</li>
              <li>Weight: {data.weight} Hg</li>
            </ul>
            </div>
        );
      })}
    </div>
  )
}

export default App