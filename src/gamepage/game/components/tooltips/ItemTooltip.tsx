import { Box, Typography } from "@mui/material";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";

export default function ItemTooltip({itemId}: {itemId: string}) {
    const itemMap = useCharacterState((char) => char.itemMap)
    const item = itemMap[itemId]

  return (
    <Box display='flex' flexDirection='column' >
      <Typography variant="h6" >{item.displayName}</Typography>
      <Typography fontSize='.8rem' color='text.secondary'>{item.description}</Typography>
      <Box display='flex' gap={.5} >
        <Typography fontSize='.66rem' >T{item.tier}</Typography>
        <Typography fontSize='.66rem' >{item.rarity !== "none" ? item.rarity : ""}</Typography>
      </Box>
      
    </Box>
  )
}