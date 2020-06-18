import * as axios from 'axios'

const headers = { 
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    }  

// export async function login(){

// }


export async function mangaEdenList(){
    return axios.default.get('https://www.mangaeden.com/api/list/0',{headers:headers});
    
}

export async function mangaEdenGetImage(dir:String,imgPath:String){
    // return await axios.default.get('https://cdn.mangaeden.com/mangasimg/'+dir+"/"+imgPath,
    // {
    //     headers: headers
    // });
    return await axios.default.get('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    {
        headers: headers
    });

}

