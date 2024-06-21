import React from "react";

import BaseTile from "./BaseTile";
import { Typography } from "@mui/material";
import ItemTooltip from "../tooltips/ItemTooltip";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";

interface ItemTileProps {
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
  itemId: string
  size? : number
  elevation?: number
}

export default function ItemTile({ onClick, itemId, size = 3.5, elevation = 1}: ItemTileProps) {
  const itemMap = useCharacterState((char) => char.itemMap)
  const item = itemMap[itemId]
  if (!item) {
    console.log(`Item ${itemId} not found`, item)
    return null
  }

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log(`Clicked Item!: ${itemId}`);
    onClick && onClick(event);
  }

  return (
    <BaseTile 
      size={size}
      elevation={elevation}
      iconSizePercent={45}
      onClick={handleClick}
      tooltipComponent={<ItemTooltip itemId={itemId}/>}
      rarityBorderColor={item.rarity}
    >
      <Typography 
        lineHeight={.95}
        fontSize={'.75rem'}
        variant="body2"
        textAlign='end' 
        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '1.5px 3.5px', textShadow: '1px 1px 1px black'}}
      >
        {item.enchantingLevel ? `+${item.enchantingLevel}` : ''}
      </Typography>
      <Typography 
        lineHeight={.95}
        fontSize={'.75rem'}
        variant="body2"
        textAlign='start' 
        sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5px 3.5px', textShadow: '1px 1px 1px black'}}
      >
        GS: {item.craftedGearScore}
      </Typography>
    </BaseTile>
  );
}