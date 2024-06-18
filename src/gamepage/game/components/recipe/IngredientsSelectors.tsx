import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import { Ingredient, ItemRecipe, RarityResourceRecipe, ResourceId, ResourceRecipe } from "../../gameTypes";
import useGameDataState from "../../stateManagement/GameData/useGameData";

type Props = {
  recipe: RarityResourceRecipe | ResourceRecipe | ItemRecipe
  selectedIngredients: Ingredient[]
  onChange: (slotIndex: number, value: Ingredient) => void
}

export default function IngredientsSelectors({recipe, selectedIngredients, onChange }: Props) {
  const {resourceData} = useGameDataState((data) => data)

  return (
    <Grid 
      container
      justifyContent={"center"}
    >
      {recipe.ingredients.map((ingredientSlot, slotIndex) => (
        <Grid item key={slotIndex}>
            <FormControl key={slotIndex} sx={{ m: 1, width: 160 }}>
            <Select
            id="ingredient"
            value={selectedIngredients[slotIndex]}
            onChange={(event) => onChange(slotIndex, event.target.value as Ingredient)}
            >
            {!ingredientSlot.required && 
                <MenuItem key={"empty"} value={"empty"}>
                empty
                </MenuItem>}
            {ingredientSlot.slot.map((ingredient, index) => (
                <MenuItem key={index} value={ingredient.resource}>
                {ingredient.amount}   {resourceData[ingredient.resource].displayName}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
      </Grid>
      ))}
    </Grid>
  )
}