import React from 'react'
import useCharacterState from '../../../stateManagement/CharacterData/useCharacterData'
import { Box, Grid, Typography } from '@mui/material'
import { EquipmentSlot, ProfessionId } from '../../../gameTypes'
import { Key } from '@mui/icons-material'
import EquipmentSlotItem from './EquipmentSlotItem'

export default function EquipmentSection() {
  const character = useCharacterState((char) => char)
  return (
    <div style={{ padding: "1rem" }}>
      {Object.keys(character.professions).map((profession) => (
        <Box key={profession}>
          <Typography variant="h6" mb={1}>{profession}</Typography>
          <Grid container spacing={1}>
            {Object.keys(character.professions[profession as ProfessionId].equipment).map((slot) => (
              <Grid item key={slot}>
                <EquipmentSlotItem profession={profession as ProfessionId} equipmentSlot={slot as EquipmentSlot} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </div>
  )
}