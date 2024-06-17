import { ResourceRecipe, ResourceId } from "../../gameTypes"

export const preSelectIngredients =(recipe: ResourceRecipe) => {
    const pre: (ResourceId | "")[] = []
    recipe.ingredients.forEach((ingredient) => {
      if(ingredient.required) {
        pre.push(ingredient.slot[0].resource)
      }else {
        pre.push("")
      }
    })
    return pre
  }