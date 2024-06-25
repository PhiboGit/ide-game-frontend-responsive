import { ResourceRecipe, ItemRecipe, RarityResourceRecipe, RarityType, Ingredient } from "../../../gameTypes"

export const preSelectIngredients =(recipe: ResourceRecipe | RarityResourceRecipe | ItemRecipe) => {
  const pre: Ingredient[] = []
  recipe.ingredients.forEach((ingredient) => {
    if(ingredient.required) {
      pre.push(ingredient.slot[0].resource)
    }else {
      pre.push("empty")
    }
  })
  return pre
}

export const getOdds = (recipe:RarityResourceRecipe, rarity: RarityType, luck: number) => {
  const rarityRollArray = Array.from(recipe.rarityRoll)
  const rarityIndex = rarityRollArray.findIndex((r) => r.rarity === rarity)
  
  const value = rarityRollArray[rarityIndex].value
  const nextValue = rarityRollArray[rarityIndex + 1]?.value || recipe.maxRoll

  const range = luck <= value ? nextValue - value : Math.max(0, nextValue - luck)
  const rollRange = recipe.maxRoll - luck

  const odds = (range / rollRange) * 100

  return odds
}