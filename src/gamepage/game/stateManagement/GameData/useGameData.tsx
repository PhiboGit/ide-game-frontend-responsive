import React from 'react';
import createPartialContextStore from '../createPartialContextStore';


interface ResourceInfo  {
  id: string
  displayName: string
  rarity: Rarity
}

type ResourceData = {
  [key: string]: ResourceInfo
}
const fakeResourceDataObject: ResourceData  = {
  'woodT2': { id: 'woodT2', displayName: 'Oak Wood', rarity: 'uncommon' },
  'woodT1': { id: 'woodT1', displayName: 'Birch Wood', rarity: 'common' },
  'woodT3': { id: 'woodT3', displayName: 'Elderwood', rarity: 'rare' },
  'woodT4': { id: 'woodT4', displayName: 'Willow Wood', rarity: 'legendary' },
  'woodT5': { id: 'woodT4', displayName: 'Willow Wood', rarity: 'none' },
};

type GameDataContext = {
  resourceData : ResourceData
}

const fakeGameData: GameDataContext = {
  resourceData: fakeResourceDataObject
}

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
 * TODO: add a way to update the character, Websocket listener
 */
function GameDataUpdater() {

  const [gameData, setGameData] = useGameData((data) => data)


  return <></>
}


// New hook that only returns the state
// Just to be save to only change the state here, eg. over websocket
export default function useGameDataState<SelectorOutput>(
  selector: (store: GameDataContext) => SelectorOutput
): SelectorOutput {
  const [state] = useGameData(selector);
  if (state === undefined) {
    console.log('WARNING accessing state!', selector.toString(), state)
  }
  return state;
}