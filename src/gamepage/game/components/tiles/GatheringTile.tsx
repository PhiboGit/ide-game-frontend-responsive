import React from "react";

import BaseTile from "./BaseTile";
import { Typography } from "@mui/material";

interface GatheringTileProps {
  size?: number
  gatheringNode: GatheringNode
  onClick?: () => void
  selected?: boolean
}

export default function GatheringTile({size = 8, gatheringNode:node, onClick, selected}: GatheringTileProps) {



  const handleClick = () => {
    onClick && onClick();
  }

  return (
    <BaseTile 
      size={size}
      iconSizePercent={65}
      onClick={handleClick}
      selected={selected}
      tooltipComponent={<Typography>{node.id}</Typography>}
    >
      <Typography variant="body2" textAlign='center' sx={{ position: 'absolute', bottom: 0, right: 0, width: '100%', padding: '0.05rem 0.2rem'}}>
          {node.profession}
        </Typography>
        <Typography variant="body2" textAlign='center' sx={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '0.05rem 0.2rem'}}>
          {node.id}
        </Typography>
    </BaseTile>
);
}