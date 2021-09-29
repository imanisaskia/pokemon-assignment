/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'

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
  button {
    width: 100%;
  }
`

export default function MyItem({name, imageUrl, onDelete}) {
  return (
    <div css={styles}>
      <b>{name}</b>
      <img src={imageUrl} />
      <button onClick={onDelete}>Release</button>
    </div>
  )
}