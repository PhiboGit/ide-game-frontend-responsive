import { BonusTypePrefix } from "./gameTypes";
import useGameDataState from "./stateManagement/GameData/useGameData";

export function getLevel(exp: number): number {
    const {expTableData} = useGameDataState((data) => data)

    let level = 0
    for (const [key, value] of Object.entries(expTableData.exp)) {
        if (exp < value) {
            break
        }
        level = parseInt(key)
    }
    return level
}

export function getLevelProgress(exp: number) {
    const {expTableData} = useGameDataState((data) => data)

    const level = getLevel(exp)
    const nextLevel = level + 1
    const nextLevelExp = expTableData.exp[nextLevel]
    const progress = (exp - expTableData.exp[level]) / (nextLevelExp - expTableData.exp[level]) * 100
    return {progress, levelUpInExp: nextLevelExp - exp}
}

export function convertGearScore(key: BonusTypePrefix, gearScore: number) {
    const {itemConverterData} = useGameDataState((data) => data)
    if(gearScore === 0) return 0
    const maxGearScoreStat = itemConverterData.maxGearScoreStat
    const min = itemConverterData.gearScoreConverter[key].min
    const max = itemConverterData.gearScoreConverter[key].max
    const absGearScore = Math.abs(gearScore);
    const sign = Math.sign(gearScore) === -1 ? itemConverterData.negativeMutiplier : 1;
  
    // Normalize absGearScore to a range between 0 and 1
    const normalizedScore = absGearScore / maxGearScoreStat;
  
    // Scale it to the desired range and apply the sign
    const scaledScore = sign * (min + (normalizedScore * (max - min)));
  
    if (itemConverterData.gearScoreConverter[key]["integer/float"] === "integer") {
      return Math.floor(scaledScore)
    } else 
      return scaledScore
  }