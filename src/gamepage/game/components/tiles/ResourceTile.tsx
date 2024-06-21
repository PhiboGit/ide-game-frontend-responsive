import React from "react";

import BaseTile from "./BaseTile";
import { Typography } from "@mui/material";
import useGameData from "../../stateManagement/GameData/useGameData";
import ResourceTooltip from "../tooltips/ResourceTooltip";
import { ResourceId } from "../../gameTypes";

interface ResourceTileProps {
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
  resourceId: ResourceId
  size? : number
  elevation?: number
  children?: React.ReactNode
}

export default function ResourceTile({ onClick, resourceId, size = 3.5, elevation = 1, children}: ResourceTileProps) {
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
      size={size}
      elevation={elevation}
      iconSizePercent={45}
      onClick={handleClick}
      tooltipComponent={<ResourceTooltip resourceId={resourceId}/>}
      rarityBorderColor={resource.rarity}
    >
      {children}
    </BaseTile>
  );
}