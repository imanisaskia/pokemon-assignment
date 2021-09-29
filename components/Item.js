/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Link from 'next/link'

const styles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 29%;
  max-width: 200px;
  padding: 8px;
  border-radius: 8px;
  margin: 4px;
  background-color: white;
  box-shadow: var(--shadow);

  .item-owned {
    font-size: 14px;
  }
`

export default function Item({name, imageUrl, owned}) {
  return (
    <Link href={'/pokemon/'+name}>
      <div css={styles}>
        <h3>{name}</h3>
        <img src={imageUrl} />
        {owned && <div className="item-owned">owned: {owned}</div>}
      </div>
    </Link>
  )
}