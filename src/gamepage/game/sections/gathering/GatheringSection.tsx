import React from 'react'
import GatheringTile from '../../components/tiles/GatheringTile'
import { Grid, Typography } from '@mui/material'

const gatheringNodes: GatheringNode[] = [
  {id: "treeT1", profession: "Woodcutting", tier: 1},
  {id: "treeT2", profession: "Woodcutting", tier: 2},
  {id: "treeT3", profession: "Woodcutting", tier: 3},
  {id: "treeT4", profession: "Woodcutting", tier: 4},
  {id: "treeT5", profession: "Woodcutting", tier: 5},

  {id: "plantT1", profession: "Gathering", tier: 1},
  {id: "plantT2", profession: "Gathering", tier: 2},
  {id: "plantT3", profession: "Gathering", tier: 3},
  {id: "plantT4", profession: "Gathering", tier: 4},
  {id: "plantT5", profession: "Gathering", tier: 5},
 
  {id: "veinT1", profession: "Mining", tier: 1},
  {id: "veinT2", profession: "Mining", tier: 2},
  {id: "veinT3", profession: "Mining", tier: 3},
  {id: "veinT4", profession: "Mining", tier: 4},
  {id: "veinT5", profession: "Mining", tier: 5},
]

export default function GatheringSection() {
  const [selectedAction, setSelectedAction] = React.useState("");

  const professions = ["Woodcutting", "Gathering", "Mining"];

  const groupedNodes = professions.reduce((acc, profession) => {
    acc.set(profession, gatheringNodes.filter(node => node.profession === profession))
    return acc;
  }, new Map<string, GatheringNode[]>());
  

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {Array.from(groupedNodes.entries()).map(([profession, nodes]) => (
          <div key={profession}  >
            <Typography variant="h4">{profession}</Typography>
            <Grid container spacing={2}>
              {nodes.map(node => 
                <Grid item key={node.id} xs='auto'>
                  <GatheringTile 
                    size={6} 
                    gatheringNode={node}
                    onClick={() => setSelectedAction(node.id)}
                    selected={selectedAction === node.id}
                  />
                </Grid>
              )}
            </Grid>
          </div>
          ))}
      </div>
    </div>
  )
}