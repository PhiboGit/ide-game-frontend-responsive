import React, { useCallback, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContextProvider";
import GamepageLayout from "./layout/GamepageLayout";


/**
 * root element for the game.
 * 
 * handles Auth and should hold global contexts for the game
 * 
 * 
 * 
 */
export default function GameRoot() {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <GamepageLayout />
  )
}