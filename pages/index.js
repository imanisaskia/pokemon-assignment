import React from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Item from '../components/Item'
import Footer from '../components/Footer'
import { pokemons } from '../gql/pokemons';

const styles = css`
  margin-top: 80px;
  text-align: center;

  .page-title {
    margin: 8px 0;
    font-weight: bold;
    font-size: 18px;
    text-transform: uppercase;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
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
    font-size: 20px;
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

const ITEMS_PER_PAGE = 10;

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

  return (
    <div css={styles}>
      <div className="page-title">Pokemon List</div>
      <div className="list">
        {listData?.map((pokemon, i) => {
          return (
            <Item key={i} name={pokemon.name} imageUrl={pokemon.image} />
          )
        })}
      </div>
      <div className="pagination">
        <button className="pagination-control" onClick={() => setPage(page-1)} disabled={page === 0}>«</button>
        <div className="pagination-number">{page}</div>
        <button className="pagination-control" onClick={() => setPage(page+1)} disabled={page === numPages}>»</button>
      </div>
      <Footer />
    </div>
  )
}