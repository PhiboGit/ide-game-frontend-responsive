import { Typography } from "@mui/material";
import React from "react";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";

export default function LevelCharacter() {
  const level = useCharacterState(char => char.level)

  return (
    <Typography variant="body2">Level: {level}</Typography>
  )
}