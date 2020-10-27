const parseChapNumber = (chapNumber: number, chapterURL: string, char: string): any => {
  let chapArr = []
  let chpJSON: any = {}
  for (let index = 0; index < chapNumber - 1; index++) {
    let strIdx = String(index)
    let imageURL = ''
    if (strIdx.length == 1) {
      imageURL = `https://${chapterURL}/${char}00${strIdx}.jpg`
    } else if (strIdx.length == 2) {
      imageURL = `https://${chapterURL}/${char}0${strIdx}.jpg`
    } else {
      imageURL = `https://${chapterURL}/${char}${strIdx}.jpg`
    }
    chpJSON[index] = imageURL
  }
  return chpJSON
}

export { parseChapNumber }