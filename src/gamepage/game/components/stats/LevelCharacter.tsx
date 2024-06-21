import { Typography } from "@mui/material";
import React from "react";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";
import { getLevel } from "../../gameUtils";

export default function LevelCharacter() {
  const expChar = useCharacterState(char => char.expChar)
  const level = getLevel(expChar)
  return (
    <Typography variant="body2">Level: {level}</Typography>
  )
}