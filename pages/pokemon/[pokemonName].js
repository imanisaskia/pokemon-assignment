import React from 'react';
import { useRouter } from 'next/router';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import { pokemonDetail } from '../../gql/pokemonDetail';

const styles = css`
  text-align: center;
  max-width: 757px;
  min-width: 360px;
  margin: auto;
  padding-top: 76px;
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
  .count-owned {
    margin-top: 8px;
  }
  button {
    margin: 8px 0;
  }
  .section {
    background-color: white;
    box-shadow: var(--shadow);
    padding: 16px;
    margin: 8px;
    border-radius: 8px;
    text-align: left;
  }
  .list-item {
    display: inline-block;
    margin-bottom: 8px;
    margin-right: 8px;
    padding: 4px 8px;
    background-color: rgba(0,0,0,0.1);
    font-size: 0.9em;
  }
  .error-message {
    font-size: 0.8em;
    color: var(--primary);
    height: 40px;
  }
`

function Detail() {
  const router = useRouter();
  const {pokemonName} = router.query;

  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showFailure, setShowFailure] = React.useState(false);
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState(false);

  const {data} = pokemonDetail(pokemonName);

  if (typeof window === "undefined") {
    return <></>;
  }

  const countOwned = () => {
    const ownedData = JSON.parse(window.localStorage.getItem('pokemons'));
    if (ownedData) {
      if (ownedData[pokemonName]) {
        return ownedData[pokemonName].length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

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
    if (!owned) {
      owned = {};
    }
    if (!owned[pokemonName]) {
      owned[pokemonName] = [];
    }
    if (name === '') {
      setError('Nickname must be at least 1 character');
      return;
    }
    if (owned[pokemonName].includes(name)) {
      setError('Please choose a different nickname');
      return;
    }
    owned[pokemonName].push(name);
    window.localStorage.setItem('pokemons', JSON.stringify(owned));
    setShowSuccess(false);
    setName('');
    setError('');
  }

  const SuccessPopUp = () => {
    return (
      <div className="pop-up-container">
        <div className="pop-up">
          <h2>Give your new Pokemon a nickname</h2>
          <input autoFocus type="text" value={name} onChange={event => setName(event.target.value)}></input>
          <div className="error-message">{error}</div>
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
      <div className="count-owned">owned: {countOwned()}</div>
      <button onClick={() => gacha()}>Catch!</button>
      <div className="section">
        <h2>Moves</h2>
        {data?.pokemon.moves.map(({move}, i) => {
          return <div key={'move-'+i} className="list-item">{move.name}</div>;
        })}
      </div>
      <div className="section">
        <h2>Types</h2>
        {data?.pokemon.types.map(({type}, i) => {
          return <div key={'type-'+i} className="list-item">{type.name}</div>;
        })}
      </div>
      {showSuccess && <SuccessPopUp />}
      {showFailure && <FailurePopUp />}
    </div>
  )
}

export default Detail;