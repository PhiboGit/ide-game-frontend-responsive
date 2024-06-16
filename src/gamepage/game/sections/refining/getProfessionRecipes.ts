import { InitGameMessage, ItemRecipe, ProfessionId, RarityResourceRecipe, ResourceRecipe } from "../../gameTypes";

export function getProfessionRecipes(profession: ProfessionId, gameData: InitGameMessage)
  :{resourceRecipes: Map<string, ResourceRecipe>,
    rarityResourceRecipes: Map<string, RarityResourceRecipe>,
    itemRecipes: Map<string, ItemRecipe>}
{
  const resourceRecipes = new Map<string, ResourceRecipe>();
  Object.entries(gameData.resourceRecipeData).forEach(([recipeId, resourceRecipe]) => {
    if(resourceRecipe.profession === profession) {
      resourceRecipes.set(recipeId, resourceRecipe);
    }
  })

  const rarityResourceRecipes = new Map<string, RarityResourceRecipe>();
  Object.entries(gameData.rarityResourceRecipeData).forEach(([recipeId, rarityResourceRecipe]) => {
    if(rarityResourceRecipe.profession === profession) {
      rarityResourceRecipes.set(recipeId, rarityResourceRecipe);
    }
  })

  const itemRecipes = new Map<string, ItemRecipe>();
  Object.entries(gameData.itemRecipeData).forEach(([recipeId, itemRecipe]) => {
    if(itemRecipe.profession === profession) {
      itemRecipes.set(recipeId, itemRecipe);
    }
  })


  return {resourceRecipes, rarityResourceRecipes, itemRecipes};
}