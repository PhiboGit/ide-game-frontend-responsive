import { Chip, useTheme } from "@mui/material";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import useGameData from "../../stateManagement/GameData/useGameData";
import { ResourceId } from "../../gameTypes";


export default function ResourceChip({resourceId}: {resourceId: ResourceId}) {
  const theme = useTheme()
  const resource = useGameData((data) => data.resourceData[resourceId])

  return (
    <Chip 
      icon={<QuestionMarkIcon />} 
      size="small"
      label={resource.displayName} 
      variant="outlined" 
      sx={{
        borderColor: theme.palette[`${resource.rarity}Rarity`].main,
        color: theme.palette[`${resource.rarity}Rarity`].main,
      }}
    />
  )
}