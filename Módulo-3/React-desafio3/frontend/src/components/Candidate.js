import React from 'react'
import Position from './Position'

export default function Candidate({ candidate, position }) {
  const { name, votes, percentage } = candidate
  return (
    <div>
      <Position>{position}</Position>
      {name} - {votes}
    </div>
  )
}
