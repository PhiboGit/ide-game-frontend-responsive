export const resourceIds = [
  "woodT1", "woodT2", "woodT3", "woodT4", "woodT5",
  "oreT1", "oreT2", "oreT3", "oreT4", "oreT5",
  "fiberT1", "fiberT2", "fiberT3", "fiberT4", "fiberT5",
  "coal",
  "ingotT1", "ingotT2", "ingotT3", "ingotT4", "ingotT5",
  "plankT1", "plankT2", "plankT3", "plankT4", "plankT5",
  "textileT1", "textileT2", "textileT3", "textileT4", "textileT5",
  "sapT1", "sapT2", "sapT3", "sapT4", "sapT5",
  "stickT1", "stickT2", "stickT3", "stickT4", "stickT5",
  "chunkT1", "chunkT2", "chunkT3", "chunkT4", "chunkT5",
  "strandT1", "strandT2", "strandT3", "strandT4", "strandT5",

  "shortHandleT1_common", "shortHandleT2_common", "shortHandleT3_common", "shortHandleT4_common", "shortHandleT5_common",
  "shortHandleT1_uncommon", "shortHandleT2_uncommon", "shortHandleT3_uncommon", "shortHandleT4_uncommon", "shortHandleT5_uncommon",
  "shortHandleT1_rare", "shortHandleT2_rare", "shortHandleT3_rare", "shortHandleT4_rare", "shortHandleT5_rare",
  "shortHandleT1_epic", "shortHandleT2_epic", "shortHandleT3_epic", "shortHandleT4_epic", "shortHandleT5_epic",
  "shortHandleT1_legendary", "shortHandleT2_legendary", "shortHandleT3_legendary", "shortHandleT4_legendary", "shortHandleT5_legendary",
  "longHandleT1_common", "longHandleT2_common", "longHandleT3_common", "longHandleT4_common", "longHandleT5_common",
  "longHandleT1_uncommon", "longHandleT2_uncommon", "longHandleT3_uncommon", "longHandleT4_uncommon", "longHandleT5_uncommon",
  "longHandleT1_rare", "longHandleT2_rare", "longHandleT3_rare", "longHandleT4_rare", "longHandleT5_rare",
  "longHandleT1_epic", "longHandleT2_epic", "longHandleT3_epic", "longHandleT4_epic", "longHandleT5_epic",
  "longHandleT1_legendary", "longHandleT2_legendary", "longHandleT3_legendary", "longHandleT4_legendary", "longHandleT5_legendary",
  "knopT1_common", "knopT2_common", "knopT3_common", "knopT4_common", "knopT5_common",
  "knopT1_uncommon", "knopT2_uncommon", "knopT3_uncommon", "knopT4_uncommon", "knopT5_uncommon",
  "knopT1_rare", "knopT2_rare", "knopT3_rare", "knopT4_rare", "knopT5_rare",
  "knopT1_epic", "knopT2_epic", "knopT3_epic", "knopT4_epic", "knopT5_epic",
  "knopT1_legendary", "knopT2_legendary", "knopT3_legendary", "knopT4_legendary", "knopT5_legendary",
  "smallBladeT1_common", "smallBladeT2_common", "smallBladeT3_common", "smallBladeT4_common", "smallBladeT5_common",
  "smallBladeT1_uncommon", "smallBladeT2_uncommon", "smallBladeT3_uncommon", "smallBladeT4_uncommon", "smallBladeT5_uncommon",
  "smallBladeT1_rare", "smallBladeT2_rare", "smallBladeT3_rare", "smallBladeT4_rare", "smallBladeT5_rare",
  "smallBladeT1_epic", "smallBladeT2_epic", "smallBladeT3_epic", "smallBladeT4_epic", "smallBladeT5_epic",
  "smallBladeT1_legendary", "smallBladeT2_legendary", "smallBladeT3_legendary", "smallBladeT4_legendary", "smallBladeT5_legendary",
  "metalHeadT1_common", "metalHeadT2_common", "metalHeadT3_common", "metalHeadT4_common", "metalHeadT5_common",
  "metalHeadT1_uncommon", "metalHeadT2_uncommon", "metalHeadT3_uncommon", "metalHeadT4_uncommon", "metalHeadT5_uncommon",
  "metalHeadT1_rare", "metalHeadT2_rare", "metalHeadT3_rare", "metalHeadT4_rare", "metalHeadT5_rare",
  "metalHeadT1_epic", "metalHeadT2_epic", "metalHeadT3_epic", "metalHeadT4_epic", "metalHeadT5_epic",
  "metalHeadT1_legendary", "metalHeadT2_legendary", "metalHeadT3_legendary", "metalHeadT4_legendary", "metalHeadT5_legendary",

  "con_charm", "int_charm", "str_charm", "dex_charm", "foc_charm",
  "speed_mining_charm", "exp_mining_charm", "luck_mining_charm", "yieldMin_mining_charm", "yieldMax_mining_charm",
  "speed_harvesting_charm", "exp_harvesting_charm", "luck_harvesting_charm", "yieldMin_harvesting_charm", "yieldMax_harvesting_charm",
  "speed_woodcutting_charm", "exp_woodcutting_charm", "luck_woodcutting_charm", "yieldMin_woodcutting_charm", "yieldMax_woodcutting_charm",
] as const

export type ResourceId = typeof resourceIds[number];
export type Resources = Record<ResourceId, number>;
export type Ingredient = ResourceId | "empty"

export const bonusTypes = [
  "con", "int", "str", "dex", "foc",
  "speed_mining", "exp_mining", "luck_mining", "yieldMin_mining", "yieldMax_mining",
  "speed_harvesting", "exp_harvesting", "luck_harvesting", "yieldMin_harvesting", "yieldMax_harvesting",
  "speed_woodcutting", "exp_woodcutting", "luck_woodcutting", "yieldMin_woodcutting", "yieldMax_woodcutting",
] as const
export type BonusType = typeof bonusTypes[number]

