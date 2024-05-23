declare global {
  type Rarity = "none" | "common" | "uncommon" | "rare" | "epic" | "legendary";
  type Profession = "Woodcutting" | "Harvesting" | "Mining";

  type GatheringNodeId = 
    "TreeT1" | "TreeT2" | "TreeT3" | "TreeT4" | "TreeT5" |
    "VeinT1" | "VeinT2" | "VeinT3" | "VeinT4" | "VeinT5" |
    "PlantT1" | "PlantT2" | "PlantT3" | "PlantT4" | "PlantT5"

  type ResourceId = 
    "woodT1" | "woodT2" | "woodT3" | "woodT4" | "woodT5" | 
    "oreT1" | "oreT2" | "oreT3" | "oreT4" | "oreT5" |
    "fiberT1" | "fiberT2" | "fiberT3" | "fiberT4" | "fiberT5" 

  type Resources = Record<ResourceId, number>
  
}


export {}; // This line ensures the file is treated as a module and avoids duplicate identifier issues