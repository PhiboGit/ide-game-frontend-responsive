import React from 'react';
import createPartialContextStore from '../createPartialContextStore';
import { fakeGameData } from './fakeGameData';

const { StoreProvider: GameDataProvider, useStore: useGameData } = createPartialContextStore(fakeGameData)

export function GameDataProviderStore({children}: {children: React.ReactNode}) {
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
  selector: (store: typeof fakeGameData) => SelectorOutput
): SelectorOutput {
  const [state] = useGameData(selector);
  if (state === undefined) {
    console.log('WARNING accessing state!', selector.toString(), state)
  }
  return state;
}