import { Typography } from "@mui/material";
import React from "react";
import useCharacterDataState from "../../stateManagement/CharacterData/useCharacterData";

export default function LevelCharacter() {
  const level = useCharacterDataState(char => char.level)

  return (
    <Typography variant="body2">Level: {level}</Typography>
  )
}