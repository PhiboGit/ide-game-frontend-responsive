import { Box, Divider } from "@mui/material";
import { ItemRecipe, ProfessionId, RarityResourceRecipe, ResourceRecipe } from "../../gameTypes";
import React from "react";
import RecipeList from "./RecipeList";
import useGameDataState from "../../stateManagement/GameData/useGameData";
import CraftingResourceRecipe from "./recipeDisplay/CraftingResourceRecipe";
import CraftingQualityResourceRecipe from "./recipeDisplay/CraftingQualityResourceRecipe";
import CraftingItemRecipe from "./recipeDisplay/CraftingItemRecipe";
import ProfessionTitle from "../common/ProfessionTitle";

type SelectedRecipe = {
  recipeType: 'resource' | 'rarityResource' | 'item' | null,
  recipeId: string | null
}
export default function RecipeSelector({professionId}: {professionId: ProfessionId}) {
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
      <Box flex={1} display='flex' flexDirection='column' alignItems={'center'} mt='.75rem'>
        <ProfessionTitle profession={professionId}/>
        {(recipe && selected.recipeType === 'resource')  && 
          <CraftingResourceRecipe key={recipe.id} recipe={recipe as ResourceRecipe}/>
        }
        {(recipe && selected.recipeType === 'rarityResource')  && 
          <CraftingQualityResourceRecipe key={recipe.id} recipe={recipe as RarityResourceRecipe}/>
        }
        {(recipe && selected.recipeType === 'item')  && 
          <CraftingItemRecipe key={recipe.id} recipe={recipe as ItemRecipe}/>
        }
      </Box>
    </Box>
  )
}