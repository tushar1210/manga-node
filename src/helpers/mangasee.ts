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

const thumbnail = (indexName: string): string => {
  return ''
}
export { parseChapNumber, chapToken, thumbnail }