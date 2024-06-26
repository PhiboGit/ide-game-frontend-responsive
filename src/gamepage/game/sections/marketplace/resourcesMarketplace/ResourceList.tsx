import { useState } from "react";
import { ResourceId } from "../../../gameTypes";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import useGameDataState from "../../../stateManagement/GameData/useGameData";
import ResourceTile from "../../../components/tiles/ResourceTile";


export default function ResourceList({ onChange }: { onChange: (resourceId: ResourceId) => void }) {
  const { resourceData } = useGameDataState((data) => data);
  const [selected, setSelected] = useState<ResourceId | null>(null);

  function handleSelect(resourceId: ResourceId) {
    setSelected(resourceId);
    onChange(resourceId);
  }
  return (
    <List dense sx={{ overflow: 'auto' }}>
      {Object.values(resourceData).map((resource) => (
        <ListItemButton selected={resource.id === selected} key={resource.id} onClick={() => handleSelect(resource.id)}>
          <ListItemIcon>
            <ResourceTile resourceId={resource.id} elevation={0} size={1.75}/>
          </ListItemIcon>
          <ListItemText
            primary={resource.displayName}
          />
        </ListItemButton>
      ))}
    </List>
  )
}