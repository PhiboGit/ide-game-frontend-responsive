import { useState } from "react";
import { ResourceId } from "../../../gameTypes";
import ResourceList from "./ResourceList";
import { Box, Divider } from "@mui/material";

export default function ResourceMarketplace(){
  const [selectedResource, setSelectedResource] = useState<ResourceId | null>(null);

  const handleSelect = (resourceId: ResourceId) => {
    setSelectedResource(resourceId)
  }

  return(
    <Box display="flex" flex={1} overflow= 'hidden'>
      
        <ResourceList onChange={handleSelect} />
        <Divider orientation="vertical"/>
      <Box>
        {selectedResource && <p>{selectedResource}</p>}
      </Box>
    </Box>
  )
}