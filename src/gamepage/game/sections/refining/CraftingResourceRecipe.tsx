import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { CraftingMsg, ResourceId, ResourceRecipe } from "../../gameTypes";
import { useState } from "react";
import ResourceTile from "../../components/tiles/ResourceTile";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";
import { getLevel } from "../../gameUtils";
import { preSelectIngredients } from "./craftingUtils";
import StartActionController from "../../components/actions/StartActionController";
import websocketService from "../../../../service/websocketService";


export default function CraftingResourceRecipe({recipe}: {recipe: ResourceRecipe}) {
  const [selectedIngredients, setSelectedIngredients] = useState<(ResourceId | "")[]>(preSelectIngredients(recipe));
  console.log(selectedIngredients)
  const character = useCharacterState((char) => char)
  const professionLevel = getLevel(character.professions[recipe.profession].exp)

  const [limit, setLimit] = useState<boolean>(false)
  const [iterations, setIterations] = useState<number>(1)

  function start(){
    const msg: CraftingMsg = {
      type: "crafting_resource",
      limit: limit,
      iterations: iterations,
      args: {
        recipe: recipe.id,
        ingredients: selectedIngredients.filter((i) => i !== "") as ResourceId[]
      }
    }

    websocketService.send(msg)
  }

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        gap={1}
      >
        {/* Titel */}
        <Typography  variant="h5">Recipe: {recipe.displayName}</Typography>
        {/* Info */}
        <Box display='flex' gap={2} >
          <Typography 
            fontSize='.66rem' 
            color={professionLevel < recipe.level ? 'error' : 'success'} 
            textTransform={'capitalize'}>
              {recipe.profession} Lv. {recipe.level}
          </Typography>
          <Typography fontSize='.66rem' color={'text.secondary'}>{recipe.time}ms</Typography>
          <Typography fontSize='.66rem' color={'text.secondary'}>Exp. {recipe.exp}</Typography>
          <Typography fontSize='.66rem' color={'text.secondary'}>Char. Exp. {recipe.expChar}</Typography>          
        </Box>
        {/* Output */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
          gap={1}
        >
          <Grid item>
            <Typography variant="body1">{recipe.amount}×</Typography>
          </Grid>
          <Grid item>
            <ResourceTile size={2} elevation={0} resourceId={recipe.resource}/>
          </Grid>
        </Grid>

        {/* Ingredients */}
        <Box 
          display="flex"
          flexDirection='row'
          alignItems="center"
        >
          {recipe.ingredients.map((ingredientSlot, slotIndex) => (
            
          <FormControl key={slotIndex} sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="ingredient-label">Ingredient</InputLabel>
            <Select
              labelId="ingredient-label"
              id="ingredient"
              value={selectedIngredients[slotIndex]}
              onChange={(event) => setSelectedIngredients((pre) => {
                const newPre = [...pre]
                newPre[slotIndex] = event.target.value as (ResourceId | "")
                return newPre
              })}
            >
              {!ingredientSlot.required && 
                <MenuItem key={"empty"} value={""}>
                  empty
                </MenuItem>}
              {ingredientSlot.slot.map((ingredient, index) => (
                <MenuItem key={index} value={ingredient.resource}>
                  {ingredient.amount}   {ingredient.resource}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          ))}
          </Box>


          <StartActionController limit={limit} setLimit={setLimit} iterations={iterations} setIterations={setIterations} startDisabled={false} onClickStart={start}/>
      </Box>
    </Container>
  )
}