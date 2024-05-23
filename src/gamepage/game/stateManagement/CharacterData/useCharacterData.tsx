import React, { useEffect } from 'react';
import createPartialContextStore from '../createPartialContextStore';
import { fakeCharacter } from './fakeCharacterData';


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
        exp: prevChar.exp + 1
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
  selector: (store: typeof fakeCharacter) => SelectorOutput
): SelectorOutput {
  const [state] = useCharacter(selector);
  if (state === undefined) {
    console.log('WARNING accessing state!', selector.toString(), state)
  }
  return state;
}