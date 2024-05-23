
interface ResourceInfo  {
  id: ResourceIdString
  displayName: string
  rarity: Rarity
}

type ResourceData = {
  [key in ResourceIdString]: ResourceInfo;
};
const fakeResourceDataObject: ResourceData  = {
  'woodT2': { id: 'woodT2', displayName: 'Oak Wood', rarity: 'none' },
  'woodT1': { id: 'woodT1', displayName: 'Birch Wood', rarity: 'none' },
  'woodT3': { id: 'woodT3', displayName: 'Elderwood', rarity: 'none' },
  'woodT4': { id: 'woodT4', displayName: 'Willow Wood', rarity: 'none' },
  'woodT5': { id: 'woodT4', displayName: 'Willow Wood', rarity: 'none' },

  'oreT1': { id: 'oreT1', displayName: 'Copper Ore', rarity: 'none' },
  'oreT2': { id: 'oreT2', displayName: 'Iron Ore', rarity: 'none' },
  'oreT3': { id: 'oreT3', displayName: 'Gold Ore', rarity: 'rare' },
  'oreT4': { id: 'oreT4', displayName: 'Mithril Ore', rarity: 'none' },
  'oreT5': { id: 'oreT4', displayName: 'Platinum Ore', rarity: 'none' },

  'plantT1': { id: 'plantT1', displayName: 'Hemp', rarity: 'none' },
  'plantT2': { id: 'plantT2', displayName: 'Cotton', rarity: 'none' },
  'plantT3': { id: 'plantT3', displayName: 'Flower', rarity: 'none' },
  'plantT4': { id: 'plantT4', displayName: 'Bamboo', rarity: 'none' },
  'plantT5': { id: 'plantT4', displayName: 'Flax', rarity: 'none' },
};


export const fakeGameData = {
  resourceData: fakeResourceDataObject
}