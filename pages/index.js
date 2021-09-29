import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Item from '../components/Item'
import { pokemons } from '../gql/pokemons';

const styles = css`
  text-align: center;
  max-width: 767px;
  min-width: 360px;
  margin: auto;
  padding-top: 76px;

  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 4px;
  }
  .item-wrapper {
    width: 50%;
    padding: 4px;
  }
  @media (min-width: 767px) {
    .item-wrapper {
      width: 25%;
    }
  }
  .pagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
  }
  .pagination-control {
    border: 0;
    background-color: transparent;
    padding: 4px 8px;
    margin: 16px;
    font-size: 1.5em;
    font-weight: bold;
    color: var(--primary);
  }
  .pagination-control:disabled {
    opacity: 0.3;
  }
  .pagination-control:active {
    background-color: rgba(0,0,0,0.1);
  }
  .pagination-number {
    height: 32px;
    width: 32px;
    padding: 4px;
    color: white;
    border-radius: 100%;
    background-color: var(--primary); 
  }
`

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const [page, setPage] = React.useState(1);
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const {data} = pokemons(ITEMS_PER_PAGE, offset);
  const numResults = data?.pokemons.count;
  const numPages = Math.ceil(numResults / ITEMS_PER_PAGE);

  const listData = data?.pokemons.results;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const countOwned = (pokemonName) => {
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

  return (
    <div css={styles}>
      <h1>Pokemon List</h1>
      <div className="list">
        {listData?.map((pokemon, i) => {
          return (
            <div key={i} className="item-wrapper">
              <Item name={pokemon.name} imageUrl={pokemon.image} owned={countOwned(pokemon.name)} />
            </div>
          )
        })}
      </div>
      <div className="pagination">
        <button className="pagination-control" onClick={() => setPage(page-1)} disabled={page === 0}>«</button>
        <div className="pagination-number">{page}</div>
        <button className="pagination-control" onClick={() => setPage(page+1)} disabled={page === numPages}>»</button>
      </div>
    </div>
  )
}