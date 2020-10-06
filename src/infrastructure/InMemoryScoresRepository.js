export const InMemoryScoresRepository = ({modeName, initialData}) => {
  const inMemoryStorage = {}
  inMemoryStorage[modeName] = initialData

  return {
    saveScore({playerName, score}) {
      const newSave = {playerName, score};
      if (!inMemoryStorage[modeName]) {
        inMemoryStorage[modeName] = [newSave]
      } else {
        inMemoryStorage[modeName] = [inMemoryStorage[modeName], newSave]
      }
    },
    findBestScores({max}) {
      if (!inMemoryStorage[modeName]) {
        return []
      }
      const savedScores = inMemoryStorage[modeName]

      return savedScores
          .sort((a, b) => b.score - a.score)
          .slice(0, max)
    }
  }
}
