import React from "react";

import BaseTile from "./BaseTile";
import { Typography } from "@mui/material";

interface ResourceInfo  {
  id: string
  displayName: string
  rarity: Rarity
}

const defaultResource : ResourceInfo = { id: 'default', displayName: 'Default', rarity: 'none' };

const fakeDataEntries: [string, ResourceInfo][] = [
  ['woodT1', { id: 'woodT1', displayName: 'Birch Wood', rarity: 'common' }],
  ['woodT2', { id: 'woodT2', displayName: 'Oak Wood', rarity: 'uncommon' }],
  ['woodT3', { id: 'woodT3', displayName: 'Elderwood', rarity: 'rare' }],
  ['woodT4', { id: 'woodT4', displayName: 'Willow Wood', rarity: 'legendary' }],
  ['woodT5', { id: 'woodT4', displayName: 'Willow Wood', rarity: 'none' }],
];

const fakeDataMap: Map<string, ResourceInfo> = new Map(fakeDataEntries);


interface ResourceTileProps {
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
  resourceId: string
  count: number
}

export default function ResourceTile({ onClick, resourceId, count = 0}: ResourceTileProps) {


  const resource = fakeDataMap.has(resourceId) ? 
    fakeDataMap.get(resourceId)! 
    : defaultResource

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log(`Clicked resource!: ${resourceId}`);
    onClick && onClick(event);
  }

  return (
    <BaseTile 
      size={3.5}
      iconSizePercent={45}
      onClick={handleClick}
      tooltipComponent={<Typography>{resourceId}</Typography>}
      rarityBorderColor={resource.rarity}
    >
      <Typography 
        lineHeight={.95}
        fontSize={'.75rem'}
        variant="body2"
        textAlign='end' 
        sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5px 3.5px', textShadow: '1px 1px 1px black'}}
      >
        {count ? count : ''}
      </Typography>
    </BaseTile>
  );
}