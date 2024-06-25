import React from 'react'
import useCharacterState from '../../../stateManagement/CharacterData/useCharacterData'
import { Box, Grid, Typography } from '@mui/material'
import { EquipmentSlot, ProfessionId, equipmentSlots, professionIds } from '../../../gameTypes'
import { Key } from '@mui/icons-material'
import EquipmentSlotItem from './EquipmentSlotItem'

export default function EquipmentSection() {
  return (
    <div style={{ padding: "1rem" }}>
      {professionIds.map((profession) => (
        <Box key={profession}>
          <Typography variant="h6" mb={1}>{profession}</Typography>
          <Grid container spacing={1}>
            {equipmentSlots.map((slot) => (
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