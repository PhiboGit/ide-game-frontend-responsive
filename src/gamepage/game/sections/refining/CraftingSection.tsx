import { Box, Container, Divider, Typography } from "@mui/material";
import { ItemRecipe, ProfessionId, RarityResourceRecipe, ResourceRecipe } from "../../gameTypes";
import React from "react";
import RecipeList from "../../components/recipe/RecipeList";
import useGameDataState from "../../stateManagement/GameData/useGameData";
import CraftingResourceRecipe from "./CraftingResourceRecipe";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";
import { getLevel, getLevelProgress } from "../../gameUtils";
import LevelProgressBar from "../../components/stats/LevelProgressBar";

type SelectedRecipe = {
  recipeType: 'resource' | 'rarityResource' | 'item' | null,
  recipeId: string | null
}
export default function CraftingSection({professionId}: {professionId: ProfessionId}) {
  const [selected, setSelected] = React.useState<SelectedRecipe>({recipeType: null, recipeId: null});

  const {resourceRecipeData, rarityResourceRecipeData, itemRecipeData} = useGameDataState((data) => data);
  const professionExp = useCharacterState((char) => char.professions[professionId].exp)
  const professionLevel = getLevel(professionExp)
  const {progress, levelUpInExp} = getLevelProgress(professionExp)
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
        <Box width='200px' display='flex' flexDirection={'column'} alignItems='center'>
          <Typography variant="h5" noWrap textTransform={'capitalize'}>{professionId} Lv. {professionLevel}</Typography>
          <LevelProgressBar progress={progress} levelUpInExp={levelUpInExp}/>
        </Box>
        {(recipe && selected.recipeType === 'resource')  && 
          <CraftingResourceRecipe key={recipe.id} recipe={recipe as ResourceRecipe}/>
        }
      </Box>
    </Box>
  )
}