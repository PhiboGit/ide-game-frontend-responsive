import { Typography } from "@mui/material";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";

export default function ItemTooltip({itemId}: {itemId: string}) {
    const itemMap = useCharacterState((char) => char.itemMap)
    const item = itemMap[itemId]

  return (
    <div>
      <Typography variant="h6">{item.displayName}</Typography>

      <Typography variant="body2">{JSON.stringify(item)}</Typography>
    </div>
  )
}