export const rarities = ["none", "common", "uncommon", "rare", "epic", "legendary"] as const
export type RarityType = typeof rarities[number]


export const professionIds = ["woodcutting", "mining", "harvesting", "weaving", "smelting", "woodworking", "smith", "engineer", "artificer"] as const
export type ProfessionId = typeof professionIds[number]
export const equipmentSlots = ["tool", "head", "chest", "legs", "feet", "hands"] as const
export type EquipmentSlot = typeof equipmentSlots[number]
export type Equipment = Record<EquipmentSlot, string | null>
export type Profession = {
  exp: number;
  equipment: Equipment;
}

export type Professions = Record<ProfessionId, Profession>;

export type Character = {
  id: string
  characterName: string
  expChar: number
  currency: Currency
  items: string[]
  activeAction: ActionObject | null
  actionQueue: ActionObject[]
  professions: Professions
  resources: Resources
  itemMap: Record<string, Item>
}

export type Currency = {
  gold: number
}
export type CurrencyId = keyof Currency

export type ActionObject = {
  counter: number
  actionTime: number
  actionMsg: ActionMsg
}

export type ActionMsg = GatheringMsg | CraftingMsg

export type Item = {
  _id: string;
  name: string;
  equipmentProfessions: ProfessionId[];
  equipmentSlot: EquipmentSlot;
  level: number;
  tier: number;
  rarity: RarityType;
  description: string;
  enchantingLevel: number;
  craftedGearScore: number;

  baseStats: {
    speed?: number;
    armor?: number;
    attack?: number;
    attackSpeed?: number;
  }

  bonusTypes: Partial<{[key in BonusType]: number}>
}


// JSON data
export type ExpTableData = {
  exp: Record<string, number>;
}

export type GatheringNode = {
  id: string,
  displayName: string,
  desciption: string,
  profession: ProfessionId,
  tier: number,
  level: number,
  time: number,
  exp: number,
  expChar: number,
  resource: ResourceId,
  minAmount: number,
  maxAmount: number,
}

export type GatheringNodeData = Record<string, GatheringNode>


export type Resource = {
  id: ResourceId,
  displayName: string,
  desciption: string,
  rarity: RarityType,
  tier: number,
  sellValue: number,

  bonusType?: BonusType,
  craftingBonus?: number,
  gearScoreBonus?: number,
}

export type ResourceData = Record<ResourceId, Resource>


export type ResourceRecipe = {
  id: string
  displayName: string
  description: string
  profession: ProfessionId
  resource: ResourceId
  amount: number
  level: number
  time: number
  exp: number
  expChar: number
  ingredients: {
    required: boolean
    slot: {
      resource: ResourceId
      amount: number
    }[]
  }[]
}
export type ResourceRecipeData = Record<string, ResourceRecipe>

export type RarityResourceRecipe = {
  id: string
  displayName: string
  description: string
  profession: ProfessionId
  resource_rarity: {
    none?: ResourceId
    common?: ResourceId
    uncommon?: ResourceId
    rare?: ResourceId
    epic?: ResourceId
    legendary?: ResourceId
  }
  maxRoll: number
  rarityRoll: { value: number, rarity: RarityType }[]
  amount: number
  level: number
  time: number
  exp: number
  expChar: number
  ingredients: {
    required: boolean
    slot: {
      resource: ResourceId
      amount: number
    }[]
  }[]
}
export type RarityResourceRecipeData = Record<string, RarityResourceRecipe>

export type ItemRecipe = {
  id: string
  displayName: string
  description: string
  profession: ProfessionId
  level: number
  time: number
  exp: number
  expChar: number

  equipmentSlot: EquipmentSlot
  equipmentProfessions: ProfessionId[]
  tier: number
  equipLevel: number

  baseGearScore: number
  baseStats: {
    speed?: number
    armor?: number
    attack?: number
    attackSpeed?: number
  }
  availableBoni: {
    weight: number
    bonusType: BonusType
  }[]
  ingredients: {
    required: boolean
    slot: {
      resource: ResourceId
      amount: number
    }[]
  }[]
}
export type ItemRecipeData = {[x: string]: ItemRecipe}


// messages types incoming

export type InitGameMessage = {
  type: 'init_game',
  gatheringNodeData: GatheringNodeData,
  resourceData: ResourceData,
  resourceRecipeData: ResourceRecipeData,
  rarityResourceRecipeData: RarityResourceRecipeData,
  itemRecipeData: ItemRecipeData,
  expTableData: ExpTableData
}

export type InitStatusMessage = {
  type: 'init_status',
  active_players: number,
  time: string
}

export type InitCharacterMessage = {
  type: 'init_character',
  character: Character
}

type UpdateParameters = {
  characterName: string,
  resources?: Partial<Resources>,
  experiences?: Partial<Record<ProfessionId, number>>,
  expChar?: number,
  currency?: Partial<Currency>
  activeAction?: ActionObject | null,
  actionQueue?: ActionObject[]
  itemId?: string
}
export type UpdateCharacterMessage = {
  type: 'update_character',
  updateParameters: UpdateParameters
}

// messages types outgoing

export type GatheringMsg = {
  type: 'gathering'
  limit: boolean
  iterations: number
  args: {
    node: string
  }
}

export type CraftingMsg = {
  type: 'crafting_resource' | 'crafting_rarityResource' | 'crafting_item'
  limit: boolean
  iterations: number
  args: {
    recipe: string
    ingredients: ResourceId[]
  }
}

export type CancelActionMsg = {
  type: 'cancel_action',
  index: number
}