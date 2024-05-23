import React from 'react'
import LevelCharacter from '../../../components/stats/LevelCharacter'
import ExpCharacter from '../../../components/stats/ExpCharacter'

export default function CharacterStatsSection() {
  return (
    <div style={{ padding: "1rem", display: "flex", flexDirection: "column" }}>
      Stats:
      <LevelCharacter />
      <ExpCharacter />
    </div>
  )
}