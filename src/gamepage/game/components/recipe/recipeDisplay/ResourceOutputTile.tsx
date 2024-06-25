import { Typography } from "@mui/material";
import { ResourceId } from "../../../gameTypes";
import ResourceTile from "../../tiles/ResourceTile";

type ResourceOutputTileProps = {
  resourceId: ResourceId
  amount: number
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void  
}
export default function ResourceOutputTile({ resourceId, amount, onClick}: ResourceOutputTileProps) {

  return (
    <ResourceTile 
      elevation={0}
      
      resourceId={resourceId} 
      onClick={onClick}
      size={3.5}
    >
      <Typography 
        lineHeight={.95}
        fontSize={'.75rem'}
        variant="body2"
        textAlign='end' 
        sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5px 3.5px', textShadow: '1px 1px 1px black'}}
      >
        {amount}
      </Typography>
    </ResourceTile>
  )
}