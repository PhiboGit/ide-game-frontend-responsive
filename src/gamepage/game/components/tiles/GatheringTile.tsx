import React from "react";

import BaseTile from "./BaseTile";
import { Typography } from "@mui/material";

interface GatheringTileProps {
  size?: number
  profession: string
  tier: number
  onClick?: () => void
  selected?: boolean
}

export default function GatheringTile({size = 8, profession, tier, onClick, selected}: GatheringTileProps) {



  const handleClick = () => {
    onClick && onClick();
  }

  return (
    <BaseTile 
      size={size}
      onClick={handleClick}
      selected={selected}
      tooltipComponent={<Typography>{profession} T{tier}</Typography>}
    />
);
}