import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import MyItem from '../components/MyItem'
import { pokemonDetail } from '../gql/pokemonDetail';

const styles = css`
  text-align: center;
  max-width: 576px;
  margin: auto;
  padding-top: 80px;
  padding-bottom: 16px;

  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }
  .item-wrapper {
    width: 160px;
    margin: 4px;
  }
`

export default function MyList() {
  if (typeof window === "undefined") {
    return <></>;
  }

  const listData = () => {
    let array = [];
    const data = JSON.parse(window.localStorage.getItem('pokemons'));
    Object.keys(data).forEach((type) => {
      data[type].forEach((name) => {
        array.push({type, name});
      })
    })
    return array;
  }

  const deletePokemon = (type, name) => {
    let newData = JSON.parse(window.localStorage.getItem('pokemons'));
    let index = newData[type].indexOf(name);
    newData[type].splice(index, 1);
    window.localStorage.setItem('pokemons', JSON.stringify(newData));
    location.reload();
  }

  return (
    <div css={styles}>
      <h1>My Pokemons</h1>
      <div className="list">
        {listData().map(({type, name}, i) => {
          return (
            <div key={i} className="item-wrapper">
              <MyItem
                name={name}
                imageUrl={pokemonDetail(type).data?.pokemon.sprites.front_default}
                onDelete={() => deletePokemon(type, name)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}