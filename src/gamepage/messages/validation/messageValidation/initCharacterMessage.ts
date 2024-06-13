import { JTDSchemaType } from "ajv/dist/jtd"
import { ajv } from "../ajvInstance"

export type Character = {
  id: string
  characterName: string
  expChar: number
  currency: Currency
  items: string[]
  activeAction: ActionObject | null
  actionQueue: ActionObject[]
  professions: Professions
  resources: Record<string, number>
  itemMap: Record<string, Item>
}

export type Currency = {
  gold: number
}

export type Professions = Record<string, Profession>

export type Profession = {
  exp: number
  equipment: Equipment
}

export type Equipment = Record<string, string | null>

export type ActionObject = {
  counter: number
  actionTime: number
  actionMsg: ActionMsg
}

export type ActionMsg = GatheringMsg | CraftingMsg

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
    ingredients: string[]
  }
}

export type Item = {
  _id: string;
  name: string;
  equipmentProfessions: string[];
  equipmentSlot: string;
  level: number;
  tier: number;
  rarity: string;
  description: string;
  enchantingLevel: number;
  craftedGearScore: number;

  baseStats: {
    speed?: number;
    armor?: number;
    attack?: number;
    attackSpeed?: number;
  }

  bonusTypes: Record<string, number>
}




export function validateInitCharacterMessage(message: any): Character {
  if(true) {
    console.log('InitCharacterMessage is valid')
    return message
  } else {
    
  }
}