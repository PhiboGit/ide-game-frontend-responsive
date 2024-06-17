import { Box, Collapse, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { ProfessionId } from "../../gameTypes";
import useGameDataState from "../../stateManagement/GameData/useGameData"
import { getProfessionRecipes } from "../../components/recipe/getProfessionRecipes";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import React from "react";
import ResourceTile from "../../components/tiles/ResourceTile";
import RecipeList from "../../components/recipe/RecipeList";

type SelectedRecipe = {
  recipeType: 'resource' | 'rarityResource' | 'item' | null,
  recipeId: string | null
}
export default function SmeltingSection() {
  const [selected, setSelected] = React.useState<SelectedRecipe>({recipeType: null, recipeId: null});
  
  const handleSelect = (recipeType: 'resource' | 'rarityResource' | 'item', recipeId: string) => {
    setSelected({recipeType, recipeId});
  }

  return (
    <Box display='flex'>
      <RecipeList profession='smelting' onChange={handleSelect}/>
      <Box>
        {(selected.recipeType === 'resource' && selected.recipeId)  && 
          <Typography variant="h6">Recipe: {selected.recipeId}</Typography>
        }
      </Box>
    </Box>
  )
}