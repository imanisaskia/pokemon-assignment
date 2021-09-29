/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Link from 'next/link'

const styles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  background-color: white;
  box-shadow: var(--shadow);

  img {
    height: 96px;
    width: 96px;
  }
  .item-owned {
    font-size: 0.9em;
  }
`

export default function Item({name, imageUrl, owned}) {
  return (
    <Link href={'/pokemon/'+name}>
      <div css={styles}>
        <h3>{name}</h3>
        <img src={imageUrl} />
        <div className="item-owned">owned: {owned}</div>
      </div>
    </Link>
  )
}