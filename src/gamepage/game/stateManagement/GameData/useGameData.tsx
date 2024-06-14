import React from 'react';
import createPartialContextStore from '../createPartialContextStore';
import messageManager from '../../../messages/messageManager';
import { InitGameMessage } from '../../gameTypes';



let  GameDataProvider: typeof StoreProvider;
let  useGameData: typeof useStore;

// to type inference. This data might still be null
const { StoreProvider, useStore } = createPartialContextStore(messageManager.getInitData().initGameMessage!)

// this data should never be null if used correctly.
// The provider should be contitionally rendered after the messageManager has all initData messages received.
function initialize() {
  const { StoreProvider, useStore } = createPartialContextStore(messageManager.getInitData().initGameMessage!)

  GameDataProvider = StoreProvider
  useGameData = useStore
}

export function GameDataProviderStore({children}: {children: React.ReactNode}) {
  initialize()

  return (
    <GameDataProvider>
      <GameDataUpdater />
      {children}
    </GameDataProvider>
  )
}


/**
 * 
 * TODO: add a way to update the gameData, Websocket listener
 */
function GameDataUpdater() {

  const [gameData, setGameData] = useGameData((data) => data)


  return <></>
}


// New hook that only returns the state
// Just to be save to only change the state here, eg. over websocket
export default function useGameDataState<SelectorOutput>(
  selector: (store: InitGameMessage) => SelectorOutput
): SelectorOutput {
  const [state] = useGameData(selector);
  if (state === undefined) {
    console.log('WARNING accessing state!', selector.toString(), state)
  }
  return state;
}