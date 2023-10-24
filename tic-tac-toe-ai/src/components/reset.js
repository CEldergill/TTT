import React from 'react'

import "./reset.css"

export const Reset = ({resetBoard}) => {
  return (
    <button className="resetbtn" onClick = {resetBoard}>Reset</button>
  )
}
