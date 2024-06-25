import { Typography, TypographyProps } from "@mui/material"
import { getLevel } from "../../gameUtils"
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData"
import { ProfessionId } from "../../gameTypes"

type Props = {
  professionId: ProfessionId,
  requiredLevel: number,

} & TypographyProps

export default function ProfessionLevelTypography({professionId, requiredLevel, ...typographyProps }: Props) {
  const professionExp = useCharacterState((char) => char.professions[professionId].exp)
  const level = getLevel(professionExp)
  return (
    <Typography 
      color={level < requiredLevel ? 'error' : 'success'} 
      textTransform={'capitalize'}
      {...typographyProps}
      >
        {professionId} Lv. {requiredLevel}
    </Typography>
  )
}