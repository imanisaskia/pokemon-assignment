import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import MyItem from '../components/MyItem'
import { pokemonDetail } from '../gql/pokemonDetail';

const styles = css`
  text-align: center;
  max-width: 757px;
  min-width: 360px;
  margin: auto;
  padding-top: 76px;
  padding-bottom: 16px;
  
  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }
  .item-wrapper {
    width: 50%;
    padding: 4px;
  }
  @media (min-width: 757px) {
    .item-wrapper {
      width: 25%;
    }
  }
`

export default function MyList() {
  if (typeof window === "undefined") {
    return <></>;
  }

  const listData = JSON.parse(window.localStorage.getItem('pokemons'));

  const deletePokemon = (type, name) => {
    let newData = listData;
    let index = newData[type].indexOf(name);
    newData[type].splice(index, 1);

    if (newData[type].length === 0) {
      delete newData[type];
    }

    window.localStorage.setItem('pokemons', JSON.stringify(newData));
    location.reload();
  }

  return (
    <div css={styles}>
      <h1>My Pokemons</h1>
      <div className="list">
        {(!listData || Object.keys(listData).length === 0) && 'You have yet to capture a Pokemon.'}
        {listData && Object.keys(listData).map((type, i) => {
          return (
            <>
              {listData[type].map((name, j) => {
                return (
                  <div key={i+j} className="item-wrapper">
                    <MyItem
                      name={name}
                      imageUrl={pokemonDetail(type).data?.pokemon.sprites.front_default}
                      onDelete={() => deletePokemon(type, name)}
                    />
                  </div>
                )
              })}
            </>
          )
        })}
      </div>
    </div>
  )
}