declare global {
  type Rarity = "none" | "common" | "uncommon" | "rare" | "epic" | "legendary";
  type ResourceIdString = 
    "woodT1" | "woodT2" | "woodT3" | "woodT4" | "woodT5" | 
    "oreT1" | "oreT2" | "oreT3" | "oreT4" | "oreT5" |
    "plantT1" | "plantT2" | "plantT3" | "plantT4" | "plantT5" 

  type Resources = Record<ResourceIdString, number>
  type GatheringNode = {
    id: string;
    profession: string;
    tier: number;
  };
  
}


export {}; // This line ensures the file is treated as a module and avoids duplicate identifier issues