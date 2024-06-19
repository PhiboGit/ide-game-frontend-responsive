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
      <Box display='flex' gap={.5} >
        <Typography fontSize='.66rem' textTransform={'capitalize'}>{item.equipmentProfessions} Lv. {item.level}</Typography>
        <Typography fontSize='.66rem' textTransform={'capitalize'}>{item.equipmentSlot}</Typography>
      </Box>
      <Typography fontSize='.66rem' >Enchantment: {item.enchantingLevel}</Typography>
      <Typography fontSize='.66rem' >GearScore: {item.craftedGearScore}</Typography>
      {item.baseStats.speed !== 0 && <Typography fontSize='.66rem' >Speed: {item.baseStats.speed}</Typography>}
      {item.baseStats.armor !== 0 && <Typography fontSize='.66rem' >Armor: {item.baseStats.armor}</Typography>}
      {item.baseStats.attack !== 0 && <Typography fontSize='.66rem' >Attack: {item.baseStats.attack}</Typography>}
      {item.baseStats.attackSpeed !== 0 && <Typography fontSize='.66rem' >Attack Speed: {item.baseStats.attackSpeed}</Typography>}

      {item.bonusTypes.con !== 0 && <Typography fontSize='.66rem' >Con: {item.bonusTypes.con}</Typography>}
      {item.bonusTypes.str !== 0 && <Typography fontSize='.66rem' >Str: {item.bonusTypes.str}</Typography>}
      {item.bonusTypes.int !== 0 && <Typography fontSize='.66rem' >Int: {item.bonusTypes.int}</Typography>}
      {item.bonusTypes.dex !== 0 && <Typography fontSize='.66rem' >Dex: {item.bonusTypes.dex}</Typography>}
      {item.bonusTypes.foc !== 0 && <Typography fontSize='.66rem' >Foc: {item.bonusTypes.foc}</Typography>}

      {item.bonusTypes.exp_harvesting !== 0 && <Typography fontSize='.66rem' >Exp. Harvesting: {item.bonusTypes.exp_harvesting}</Typography>}
      {item.bonusTypes.exp_woodcutting !== 0 && <Typography fontSize='.66rem' >Exp. Woodcutting: {item.bonusTypes.exp_woodcutting}</Typography>}
      {item.bonusTypes.exp_mining !== 0 && <Typography fontSize='.66rem' >Exp. Mining: {item.bonusTypes.exp_mining}</Typography>}

      {item.bonusTypes.luck_harvesting !== 0 && <Typography fontSize='.66rem' >Luck. Harvesting: {item.bonusTypes.luck_harvesting}</Typography>}
      {item.bonusTypes.luck_woodcutting !== 0 && <Typography fontSize='.66rem' >Luck. Woodcutting: {item.bonusTypes.luck_woodcutting}</Typography>}
      {item.bonusTypes.luck_mining !== 0 && <Typography fontSize='.66rem' >Luck. Mining: {item.bonusTypes.luck_mining}</Typography>}

      {item.bonusTypes.speed_harvesting !== 0 && <Typography fontSize='.66rem' >Speed. Harvesting: {item.bonusTypes.speed_harvesting}</Typography>}
      {item.bonusTypes.speed_woodcutting !== 0 && <Typography fontSize='.66rem' >Speed. Woodcutting: {item.bonusTypes.speed_woodcutting}</Typography>}
      {item.bonusTypes.speed_mining !== 0 && <Typography fontSize='.66rem' >Speed. Mining: {item.bonusTypes.speed_mining}</Typography>}

      {item.bonusTypes.yieldMin_harvesting !== 0 && <Typography fontSize='.66rem' >Yield Min. Harvesting: {item.bonusTypes.yieldMin_harvesting}</Typography>}
      {item.bonusTypes.yieldMin_woodcutting !== 0 && <Typography fontSize='.66rem' >Yield Min. Woodcutting: {item.bonusTypes.yieldMin_woodcutting}</Typography>}
      {item.bonusTypes.yieldMin_mining !== 0 && <Typography fontSize='.66rem' >Yield Min. Mining: {item.bonusTypes.yieldMin_mining}</Typography>}

      {item.bonusTypes.yieldMax_harvesting !== 0 && <Typography fontSize='.66rem' >Yield Max. Harvesting: {item.bonusTypes.yieldMax_harvesting}</Typography>}
      {item.bonusTypes.yieldMax_woodcutting !== 0 && <Typography fontSize='.66rem' >Yield Max. Woodcutting: {item.bonusTypes.yieldMax_woodcutting}</Typography>}
      {item.bonusTypes.yieldMax_mining !== 0 && <Typography fontSize='.66rem' >Yield Max. Mining: {item.bonusTypes.yieldMax_mining}</Typography>}
    </Box>
  )
}