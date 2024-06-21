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

type Props = {
  recipe: RarityResourceRecipe | ResourceRecipe | ItemRecipe
  selectedIngredients: Ingredient[]
  onChange: (slotIndex: number, value: Ingredient) => void
}

export default function IngredientsSelectors({recipe, selectedIngredients, onChange }: Props) {
  const character = useCharacterState((char) => char)

  function getValidResources(ingredientSlot: RecipeIngredient): ResourceId[]{
    const ingredients: ResourceId[] = [] 
    for(const recipeResource of ingredientSlot.slot){
      ingredients.push(recipeResource.resource)
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
            <ResourceTile 
              resourceId={selectedIngredients[slotIndex] as ResourceId} 
              onClick={openPopperItem}
              size={5}
            >
              <Typography 
                lineHeight={.95}
                fontSize={'.75rem'}
                variant="body2"
                textAlign='end' 
                sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5px 3.5px', textShadow: '1px 1px 1px black'}}
              >
                {character.resources[selectedIngredients[slotIndex] as ResourceId]}
                 / 
                {ingredientSlot.slot.find((i) => i.resource === selectedIngredients[slotIndex])?.amount}
              </Typography>
            </ResourceTile>
          : <BaseTile 
              size={5} 
              onClick={openPopperItem}
            />
          }
          <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
            <ResourceSelectorMenu values={getValidResources(ingredientSlot)} required={ingredientSlot.required} onChange={(value) => onChange(slotIndex, value)} closeMenu={closePopper}/>
          </ClickAwayPopper>
        </Box>
      </Grid>
      ))}
    </Grid>
  )
}