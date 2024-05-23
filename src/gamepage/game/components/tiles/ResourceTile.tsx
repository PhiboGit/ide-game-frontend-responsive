import React from "react";

import BaseTile from "./BaseTile";
import { Typography } from "@mui/material";
import useGameData from "../../stateManagement/GameData/useGameData";

interface ResourceTileProps {
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
  resourceId: ResourceIdString
  count: number
}

export default function ResourceTile({ onClick, resourceId, count = 0}: ResourceTileProps) {
  const resource = useGameData((data) => data.resourceData[resourceId])
  if (!resource) {
    console.log(`Resource ${resourceId} not found`, resource)
    return null
  }

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log(`Clicked resource!: ${resourceId}`);
    onClick && onClick(event);
  }

  return (
    <BaseTile 
      size={3.5}
      iconSizePercent={45}
      onClick={handleClick}
      tooltipComponent={<Typography>{resource.displayName}</Typography>}
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