import { Typography } from "@mui/material";
import React from "react";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";

export default function ExpCharacter() {
  const exp = useCharacterState(char => char.exp)

  return (
    <Typography variant="body2">Exp: {exp}</Typography>
  )
}