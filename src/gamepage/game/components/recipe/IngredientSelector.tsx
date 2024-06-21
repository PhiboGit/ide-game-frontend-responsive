import { Box } from "@mui/material";
import { Ingredient, RecipeIngredient, ResourceId } from "../../gameTypes";
import ClickAwayPopper from "../common/ClickAwayPopper";
import { useState } from "react";
import BaseTile from "../tiles/BaseTile";
import ResourceSelectorMenu from "./ResourceSelectorMenu";
import ResourceIngredientTile from "./ResourceIngredientTile";


export default function IngredientSelector({recipeIngredient, selectedIngredient, onSelect}: 
  {recipeIngredient: RecipeIngredient, selectedIngredient: Ingredient, onSelect: (value: Ingredient) => void}) {
  
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopperItem = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    console.log('openPopper')
    setAnchorEl(event.currentTarget);
  };

  const closePopper = () => {
    console.log('closePopper')
    setAnchorEl(null);
  };

  function getValidResources(): {resource: ResourceId, amount: number}[]{
    const ingredients: {resource: ResourceId, amount: number}[] = [] 
    for(const recipeResource of recipeIngredient.slot){
      ingredients.push(recipeResource)
    }
    return ingredients
  }

  return (
    <Box sx={{ border: '1px dashed', borderRadius: '4px', p: '2px' }}>
          {selectedIngredient !== "empty" ? 
            <ResourceIngredientTile
              size={5}
              resourceId={selectedIngredient as ResourceId}
              amount={recipeIngredient.slot.find((r) => r.resource === selectedIngredient)?.amount || 0}
              onClick={openPopperItem}
            />
          : <BaseTile 
              size={5} 
              onClick={openPopperItem}
            />
          }
          <ClickAwayPopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
            <ResourceSelectorMenu 
              values={getValidResources()} 
              required={recipeIngredient.required} 
              onChange={(value) => onSelect(value)} 
              closeMenu={closePopper}
            />
          </ClickAwayPopper>
        </Box>
  )
}