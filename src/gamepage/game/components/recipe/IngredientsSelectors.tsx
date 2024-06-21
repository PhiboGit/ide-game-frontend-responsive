import { Box, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import { Ingredient, ItemRecipe, RarityResourceRecipe, RecipeIngredient, ResourceId, ResourceRecipe } from "../../gameTypes";
import useGameDataState from "../../stateManagement/GameData/useGameData";
import ItemTile from "../tiles/ItemTile";
import ClickAwayPopper from "../common/ClickAwayPopper";
import { useState } from "react";
import BaseTile from "../tiles/BaseTile";
import ResourceSelectorMenu from "./ResourceSelectorMenu";
import ResourceTile from "../tiles/ResourceTile";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";
import ResourceIngredientTile from "./ResourceIngredientTile";

type Props = {
  recipe: RarityResourceRecipe | ResourceRecipe | ItemRecipe
  selectedIngredients: Ingredient[]
  onChange: (slotIndex: number, value: Ingredient) => void
}

export default function IngredientsSelectors({recipe, selectedIngredients, onChange }: Props) {
  const character = useCharacterState((char) => char)

  function getValidResources(ingredientSlot: RecipeIngredient): {resource: ResourceId, amount: number}[]{
    const ingredients: {resource: ResourceId, amount: number}[] = [] 
    for(const recipeResource of ingredientSlot.slot){
      ingredients.push(recipeResource)
    }
    return ingredients
  }

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopperItem = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    console.log('openPopper')
    setAnchorEl(event.currentTarget);
  };

  const closePopper = () => {
    console.log('closePopper')
    setAnchorEl(null);
  };
  return (
    <Grid 
      container
      justifyContent={"center"}
      spacing={1}
    >
      {recipe.ingredients.map((ingredientSlot, slotIndex) => (
        <Grid item key={slotIndex}>
          <Box sx={{ border: '1px dashed', borderRadius: '4px', p: '2px' }}>
          {selectedIngredients[slotIndex] !== "empty" ? 
            <ResourceIngredientTile
              size={5}
              resourceId={selectedIngredients[slotIndex] as ResourceId}
              amount={ingredientSlot.slot.find((r) => r.resource === selectedIngredients[slotIndex])?.amount || 0}
              onClick={openPopperItem}
            />
          : <BaseTile 
              size={5} 
              onClick={openPopperItem}
            />
          }
          <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
            <ResourceSelectorMenu 
              values={getValidResources(ingredientSlot)} 
              required={ingredientSlot.required} 
              onChange={(value) => onChange(slotIndex, value)} 
              closeMenu={closePopper}
            />
          </ClickAwayPopper>
        </Box>
      </Grid>
      ))}
    </Grid>
  )
}