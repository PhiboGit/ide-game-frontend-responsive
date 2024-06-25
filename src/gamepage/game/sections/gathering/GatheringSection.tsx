import React, { useState } from 'react'
import GatheringTile from '../../components/tiles/GatheringNodeTile'
import { Box, Container, Grid, Typography } from '@mui/material'
import StartActionController from '../../components/actions/StartActionController';
import useGameDataState from '../../stateManagement/GameData/useGameData';
import { GatheringMsg, ProfessionId } from '../../gameTypes';
import websocketService from '../../../../service/websocketService';
import LevelProgressBar from '../../components/stats/LevelProgressBar';
import { getLevel, getLevelProgress } from '../../gameUtils';
import useCharacterState from '../../stateManagement/CharacterData/useCharacterData';
import { getProfessionNodes } from './gatheringUtils';
import ProfessionTitle from '../../components/common/ProfessionTitle';


export function WoodcuttingSection() {
  return (
    <GatheringSection profession='woodcutting' />
  )
}

export function MiningSection() {
  return (
    <GatheringSection profession='mining' />
  )
}

export function HarvestingSection() {
  return (
    <GatheringSection profession='harvesting' />
  )
}

function GatheringSection({profession }: {profession: ProfessionId}) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [limit, setLimit] = useState(false);
  const [iterations, setIterations] = useState(1);
  
  const nodes = getProfessionNodes(profession);

  const handleStartClick = () => {
    if (selectedAction === null) {
      console.log('no action selected')
      return
    }
    const msg: GatheringMsg = {
      type: 'gathering',
      limit,
      iterations,
      args: {
        node: selectedAction
      }
    }

    websocketService.send(msg);
  };  

  return (   
    
      <Box display="flex" flexDirection="column" gap="1rem" alignItems='center' padding='0.5rem 1rem 1rem 1rem'>
        <ProfessionTitle profession={profession}/>
        <Grid container spacing={2} justifyContent='center'>
          {nodes.map(nodeId => 
            <Grid item key={nodeId} xs='auto'>
              <GatheringTile 
                size={8} 
                nodeId={nodeId}
                onClick={() => setSelectedAction(nodeId)}
                selected={selectedAction === nodeId}
                />
            </Grid>
          )}
        </Grid>
        <StartActionController 
          limit={limit}
          setLimit={setLimit}
          iterations={iterations}
          setIterations={setIterations}
          startDisabled={selectedAction === null}
          onClickStart={handleStartClick}
          />     
      </Box>  
   
  )

}