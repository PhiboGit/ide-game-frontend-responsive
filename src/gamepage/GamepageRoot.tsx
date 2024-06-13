import React, { useCallback, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContextProvider";
import GamepageLayout from "./layout/GamepageLayout";
import { GameDataProviderStore } from "./game/stateManagement/GameData/useGameData";
import { CharacterProviderStore } from "./game/stateManagement/CharacterData/useCharacterData";
import websocketService from "../service/websocketService";
import messageManager from "./messages/messageManager";


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
  const [websocketState, setWebsocketState] = useState('closed')

  const connected = websocketState === 'open'

  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  useEffect(() => {
    const connect = () => {
      websocketService.connect(
        setWebsocketState,
        onMessage)
    }
    connect()
    return () => {
      websocketService.close()
    }
  }, [])

  function onMessage(message: any) {
    messageManager.onMessage(message)
  }

  return (
    <GameDataProviderStore>
        <CharacterProviderStore>
          {connected ? 
            <GamepageLayout />
          : <div>Not connected!</div>
          }
        </CharacterProviderStore>
      </GameDataProviderStore>
  )
}