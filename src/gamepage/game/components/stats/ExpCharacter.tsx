import { Typography } from "@mui/material";
import React from "react";
import useCharacterDataState from "../../stateManagement/CharacterData/useCharacterData";

export default function ExpCharacter() {
  const exp = useCharacterDataState(char => char.exp)

  return (
    <Typography variant="body2">Exp: {exp}</Typography>
  )
}