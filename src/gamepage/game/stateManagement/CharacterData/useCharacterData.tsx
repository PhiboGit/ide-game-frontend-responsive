import React, { useEffect } from 'react';
import createPartialContextStore from '../createPartialContextStore';

type ResourceIdString = "woodT1" | "woodT2" | "woodT3" | "woodT4" | "woodT5" | "oreT1" | "oreT2" | "oreT3" | "oreT4" | "oreT5"

type Resources = Record<ResourceIdString, number>

type CharacterData = {
  characterName: string,
  level: number,
  exp: number,
  resources: Resources,
  items: string[]
}

const fakeCharacter: CharacterData = {
  characterName: "Phibo",
  level: 32,
  exp: 45213,
  resources: {
    woodT1: 10,
    woodT2: 0,
    woodT3: 30,
    woodT4: 0,
    woodT5: 50,
    oreT1: 1,
    oreT2: 20,
    oreT3: 0,
    oreT4: 40,
    oreT5: 0,
  },
  items: ["id_1", "id_2", "id_3"],
}


const { StoreProvider: CharacterProvider, useStore: useCharacter } = createPartialContextStore(fakeCharacter)

export function CharacterProviderStore({children}: {children: React.ReactNode}) {

  return (
    <CharacterProvider>
      <CharacterUpdater />
      {children}
    </CharacterProvider>
  )
}


/**
 * 
 * TODO: add a way to update the character, Websocket listener
 */
function CharacterUpdater() {

  const [characterData, setCharacterData] = useCharacter((char) => char)


  function simulateWoodcutting() {
    setCharacterData((prevChar) => (
      { 
        resources: { ...prevChar.resources, ['woodT1']: prevChar.resources.woodT1 + 1 },
        items: [...prevChar.items, `item_${prevChar.items.length + 1}`]
      }
    ))
  }
  
  function simulateExp(){
    setCharacterData((prevChar) => ({
        level: prevChar.level + 1,
    }))
  }

  useEffect(() => {
    const interval = setInterval(simulateWoodcutting, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(simulateExp, 7000)
    return () => clearInterval(interval)
  }, [])

  return <></>
}

// New hook that only returns the state
// Just to be save to only change the state here, eg. over websocket
export default function useCharacterDataState<SelectorOutput>(
  selector: (store: CharacterData) => SelectorOutput
): SelectorOutput {
  const [state] = useCharacter(selector);
  if (state === undefined) {
    console.log('WARNING accessing state!', selector.toString(), state)
  }
  return state;
}