import { Typography } from "@mui/material";
import { ResourceId } from "../../../../gameTypes";
import useCharacterState from "../../../../stateManagement/CharacterData/useCharacterData";
import ResourceTile from "../../../tiles/ResourceTile";

type ResourceIngredientTileProps = {
  resourceId: ResourceId
  amount: number
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
  size?: number
  
}
export default function ResourceIngredientTile({ resourceId, amount, size = 2.5, onClick}: ResourceIngredientTileProps) {
  const units = useCharacterState((char) => char.resources[resourceId])

  return (
    <ResourceTile 
      resourceId={resourceId} 
      onClick={onClick}
      size={size}
    >
      <Typography 
        lineHeight={.95}
        fontSize={'.75rem'}
        variant="body2"
        textAlign='end' 
        sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5px 3.5px', textShadow: '1px 1px 1px black'}}
      >
        {units}
          / 
        {amount}
      </Typography>
    </ResourceTile>
  )
}