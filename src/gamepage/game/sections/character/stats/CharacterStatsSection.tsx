import { Box, Button, Grid, Typography } from '@mui/material'
import { ProfessionId, ProfessionStats, RequestProfessionStatsMsg, professionIds } from '../../../gameTypes'
import ProfessionTitle from '../../../components/common/ProfessionTitle'
import websocketService from '../../../../../service/websocketService'
import { useEffect, useState } from 'react'
import messageManager from '../../../../messages/messageManager'

export default function CharacterStatsSection() {

  const [profession, setProfession] = useState<ProfessionId>(professionIds[0])

  function requestStats(profession: ProfessionId) {
    setProfession(profession)
    const msg: RequestProfessionStatsMsg = {
      type: "request_professionStats",
      profession: profession
    }

    websocketService.send(msg)
  }
  

  return (
    <div style={{ padding: "1rem", display: "flex", flexDirection: "column" }}>
      <Grid container spacing={1}>
        {professionIds.map((profession) => (
          <Grid item key={profession}>
            <Button size='small' variant='contained' color='primary' onClick={() => requestStats(profession)}>{profession}</Button>
          </Grid>
        ))}
      </Grid>  

      <DisplayStats profession={profession} />
    </div>
  )
}

function DisplayStats({profession}: {profession: ProfessionId}) {

  const [stats, setStats] = useState<ProfessionStats>({profession: profession, stats: {level: 0, luck: 0, expBonus: 0, speed: 0, yieldMax: 0, yieldMin: 0}})

  useEffect(() => {
    const unsubscribe = messageManager.subscribeProfessionStats((data) => {
      setStats(data)
    })
    return () => {
      unsubscribe();
    };
  }, []);



  return (
    <Box mt={2}>
      <ProfessionTitle profession={profession} />
        <pre>
          {JSON.stringify(stats.stats, null, 2)}
        </pre>
    </Box>
  )
}