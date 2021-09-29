import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import MyItem from '../components/MyItem'
import { pokemonDetail } from '../gql/pokemonDetail';

const styles = css`
  margin-top: 80px;
  text-align: center;

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

  let listData = JSON.parse(window.localStorage.getItem('pokemons'));

  const deletePokemon = (type, name) => {
    let newListData = listData;
    let index = listData[type].indexOf(name);
    newListData[type].splice(index, 1);
    window.localStorage.setItem('pokemons', JSON.stringify(newListData));
    location.reload();
  }

  return (
    <div css={styles}>
      <h1>My Pokemons</h1>
      <div className="list">
        {Object.keys(listData).map((type, i) => {
          return (
            <div key={i}>
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
            </div>
          )
        })}
      </div>
    </div>
  )
}