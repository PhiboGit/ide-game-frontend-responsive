import { Chip, styled } from "@mui/material";
import { RarityType } from "../../gameTypes";

type CustomChipProps = {
  scale?: number
  rarity?: RarityType
}

export const CustomChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "scale" && prop !== "rarity",
})<CustomChipProps>(({ theme, rarity='none', scale = 1 }) => ({
  height: `${scale * 32}px`,
  borderRadius: `${scale * 16}px`,
  '& .MuiChip-label': {
    paddingRight: `${scale * 12}px`,
    paddingLeft: `${scale * 12}px`,
    fontSize: `${scale * 1.25}rem`,
  },
  '& .MuiChip-icon': {
    width: `${scale * 24}px`,
    height: `${scale * 24}px`,
    fontSize: `${scale * 0.75}rem`,
  },
  '& .MuiChip-deleteIcon': {
    width: `${scale * 24}px`,
    height: `${scale * 24}px`,
    fontSize: `${scale * 0.75}rem`,
  },
  borderColor: theme.palette[`${rarity}Rarity`].main,
  color: theme.palette[`${rarity}Rarity`].main,

}));