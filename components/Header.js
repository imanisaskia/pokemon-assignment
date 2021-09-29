/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Link from 'next/link'

const styles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 16px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;

  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  img {
    width: 28px;
    height: 28px;
    margin-right: 8px
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  button {
    padding: 8px;
    border: none;
    text-transform: uppercase;
    font-family: var(--fonts);
    font-weight: bold;
    color: var(--primary);
    background-color: transparent;
    margin: 0 4px;
    border-radius: 8px;
  }

  button:active {
    background-color: rgba(0,0,0,0.1);
  }
`

export default function Header() {
  return (
    <div css={styles}>
      <div className="left">
        <img src="/pokeball.svg" />
        <div className="title">Pokemon</div>
      </div>
      <div className="right">
        <Link href="/">
          <button>All</button>
        </Link>
        <Link href="/mylist">
          <button>My List</button>
        </Link>
      </div>
    </div>
  )
}