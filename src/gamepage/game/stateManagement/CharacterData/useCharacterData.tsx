import React, { useEffect } from 'react';
import createPartialContextStore from '../createPartialContextStore';
import messageManager from '../../../messages/messageManager';
import { Character, CurrencyId, ProfessionId, ResourceId, UpdateCharacterMessage } from '../../gameTypes';
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



function CharacterUpdater() {
  const [characterData, setCharacterData] = useCharacter((char) => char)

  useEffect(() => {
    const unsubscribe = messageManager.subscribeUpdateCharacter((data) => {
      updateCharacter(data)
    })
    return () => {
      unsubscribe();
    };
  }, []);

  function updateCharacter(updateCharacterMessage: UpdateCharacterMessage) {
    const update = updateCharacterMessage.update
    
    if(update.resources !== undefined){
      Object.entries(update.resources).forEach(([resourceId, amount]) => {
        setCharacterData((prevChar) => (
          { 
            resources: { 
              ...prevChar.resources, // keep the old resources state
              [resourceId]: prevChar.resources[resourceId as ResourceId] + amount },
          }
        ))
      })
    }

    if(update.experiences !== undefined){
      Object.entries(update.experiences).forEach(([professionId, amount]) => {
        setCharacterData((prevChar) => (
          { 
            professions: { 
              ...prevChar.professions, // keep the old professions state
              [professionId]: { 
                ...prevChar.professions[professionId as ProfessionId], // keep the old profession state
                exp: prevChar.professions[professionId as ProfessionId].exp + amount // only update the exp
              }
            },
          }
        ))
      })
    }

    if(update.expChar !== undefined){
      const expChar = update.expChar
      setCharacterData((prevChar) => (
        { 
          expChar: prevChar.expChar + expChar
        }
      ))
    }

    if(update.currency !== undefined){
      Object.entries(update.currency).forEach(([currencyId, amount]) => {
        setCharacterData((prevChar) => (
          { 
            currency: { 
              ...prevChar.currency, // keep the old currency state
              [currencyId]: prevChar.currency[currencyId as CurrencyId] + amount },
          }
        ))
      })
    }

    if(update.activeAction !== undefined){
      const newAction = update.activeAction
      setCharacterData((prevChar) => (
        { 
          activeAction: newAction
        }
      ))
    
    }

    if(update.actionQueue !== undefined){
      const actionQueue = update.actionQueue
      setCharacterData((prevChar) => (
        { 
          actionQueue: actionQueue
        }
      ))
    }

    if(update.updateItem !== undefined){
      const itemId = update.updateItem._id
      setCharacterData((prevChar) => {
        const itemsSet = new Set(prevChar.items)
        itemsSet.add(itemId)
        const items = Array.from(itemsSet)
        const itemMap = { ...prevChar.itemMap, [itemId]: update.updateItem! }
        return(
        { 
          items: items,
          itemMap: itemMap
        }
      )})
    }

    if(update.removeItem !== undefined){
      const itemId = update.removeItem
      setCharacterData((prevChar) => {
        const itemsSet = new Set(prevChar.items)
        itemsSet.delete(itemId)
        const items = Array.from(itemsSet)

        delete prevChar.itemMap[itemId]
        return(
        { 
          items: items,
          itemMap: { ...prevChar.itemMap }
        }
      )})
    }

    if(update.equipment !== undefined){
      const profession = update.equipment.profession
      const equipmentSlot = update.equipment.equipmentSlot
      const itemId = update.equipment.itemId
      setCharacterData((prevChar) => (
        { 
          professions: { 
            ...prevChar.professions, // keep the old profession state
            [profession]: { 
              ...prevChar.professions[profession], // keep the old profession state
              equipment: { 
                ...prevChar.professions[profession].equipment, // keep the old equipment state
                [equipmentSlot]: itemId // set the new equipment
              }
            }
          },
        }
      ))
    }
  }

  return <></>
}

// New hook that only returns the state
// Just to be save to only change the state here in CharacterUpdater!
// CharacterUpdater is controlled by the websocket messages from the server.
export default function useCharacterState<SelectorOutput>(
  selector: (store: Character) => SelectorOutput
): SelectorOutput {
  // does not pass the updated function to the hook. only state
  const [state, setState] = useCharacter(selector);
  if (state === undefined) {
    console.log('WARNING accessing state!', selector.toString(), state)
  }
  return state;
}