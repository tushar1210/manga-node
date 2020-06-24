import Axios, * as axios from 'axios';
import {searchResult} from '../Interfaces/manga'
import {searchMangaEden}  from '../Interfaces/response'
const headers:object = { 
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
}  

export async function search(key:string):Promise<searchResult[]>{
    const base:string = 'https://www.mangaeden.com/ajax/search-manga'
    const params:URLSearchParams = new URLSearchParams();
    params.append('term',key);

    return await axios.default.request({
        method:'GET',
        headers:headers,
        url:base,
        params:params
    }).then((data)=>{
        var list:searchResult[] = [];
        var result:searchMangaEden[] = data.data;
        result.forEach(element => {
            if(element.url.charAt(1)=='i' && element.url.charAt(2)=='t'){
                return;
            }
            let succsessResult:searchResult = {
                title:element.value,
                url:'https://www.mangaeden.com/en'+element.url,
            }
            list.push(succsessResult);
        });
       return list;
    })
    .catch((err:axios.AxiosError)=>{
        var list:searchResult[] = []
        let failureResult:searchResult={
            success:false,
            error:err.message
        }
        return list;
    });
}