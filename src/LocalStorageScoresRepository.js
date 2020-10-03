export const LocalStorageScoresRepository = ({modeName}) => {
  return {
    saveScore({playerName, score}) {
      const newSave = {playerName, score};
      if (!localStorage.getItem(modeName)) {
        localStorage[modeName] = JSON.stringify([newSave])
      } else {
        localStorage[modeName] = JSON.stringify([...JSON.parse(localStorage[modeName]), newSave])
      }
      console.log("SAVED", localStorage[modeName])
    },
    findBestScores({max}) {
      if (!localStorage.getItem(modeName)) {
        return []
      }
      const savedScores = JSON.parse(localStorage.getItem(modeName))

      return savedScores
          .sort((a, b) => b.score - a.score)
          .slice(0, max)
    }
  }
}
