import React from 'react';
import { useRouter } from 'next/router';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import { pokemonDetail } from '../../gql/pokemonDetail';

const styles = css`
  margin-top: 80px;
  text-align: center;
  padding-bottom: 16px;

  img {
    display: block;
    margin: auto;
    height: 200px;
    width: 200px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  }
  button {
    background-color: var(--primary);
    color: white;
    margin: 8px 16px;
    padding: 8px 16px;
    font-weight: bold;
    border: 0;
    border-radius: 8px;
    box-shadow: var(--shadow);
  }
  .section {
    background-color: white;
    box-shadow: var(--shadow);
    padding: 16px;
    padding-bottom: 24px;
    margin: 8px;
    border-radius: 8px;
    text-align: left;
  }
`

function Detail() {
  const router = useRouter();
  const {pokemonName} = router.query;

  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showFailure, setShowFailure] = React.useState(false);
  const [name, setName] = React.useState('');

  const {data} = pokemonDetail(pokemonName);

  const gacha = () => {
    const result = Math.random();
    if (result >= 0.5) {
      setShowSuccess(true);
    } else {
      setShowFailure(true);
    }
  }

  const addNewPokemon = () => {
    let owned = JSON.parse(localStorage.getItem('pokemons'));
    console.log(owned);
    if (!owned) {
      owned = {};
    }
    if (!owned[pokemonName]) {
      owned[pokemonName] = [];
    }
    owned[pokemonName].push(name);
    window.localStorage.setItem('pokemons', JSON.stringify(owned));
    setShowSuccess(false);
  }

  const SuccessPopUp = () => {
    return (
      <div className="pop-up-container">
        <div className="pop-up">
          <h2>Give your new Pokemon a name</h2>
          <input autoFocus type="text" value={name} onChange={event => setName(event.target.value)}></input>
          <button onClick={() => addNewPokemon()}>Save</button>
        </div>
      </div>
    )
  }

  const FailurePopUp = () => {
    return (
      <div className="pop-up-container">
        <div className="pop-up">
          <h2>The Pokemon escaped...</h2>
          <button onClick={() => setShowFailure(false)}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div css={styles}>
      <h1>{pokemonName}</h1>
      <img src={data?.pokemon.sprites.front_default} />
      <button onClick={() => gacha()}>Catch!</button>
      <div className="section">
        <h2>Moves</h2>
        {data?.pokemon.moves.map(({move}, i) => {
          return (move.name + (i !== data.pokemon.moves.length - 1 ? ', ' : null))
        })}
      </div>
      <div className="section">
        <h2>Types</h2>
        {data?.pokemon.types.map(({type}, i) => {
          return (type.name + (i !== data.pokemon.types.length - 1 ? ', ' : null))
        })}
      </div>
      {showSuccess && <SuccessPopUp />}
      {showFailure && <FailurePopUp />}
    </div>
  )
}

export default Detail;