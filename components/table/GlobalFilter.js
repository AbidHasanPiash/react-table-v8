import React from 'react'

export default function GlobalFilter({ filter, setFilter }) {
  return (
    <input
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search"
        className="w-fit py-2 pl-2 rounded-lg outline-none focus:bg-gray-100 ring-1 ring-gray-300 focus:ring-primary"
    />
  )
}
