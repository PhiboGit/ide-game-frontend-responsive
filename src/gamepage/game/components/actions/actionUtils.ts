import { ActionObject } from "../../gameTypes";
import useGameDataState from "../../stateManagement/GameData/useGameData";

export function getActionName(actionObject: ActionObject | null): { profession: string, action: string } {
  const gameData = useGameDataState((data) => data)
  if (!actionObject) return { profession: '', action: 'No Action' }

  let profession = 'profession_name'
  if ('node' in actionObject.actionMsg.args) {
    const node = actionObject.actionMsg.args.node
    profession = gameData.gatheringNodeData[node].profession
  }

  if ('recipe' in actionObject.actionMsg.args) {
    const recipeId = actionObject.actionMsg.args.recipe
    const recipe = gameData.resourceRecipeData[recipeId] || gameData.rarityResourceRecipeData[recipeId] || gameData.itemRecipeData[recipeId]
    profession = recipe.profession
  }
  profession = profession.charAt(0).toUpperCase() + profession.slice(1)
  
  let action = 'action_name'
  if ('node' in actionObject.actionMsg.args) {
    const node = actionObject.actionMsg.args.node
    action = gameData.gatheringNodeData[node].displayName
  }

  if ('recipe' in actionObject.actionMsg.args) {
    const recipeId = actionObject.actionMsg.args.recipe
    const recipe = gameData.resourceRecipeData[recipeId] || gameData.rarityResourceRecipeData[recipeId] || gameData.itemRecipeData[recipeId]
    action = recipe.displayName
  }

  return {profession, action}
}
