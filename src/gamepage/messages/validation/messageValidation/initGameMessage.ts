import { InitGameMessage } from "../../../game/gameTypes"
import {  validateGatheringNodeData } from "../gameData/gatheringNodeData"
import {  validateResourceData } from "../gameData/resourceData"

export function validateInitGameMessage(message: any): InitGameMessage {
  if(message && message.type === 'init_game'
    && validateGatheringNodeData(message.gatheringNodeData)
    && validateResourceData(message.resourceData)
  ) {
    console.log('InitGameMessage is valid')
    return message as InitGameMessage
  }

  throw new Error('Error validating InitGameMessage')
}