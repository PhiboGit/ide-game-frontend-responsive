import React, { useCallback, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContextProvider";
import GamepageLayout from "./layout/GamepageLayout";
import { GameDataProviderStore } from "./game/stateManagement/GameData/useGameData";
import { CharacterProviderStore } from "./game/stateManagement/CharacterData/useCharacterData";
import websocketService from "../service/websocketService";
import messageManager from "./messages/messageManager";
import { ServerDataProviderStore } from "./game/stateManagement/serverData/useServerData";


/**
 * root element for the game.
 * 
 * handles Auth and should hold global contexts for the game
 * 
 * 
 * 
 */
export default function GamepageRoot() {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) {
    return <Navigate to="/" />
  }

  const [websocketState, setWebsocketState] = useState('closed')
  const connected = websocketState === 'open'

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const connect = () => {
      websocketService.connect(setWebsocketState)
    }
    connect()
    return () => {
      websocketService.close()
    }
  }, [])

  useEffect(() => {
    const unsubscribe = messageManager.subscribeInit((data) => {
      console.log('All init messages received:', data);
      setLoading(false);
      unsubscribe()
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    connected ? (
      loading ? (
        <div>Loading...</div>
      ) : (
        <ServerDataProviderStore>
          <GameDataProviderStore>
            <CharacterProviderStore>
              <GamepageLayout />
            </CharacterProviderStore>
          </GameDataProviderStore>
        </ServerDataProviderStore>
      )
    ) : (
      <div>Not connected!</div>
    )
  );
}