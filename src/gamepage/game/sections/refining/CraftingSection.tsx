import { Box, Container, Divider, Typography } from "@mui/material";
import { ItemRecipe, ProfessionId, RarityResourceRecipe, ResourceRecipe } from "../../gameTypes";
import React from "react";
import RecipeList from "../../components/recipe/RecipeList";
import useGameDataState from "../../stateManagement/GameData/useGameData";
import CraftingResourceRecipe from "./CraftingResourceRecipe";

type SelectedRecipe = {
  recipeType: 'resource' | 'rarityResource' | 'item' | null,
  recipeId: string | null
}
export default function CraftingSection({professionId}: {professionId: ProfessionId}) {
  const [selected, setSelected] = React.useState<SelectedRecipe>({recipeType: null, recipeId: null});

  const {resourceRecipeData, rarityResourceRecipeData, itemRecipeData} = useGameDataState((data) => data);
  const recipe = getRecipe()
  function getRecipe(): ResourceRecipe | RarityResourceRecipe | ItemRecipe | null {
    if(!selected.recipeId) return null
    if(selected.recipeType === 'resource') {
      return resourceRecipeData[selected.recipeId]
    } else if(selected.recipeType === 'rarityResource') {
      return rarityResourceRecipeData[selected.recipeId]
    } else if(selected.recipeType === 'item') {
      return itemRecipeData[selected.recipeId]
    }
    return null
  }
  
  const handleSelect = (recipeType: 'resource' | 'rarityResource' | 'item', recipeId: string) => {
    setSelected({recipeType, recipeId});
  }

  return (
    <Box display='flex' >
      
      <RecipeList profession={professionId} onChange={handleSelect}/>
      <Divider orientation="vertical" flexItem/>
      {(recipe && selected.recipeType === 'resource')  && 
        <CraftingResourceRecipe key={recipe.id} recipe={recipe as ResourceRecipe}/>
      }
      
    </Box>
  )
}