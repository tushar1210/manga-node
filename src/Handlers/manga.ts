import * as axios from 'axios'
import * as Fs from 'fs'  ;
import * as Path from 'path';
const headers = { 
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    }  


export async function mangaEdenList(){
    return axios.default.get('https://www.mangaeden.com/api/list/0',{headers:headers});
    
}

export async function mangaEdenGetImage(dir:String,imgPath:String){
    const url = 'https://cdn.mangaeden.com/mangasimg/'+dir+"/"+imgPath;
    const path = Path.resolve('./build/temp/thumbnail', 'image.jpg')
    const writer = Fs.createWriteStream(path)
    const response = await axios.default({
        url,
        method: 'GET',
        responseType: 'stream',
        headers:headers
      })
      response.data.pipe(writer)
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
    

}
