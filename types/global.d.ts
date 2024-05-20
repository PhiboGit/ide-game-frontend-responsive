declare global {
  type Rarity = "none" | "common" | "uncommon" | "rare" | "epic" | "legendary";

  type GatheringNode = {
    id: string;
    profession: string;
    tier: number;
  };
  
}


export {}; // This line ensures the file is treated as a module and avoids duplicate identifier issues