import { Typography } from "@mui/material";
import React from "react";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";

export default function CharacterName() {
  const name = useCharacterState(char => char.characterName)

  return (
    <Typography variant="body2">Name: {name}</Typography>
  )
}