import React, { useEffect } from 'react';
import createPartialContextStore from '../createPartialContextStore';
import messageManager from '../../../messages/messageManager';
import { Character, UpdateCharacterMessage } from '../../gameTypes';
import { validateUpdateCharacterMessage } from '../../../messages/validation/messageValidation/updateCharacterMessage';

let  CharacterProvider: typeof StoreProvider;
let  useCharacter: typeof useStore;

// to type inference. This data might still be null
let mockCharacter: Character 
const { StoreProvider, useStore } = createPartialContextStore(mockCharacter!)

// this data should never be null if used correctly.
// The provider should be contitionally rendered after the messageManager has all initData messages received.
function initialize() {
  const { StoreProvider, useStore } = createPartialContextStore(messageManager.getInitData().initCharacterMessage!.character)

  CharacterProvider = StoreProvider
  useCharacter = useStore
}

export function CharacterProviderStore({children}: {children: React.ReactNode}) {
  initialize()

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

  useEffect(() => {
    const unsubscribe = messageManager.subscribeUpdateCharacter((data) => {
      console.log('update character messages received:', data);
      updateCharacter(data)
    })
    return () => {
      unsubscribe();
    };
  }, []);

  function updateCharacter(updateCharacterMessage: UpdateCharacterMessage) {

  }

  return <></>
}

// New hook that only returns the state
// Just to be save to only change the state here, eg. over websocket
export default function useCharacterDataState<SelectorOutput>(
  selector: (store: Character) => SelectorOutput
): SelectorOutput {
  const [state] = useCharacter(selector);
  if (state === undefined) {
    console.log('WARNING accessing state!', selector.toString(), state)
  }
  return state;
}