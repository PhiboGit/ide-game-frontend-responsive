import React from "react";

import BaseTile from "./BaseTile";
import { Typography } from "@mui/material";
import useGameData from "../../stateManagement/GameData/useGameData";
import GatheringNodeTooltip from "../tooltips/GatheringNodeTooltip";

interface GatheringTileProps {
  size?: number
  nodeId: string
  onClick?: (event : React.MouseEvent<HTMLInputElement>) => void
  selected?: boolean
}

export default function GatheringTile({size = 8, nodeId, onClick, selected}: GatheringTileProps) {

  const node = useGameData((data) => data.gatheringNodeData[nodeId])


  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log(`Clicked node!: ${nodeId}`);
    onClick && onClick(event);
  }

  return (
    <BaseTile 
      size={size}
      iconSizePercent={65}
      onClick={handleClick}
      selected={selected}
      tooltipComponent={<GatheringNodeTooltip nodeId={nodeId}/>}
    >
      <Typography variant="body2" textAlign='center' sx={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '0.05rem 0.2rem'}}>
        {node.displayName}
      </Typography>
      <Typography variant="body2" textAlign='center' sx={{ position: 'absolute', bottom: 0, right: 0, width: '100%', padding: '0.05rem 0.2rem'}}>
        {node.profession}
      </Typography>
    </BaseTile>
);
}