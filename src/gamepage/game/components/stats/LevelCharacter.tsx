import { Typography } from "@mui/material";
import React from "react";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";

export default function LevelCharacter() {
  const level = 1

  return (
    <Typography variant="body2">Level: {level}</Typography>
  )
}