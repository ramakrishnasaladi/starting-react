import React, { useState, useEffect } from 'react';
import './App.css';

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}> Select</button>
    </td>
  </tr>
);

const PokemonInfo = ({ name, base }) => (
  <div>
    <h2>{name.english}</h2>
    <table>
      {Object.keys(base).map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
);

function App() {
  const [filter, setFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [pokemon, setpokemon] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/starting-react/pokemon.json')
      .then((resp) => resp.json())
      .then((data) => {
        setpokemon(data);
      });
  }, []);

  return (
    <div
      style={{
        margin: 'auto',
        width: 800,
        paddingTop: '1rem',
      }}
    >
      <h1 className="title">Pokemon search</h1>
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '70% 30%',
          gridColumnGap: '1rem',
        }}
      >
        <table width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {pokemon
              .filter((pokemon) =>
                pokemon.name.english
                  .toLowerCase()
                  .includes(filter.toLowerCase())
              )
              .slice(0, 20)
              .map((pokemon) => (
                <PokemonRow
                  pokemon={pokemon}
                  key={pokemon.id}
                  onSelect={(pokemomn) => setSelectedItem(pokemomn)}
                />
              ))}
          </tbody>
        </table>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </div>
    </div>
  );
}

export default App;
