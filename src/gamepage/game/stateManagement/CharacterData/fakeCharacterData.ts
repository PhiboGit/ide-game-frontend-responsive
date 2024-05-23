type CharacterStateData = {
  characterName: string,
  level: number,
  exp: number,
  resources: Resources,
  items: string[]
}

export const fakeCharacter: CharacterStateData = {
  characterName: "Phibo",
  level: 32,
  exp: 45213,
  resources: {
    woodT1: 10,
    woodT2: 0,
    woodT3: 30,
    woodT4: 0,
    woodT5: 50,
    oreT1: 1,
    oreT2: 20,
    oreT3: 0,
    oreT4: 40,
    oreT5: 0,
    plantT1: 540,
    plantT2: 0,
    plantT3: 0,
    plantT4: 0,
    plantT5: 0,
  },
  items: ["id_1", "id_2", "id_3"],
}
