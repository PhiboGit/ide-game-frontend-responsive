import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { CraftingMsg, Ingredient, RarityResourceRecipe, RarityType, ResourceId, ResourceRecipe } from "../../gameTypes";
import { useState } from "react";
import ResourceTile from "../tiles/ResourceTile";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";
import { getLevel } from "../../gameUtils";
import { getOdds, preSelectIngredients } from "./craftingUtils";
import StartActionController from "../actions/StartActionController";
import websocketService from "../../../../service/websocketService";
import useGameDataState from "../../stateManagement/GameData/useGameData";
import IngredientsSelectors from "./IngredientsSelectors";


export default function CraftingQualityResourceRecipe({recipe}: {recipe: RarityResourceRecipe}) {
  const {resourceData} = useGameDataState((data) => data)
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(preSelectIngredients(recipe));
  console.log(selectedIngredients)
  const character = useCharacterState((char) => char)
  const professionLevel = getLevel(character.professions[recipe.profession].exp)

  const [limit, setLimit] = useState<boolean>(false)
  const [iterations, setIterations] = useState<number>(1)

  function start(){
    const msg: CraftingMsg = {
      type: "crafting_rarityResource",
      limit: limit,
      iterations: iterations,
      args: {
        recipe: recipe.id,
        ingredients: selectedIngredients.filter((i) => i !== "empty") as ResourceId[]
      }
    }

    websocketService.send(msg)
  }

  function onChangeIngredients(slotIndex: number, value: Ingredient) {
    const newIngredients = [...selectedIngredients]
    newIngredients[slotIndex] = value
    setSelectedIngredients(newIngredients)
  }

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex"
        flexDirection='column'
        alignItems="center"
        gap={1}
        marginTop={'1rem'}
        padding='0.5rem 1rem 1rem 1rem'
        border={'1px solid'}
        borderColor='primary.main'
        borderRadius='5px'
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
          {Object.keys(recipe.resource_rarity).map((key) => (
            <Grid item key={key}>
                <Box display='flex' alignItems='center' flexDirection={'column'}>
                    <ResourceTile size={3} elevation={0} resourceId={recipe.resource_rarity[key as RarityType]!} count={recipe.amount}/>
                    <Typography fontSize='.66rem' color={'text.secondary'}>{getOdds(recipe, key as RarityType, 0).toFixed(2)}%</Typography>
                </Box>
            </Grid>
          ))}
        </Grid>

        {/* Ingredients */}
        <IngredientsSelectors recipe={recipe} selectedIngredients={selectedIngredients} onChange={onChangeIngredients}/>


          <StartActionController limit={limit} setLimit={setLimit} iterations={iterations} setIterations={setIterations} startDisabled={false} onClickStart={start}/>
      </Box>
    </Container>
  )
}