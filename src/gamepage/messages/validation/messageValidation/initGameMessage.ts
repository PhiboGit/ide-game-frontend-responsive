import { GatheringNodeData, validateGatheringNodeData } from "../gameData/gatheringNodeData"
import { ResourceData, validateResourceData } from "../gameData/resourceData"

export type InitGameMessage = {
  type: 'init_game',
  gatheringNodeData: GatheringNodeData,
  resourceData: ResourceData
}

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