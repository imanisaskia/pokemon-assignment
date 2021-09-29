/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Link from 'next/link'

const styles = css`
  padding: 40px 0;
  text-align: center;
  background-color: var(--primary);
  color: white;

  a {
    text-decoration: underline;
  }
`

export default function Header() {
  return (
    <div css={styles}>
      Pokemon data from <a href="https://pokeapi.co/">PokeAPI</a>.
    </div>
  )
}