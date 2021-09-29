/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Link from 'next/link'

const styles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 40%;
  max-width: 200px;
  padding: 16px;
  border-radius: 8px;
  margin: 8px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

  .item-name {
    font-weight: bold;
  }

  .item-owned {
    font-size: 14px;
  }
`

export default function Item({name, imageUrl, owned = 0}) {
  return (
    <Link href={'/pokemon/'+name}>
      <div css={styles}>
        <div className="item-name">{name}</div>
        <img src={imageUrl} />
        <div className="item-owned">owned: {owned}</div>
      </div>
    </Link>
  )
}