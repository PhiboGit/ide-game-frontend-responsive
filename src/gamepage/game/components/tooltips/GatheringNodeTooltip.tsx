import { Typography } from "@mui/material";
import React from "react";
import useGameData from "../../stateManagement/GameData/useGameData";

export default function GatheringNodeTooltip({nodeId}: {nodeId: string}) {
    const node = useGameData((data) => data.gatheringNodeData[nodeId])

  return (
    <div>
      <Typography variant="h6">{node.displayName}</Typography>

      <Typography variant="body2">{JSON.stringify(node)}</Typography>
    </div>
  )
}