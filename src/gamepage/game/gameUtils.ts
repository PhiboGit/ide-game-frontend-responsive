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