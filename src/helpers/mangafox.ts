const parseChapNumber = (chapNumber: number, chapterURL: string, char: string): string[] => {
  let chapArr = []
  for (let index = 0; index < chapNumber; index++) {
    let strIdx = String(index)
    if (strIdx.length == 1) {
      chapArr.push(`https://${chapterURL}/${char}00${strIdx}.jpg`)
    } else if (strIdx.length == 2) {
      chapArr.push(`https://${chapterURL}/${char}0${strIdx}.jpg`)
    } else {
      chapArr.push(`https://${chapterURL}/${char}${strIdx}.jpg`)
    }
  }
  chapArr.pop()
  return chapArr
}

export { parseChapNumber }