import React from 'react'

export default function Spinner(): JSX.Element {
  return (
    <div className="spinner-wrap">
      <div className="spinner" aria-hidden="true"></div>
    </div>
  )
}
