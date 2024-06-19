import { Chip, styled, useTheme } from "@mui/material";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import useGameData from "../../stateManagement/GameData/useGameData";
import { ResourceId } from "../../gameTypes";
import { CustomChip } from "../common/CustomChip";
import HtmlTooltip from "../common/HtmlTooltip";
import ResourceTooltip from "../tooltips/ResourceTooltip";


export default function ResourceChip({resourceId}: {resourceId: ResourceId}) {
  const resource = useGameData((data) => data.resourceData[resourceId])

  return (
    <HtmlTooltip
      placement="top"
      title={<ResourceTooltip resourceId={resourceId}/>}
    >
      <CustomChip
        icon={<QuestionMarkIcon />} 
        label={resource.displayName} 
        variant="outlined"
        rarity={resource.rarity}
        scale={.666} 
      />
    </HtmlTooltip>
  )
}