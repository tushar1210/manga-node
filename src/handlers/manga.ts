import * as axios from 'axios'
import * as Fs from 'fs'
import * as Path from 'path'

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xmlq=0.9,image/webp,image/apng,*/*q=0.8,application/signed-exchangev=b3q=0.9',
}

export async function mangaEdenList() {
  return axios.default.get('https://www.mangaeden.com/api/list/0', { headers: headers })

}

//search manga in mangaeden.json
// const raw = Fs.readFileSync('./build/temp/eden-list.json')
// const data = JSON.parse(raw.toString())
// let res = data.filter((d:any)=>{
//     return d.a.indexOf(query)>-1
// })
// response.json({
//     success:true,
//     data:res
// })

export async function mangaEdenGetImage(dir: String, imgPath: String) {
  const url: string = 'https://cdn.mangaeden.com/mangasimg/' + dir + "/" + imgPath
  const path: string = Path.resolve('./build/temp/thumbnail', 'image.jpg')
  const writer: Fs.WriteStream = Fs.createWriteStream(path)
  const response: axios.AxiosResponse<any> = await axios.default({
    url,
    method: 'GET',
    responseType: 'stream',
    headers: headers
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

export async function mangaEdenChapterList(mangaID: String) {
  return await axios.default.request({
    method: 'GET',
    headers: headers,
    url: "https://www.mangaeden.com/api/manga/" + mangaID
  })
}

export async function updateMangaEdenListJSON() {
  await axios.default.get('https://www.mangaeden.com/api/list/0', { headers: headers })
    .then((data: axios.AxiosResponse<any>) => {
      let obj: string = JSON.stringify(data.data.manga)
      Fs.writeFileSync('./build/temp/eden-list.json', obj)
      let now: Date = new Date()
      Fs.appendFileSync('.log', '[Manga Eden] Succeessful MangaList Update at :    ' + now + '\n')
    })
    .catch((e: any) => {
      return e.message
    })
}

export async function getChapter(chapterId: String) {
  return await axios.default.request({
    method: 'GET',
    headers: headers,
    url: "https://www.mangaeden.com/api/chapter/" + chapterId
  })
}