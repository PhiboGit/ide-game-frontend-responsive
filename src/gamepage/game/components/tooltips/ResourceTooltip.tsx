import { Typography } from "@mui/material";
import React from "react";
import useGameData from "../../stateManagement/GameData/useGameData";

export default function ResourceTooltip({resourceId}: {resourceId: ResourceId}) {
    const resource = useGameData((data) => data.resourceData[resourceId])

  return (
    <div>
      <Typography variant="h6">{resource.displayName}</Typography>

      <Typography variant="body2">{JSON.stringify(resource)}</Typography>
    </div>
  )
}