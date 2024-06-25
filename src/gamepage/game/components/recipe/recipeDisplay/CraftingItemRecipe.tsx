import { Box, Container, Grid, Typography } from "@mui/material";
import { CraftingMsg, Ingredient, ItemRecipe, ResourceId } from "../../../gameTypes";
import { useState } from "react";
import useCharacterState from "../../../stateManagement/CharacterData/useCharacterData";
import { getLevel } from "../../../gameUtils";
import { preSelectIngredients } from "./craftingUtils";
import StartActionController from "../../actions/StartActionController";
import websocketService from "../../../../../service/websocketService";
import useGameDataState from "../../../stateManagement/GameData/useGameData";
import IngredientSelector from "./ingredientSelector/IngredientSelector";
import ProfessionLevelTypography from "../../common/ProfessionLevelTypography";


export default function CraftingItemRecipe({recipe}: {recipe: ItemRecipe}) {
  const {resourceData} = useGameDataState((data) => data)
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(preSelectIngredients(recipe));
  function onChangeIngredients(slotIndex: number, value: Ingredient) {
    const newIngredients = [...selectedIngredients]
    newIngredients[slotIndex] = value
    setSelectedIngredients(newIngredients)
  }
  const character = useCharacterState((char) => char)
  const professionLevel = getLevel(character.professions[recipe.profession].exp)

  const gearScoreBonus = selectedIngredients.reduce((acc, ing) => acc + (resourceData[ing as ResourceId]?.craftingBonus ?? 0), 0)

  const [limit, setLimit] = useState<boolean>(false)
  const [iterations, setIterations] = useState<number>(1)

  function start(){
    const msg: CraftingMsg = {
      type: "crafting_item",
      limit: limit,
      iterations: iterations,
      args: {
        recipe: recipe.id,
        ingredients: selectedIngredients.filter((i) => i !== "empty") as ResourceId[]
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
          <ProfessionLevelTypography fontSize={'.66rem'} professionId={recipe.profession} requiredLevel={recipe.level}/>
          <Typography fontSize='.66rem' color={'text.secondary'}>{recipe.time}ms</Typography>
          <Typography fontSize='.66rem' color={'text.secondary'}>Exp. {recipe.exp}</Typography>
          <Typography fontSize='.66rem' color={'text.secondary'}>Char. Exp. {recipe.expChar}</Typography>          
        </Box>
        {/* Output */}
        <Typography variant="body1">
          GearScore: [{Math.floor(professionLevel * 0.1) + recipe.baseGearScore + gearScoreBonus},{Math.floor(professionLevel * 0.1) + recipe.baseGearScore + gearScoreBonus + 100}]
          <br/>
          #Bonus: gearScore breakpoints: 100, 250, 450, 700
          <br/>
          rarity: breakpoints: 0 = common, 60 = uncommon, 120 = rare, 180 = epic, 240 = legendary
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
          gap={1}
        >
          
        </Grid>

        {/* Ingredients */}
        <Grid 
          container
          justifyContent={"center"}
          spacing={1}
        >
          {recipe.ingredients.map((ingredientSlot, slotIndex) => (
            <Grid item key={slotIndex}>
              <IngredientSelector
                recipeIngredient={ingredientSlot}
                selectedIngredient={selectedIngredients[slotIndex]}
                onSelect={(value) => onChangeIngredients(slotIndex, value)}
              />
          </Grid>
          ))}
        </Grid>

        <StartActionController limit={limit} setLimit={setLimit} iterations={iterations} setIterations={setIterations} startDisabled={false} onClickStart={start}/>
      </Box>
    </Container>
  )
}