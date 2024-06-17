import { Box, Divider, Typography } from "@mui/material";
import { ProfessionId } from "../../gameTypes";
import React from "react";
import RecipeList from "../../components/recipe/RecipeList";

type SelectedRecipe = {
  recipeType: 'resource' | 'rarityResource' | 'item' | null,
  recipeId: string | null
}
export default function CraftingSection({professionId}: {professionId: ProfessionId}) {
  const [selected, setSelected] = React.useState<SelectedRecipe>({recipeType: null, recipeId: null});
  
  const handleSelect = (recipeType: 'resource' | 'rarityResource' | 'item', recipeId: string) => {
    setSelected({recipeType, recipeId});
  }

  return (
    <Box display='flex' >
      
      <RecipeList profession={professionId} onChange={handleSelect}/>
      <Divider orientation="vertical" flexItem/>
      <Box>
        {(selected.recipeType === 'resource' && selected.recipeId)  && 
          <>
            <Typography variant="h6">Recipe: {selected.recipeId}</Typography>
            
          
          </>
        }
      </Box>
      
    </Box>
  )
}