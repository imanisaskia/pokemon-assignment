/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Link from 'next/link'

const styles = css`
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;

  .header-content {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    max-width: 757px;
    margin: 0 auto;
    height: 60px;
  }
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  img {
    width: 1.5em;
    height: 1.5em;
    margin-left: 16px;
    margin-right: 8px;
  }
  .title {
    font-size: 1em;
    font-weight: bold;
  }
  button {
    height: 100%;
    border-radius: 0;
    background-color: transparent;
    color: var(--primary);
  }
  button:hover::after {
    border-radius: 0;
  }
`

export default function Header() {
  return (
    <div css={styles}>
      <div className="header-content">
        <div className="left">
          <img src="/pokeball.svg" />
          <div className="title">Pokemon</div>
        </div>
        <div className="right">
          <Link href="/">
            <button>All Pokemons</button>
          </Link>
          <Link href="/mylist">
            <button>My List</button>
          </Link>
        </div>
      </div>
    </div>
  )
}