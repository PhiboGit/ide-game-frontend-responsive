import { Box, Typography } from "@mui/material"
import { ProfessionId } from "../../gameTypes"
import { getLevelProgress, getLevel } from "../../gameUtils"
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData"
import LevelProgressBar from "../stats/LevelProgressBar"

export default function ProfessionTitle({profession}: {profession: ProfessionId}) {
  const professionExp = useCharacterState((char) => char.professions[profession].exp)
  const {progress, levelUpInExp} = getLevelProgress(professionExp)
  const level = getLevel(professionExp)
  return (
    <Box width='200px' display='flex' flexDirection={'column'} alignSelf={'center'} alignItems='center'>
      <Typography variant="h5" noWrap textTransform={'capitalize'}>{profession} Lv. {level}</Typography>
      <LevelProgressBar progress={progress} levelUpInExp={levelUpInExp} />
    </Box>
  )
}