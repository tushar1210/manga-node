const parseChapNumber = (chapNumber: number, chapterURL: string, char: string, format: string): any => {
  let chpJSON: any = {}
  for (let index = 1; index < chapNumber; index++) {
    let strIdx = String(index)
    let imageURL = ''
    if (strIdx.length == 1) {
      imageURL = `https:${chapterURL}/${char}00${strIdx}.jpg`
    } else if (strIdx.length == 2) {
      imageURL = `https:${chapterURL}/${char}0${strIdx}.jpg`
    } else {
      imageURL = `https:${chapterURL}/${char}${strIdx}.jpg`
    }
    chpJSON[index] = imageURL
  }
  return chpJSON
}

const increamentImage = (imageSerialNumber: string): string => {
  return String(Number(imageSerialNumber) + 1)
}

export { parseChapNumber, increamentImage }