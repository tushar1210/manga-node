const parseChapNumber = (chapNumber: string) => {
  let chapNumberR: string = chapNumber.substring(2, 5)
  if (chapNumberR.substring(0, 1) == "0") {
    chapNumberR = chapNumberR.substring(1, 3)
    if (chapNumberR.substring(0, 1) == "0") {
      chapNumberR = chapNumberR.substring(1, 2)
    }
  }
  return chapNumberR
}

export { parseChapNumber }