import { hotUpReq, latestUpReq, allReq, curChapterReq, chapsReq } from '../interfaces/requests/mangasee'

const parseChapNumber = (chapNumber: string): string => {
  let chapNumberR: string = chapNumber.substring(2, 5)
  if (chapNumberR.substring(0, 1) == "0") {
    chapNumberR = chapNumberR.substring(1, 3)
    if (chapNumberR.substring(0, 1) == "0") {
      chapNumberR = chapNumberR.substring(1, 2)
    }
  }
  if (chapNumber.substring(5, 6) != "0") chapNumberR = chapNumberR + "." + chapNumber.substring(5, 6)
  return chapNumberR
}

const chapToken = (chapNumber: string): string => {
  let token = "";
  let t = chapNumber.substring(0, 1)
  if (t != "1") {
    token = "-index-" + t
  }
  return token
}

async function currentChapter(allChapterJSON: curChapterReq[], curChp: curChapterReq): Promise<number> {
  var index: number = -1
  allChapterJSON.forEach((element: curChapterReq, chapterIndex: number) => {
    if (curChp.Chapter == element.Chapter) {
      index = chapterIndex
    }
  })

  return index
}

const thumbnail = (indexName: string): string => {
  return "https://cover.nep.li/cover/" + indexName + '.jpg'
}

const nextChapter = (sourceSpecificName: string, chapterIndex: number | any, allChapterJSON: curChapterReq[]): string => {
  var val = `https://mangasee123.com/read-online/${sourceSpecificName}-chapter-${parseChapNumber(allChapterJSON[chapterIndex + 1].Chapter)}`
  if (chapToken(allChapterJSON[chapterIndex + 1].Chapter) == '') {
    val += `.html`
  } else {
    val += `${chapToken(allChapterJSON[chapterIndex + 1].Chapter)}.html`
  }
  return val
}

const previousChapter = (sourceSpecificName: string, chapterIndex: number | any, allChapterJSON: curChapterReq[]): string => {
  var val = `https://mangasee123.com/read-online/${sourceSpecificName}-chapter-${parseChapNumber(allChapterJSON[chapterIndex - 1].Chapter)}`
  if (chapToken(allChapterJSON[chapterIndex - 1].Chapter) == '') {
    val += `.html`
  } else {
    val += `${chapToken(allChapterJSON[chapterIndex - 1].Chapter)}.html`
  }
  return val
}

export { parseChapNumber, chapToken, thumbnail, nextChapter, previousChapter, currentChapter }