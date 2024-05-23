import { Typography } from "@mui/material";
import React from "react";
import useCharacterDataState from "../../stateManagement/CharacterData/useCharacterData";

export default function CharacterName() {
  const name = useCharacterDataState(char => char.characterName)

  return (
    <Typography variant="body2">Name: {name}</Typography>
  )
}