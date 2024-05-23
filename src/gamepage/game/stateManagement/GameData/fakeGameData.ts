
interface ResourceInfo  {
  id: ResourceId
  displayName: string
  rarity: Rarity
}

type ResourceData = {
  [key in ResourceId]: ResourceInfo;
};
const fakeResourceDataObject: ResourceData  = {
  'woodT2': { id: 'woodT2', displayName: 'Oak Wood', rarity: 'none' },
  'woodT1': { id: 'woodT1', displayName: 'Birch Wood', rarity: 'none' },
  'woodT3': { id: 'woodT3', displayName: 'Elderwood', rarity: 'none' },
  'woodT4': { id: 'woodT4', displayName: 'Giant Wood', rarity: 'none' },
  'woodT5': { id: 'woodT4', displayName: 'Willow Wood', rarity: 'none' },

  'oreT1': { id: 'oreT1', displayName: 'Copper Ore', rarity: 'none' },
  'oreT2': { id: 'oreT2', displayName: 'Iron Ore', rarity: 'none' },
  'oreT3': { id: 'oreT3', displayName: 'Gold Ore', rarity: 'rare' },
  'oreT4': { id: 'oreT4', displayName: 'Mithril Ore', rarity: 'none' },
  'oreT5': { id: 'oreT4', displayName: 'Platinum Ore', rarity: 'none' },

  'fiberT1': { id: 'fiberT1', displayName: 'Hemp Fiber', rarity: 'none' },
  'fiberT2': { id: 'fiberT2', displayName: 'Cotton Fiber', rarity: 'none' },
  'fiberT3': { id: 'fiberT3', displayName: 'Flower Fiber', rarity: 'none' },
  'fiberT4': { id: 'fiberT4', displayName: 'Bamboo Fiber', rarity: 'none' },
  'fiberT5': { id: 'fiberT4', displayName: 'Flax Fiber', rarity: 'none' },
};

interface GatheringNodeInfo  {
  id: GatheringNodeId
  displayName: string
  description: string
  profession: Profession
  tier: number

  level: number
  time: number
  exp: number

  resource: ResourceId
  minAmount: number
  maxAmount: number

  lootTable?: string // TODO: placeholder

}

type GatheringNodeData = {
  [key in GatheringNodeId]: GatheringNodeInfo;
};
const fakeGatheringNodeDataObject: GatheringNodeData  = {
  'TreeT1': { id: 'TreeT1', displayName: 'Oak Tree', description: '', profession: 'Woodcutting', tier: 1, level: 0, time: 10000, exp: 10, resource: 'woodT1', minAmount: 1, maxAmount: 5 },
  'TreeT2': { id: 'TreeT2', displayName: 'Birch Tree', description: '', profession: 'Woodcutting', tier: 2, level: 0, time: 10000, exp: 10, resource: 'woodT2', minAmount: 1, maxAmount: 5 },
  'TreeT3': { id: 'TreeT3', displayName: 'Elder Tree', description: '', profession: 'Woodcutting', tier: 3, level: 0, time: 10000, exp: 10, resource: 'woodT3', minAmount: 1, maxAmount: 5 },
  'TreeT4': { id: 'TreeT4', displayName: 'Giant Tree', description: '', profession: 'Woodcutting', tier: 4, level: 0, time: 10000, exp: 10, resource: 'woodT4', minAmount: 1, maxAmount: 5 },
  'TreeT5': { id: 'TreeT5', displayName: 'Willow Tree', description: '', profession: 'Woodcutting', tier: 5, level: 0, time: 10000, exp: 10, resource: 'woodT5', minAmount: 1, maxAmount: 5 },

  'VeinT1': { id: 'VeinT1', displayName: 'Copper Vein', description: '', profession: 'Mining', tier: 1, level: 0, time: 10000, exp: 10, resource: 'oreT1', minAmount: 1, maxAmount: 5 },
  'VeinT2': { id: 'VeinT2', displayName: 'Iron Vein', description: '', profession: 'Mining', tier: 2, level: 0, time: 10000, exp: 10, resource: 'oreT2', minAmount: 1, maxAmount: 5 },
  'VeinT3': { id: 'VeinT3', displayName: 'Gold Vein', description: '', profession: 'Mining', tier: 3, level: 0, time: 10000, exp: 10, resource: 'oreT3', minAmount: 1, maxAmount: 5 },
  'VeinT4': { id: 'VeinT4', displayName: 'Mithril Vein', description: '', profession: 'Mining', tier: 4, level: 0, time: 10000, exp: 10, resource: 'oreT4', minAmount: 1, maxAmount: 5 },
  'VeinT5': { id: 'VeinT5', displayName: 'Platinum Vein', description: '', profession: 'Mining', tier: 5, level: 0, time: 10000, exp: 10, resource: 'oreT5', minAmount: 1, maxAmount: 5 },

  'PlantT1': { id: 'PlantT1', displayName: 'Hemp', description: '', profession: 'Harvesting', tier: 1, level: 0, time: 10000, exp: 10, resource: 'fiberT1', minAmount: 1, maxAmount: 5  },
  'PlantT2': { id: 'PlantT2', displayName: 'Cotton', description: '', profession: 'Harvesting', tier: 2, level: 0, time: 10000, exp: 10, resource: 'fiberT2', minAmount: 1, maxAmount: 5  },
  'PlantT3': { id: 'PlantT3', displayName: 'Flower', description: '', profession: 'Harvesting', tier: 3, level: 0, time: 10000, exp: 10, resource: 'fiberT3', minAmount: 1, maxAmount: 5  },
  'PlantT4': { id: 'PlantT4', displayName: 'Bamboo', description: '', profession: 'Harvesting', tier: 4, level: 0, time: 10000, exp: 10, resource: 'fiberT4', minAmount: 1, maxAmount: 5  },
  'PlantT5': { id: 'PlantT5', displayName: 'Flax', description: '', profession: 'Harvesting', tier: 5, level: 0, time: 10000, exp: 10, resource: 'fiberT5', minAmount: 1, maxAmount: 5  },
};


export const fakeGameData = {
  resourceData: fakeResourceDataObject,
  gatheringNodeData: fakeGatheringNodeDataObject
}