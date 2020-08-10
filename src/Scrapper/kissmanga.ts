import * as axios from 'axios'
import * as Fs from 'fs'  ;
import * as cheerio from 'cheerio';
import {mangaList,searchResult} from '../Interfaces/manga'
import {searchKissManga,searchKissMangaData} from '../Interfaces/response'

const headers = { 
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    'DNT':'1',
    'X-Requested-With':'XMLHttpRequest',
    'Accept':'application/json, text/javascript, */*; q=0.01',
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
} 

export async function scrapeKissMangaAll(pageCtr:string):Promise<mangaList[]>{
    const url  = 'https://kissmanga.in/manga-list/page/'+'9'+'/?m_orderby=alphabet'
    var list:Array<mangaList> = [];
    var json:mangaList;
    var json1:mangaList;
    var ctr = 5;
    await axios.default.request({
        method:'GET',
        headers:headers,
        url:url
    }).then((data)=>{
        var $ = cheerio.load(data.data);
        var title,link,image,lastChapter,lastChapterLink,lastChapterDate,id;
        var h=$('.page-listing-item');
        while(ctr-->0){
            if( h.html()==null ) break;
            try{
                id=String(h.children('.row').children('.col-12').children('.page-item-detail').children('.item-thumb').attr('data-post-id'));
                link=h.children('.row').children('.col-12').children('.page-item-detail').
                children('.item-thumb').children().first().attr('href');
                title=h.children('.row').children('.col-12').children('.page-item-detail').
                children('.item-thumb').children().first().attr('title');
                image=h.children('.row').children('.col-12').children('.page-item-detail').
                children('.item-thumb').children().children().first().attr('src');
                lastChapter=h.children('.row').children('.col-12').children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().first().children().first().text();
                lastChapter = lastChapter.split('\t')[7].trim() ;
                lastChapterLink=h.children('.row').children('.col-12').children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().children().children().attr('href');
                lastChapterDate=h.children('.row').children('.col-12').children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().first().next().children().next().text();
                lastChapterDate = lastChapterDate.split('\t')[9] ;
                var json:mangaList={
                    id:id,
                    title:String(title),
                    link:String(link),
                    thumbnail:String(image),
                    lastChapter:String(lastChapter),
                    lastChapterDate:String(lastChapterDate),
                    lastChapterLink:String(lastChapterLink)
                }
                list.push(json);            
                id=String(h.children('.row').children('.col-12').next().children('.page-item-detail').children('.item-thumb').attr('data-post-id'));
                link=h.children('.row').children('.col-12').next().children('.page-item-detail').children('.item-thumb').children().first().attr('href');
                title=h.children('.row').children('.col-12').next().children('.page-item-detail').
                children('.item-thumb').children().first().attr('title');
                image=h.children('.row').children('.col-12').next().children('.page-item-detail').
                children('.item-thumb').children().children().first().attr('src');
                lastChapter=h.children('.row').children('.col-12').next().children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().first().next().children().first().text();
                lastChapter = lastChapter.split('\t')[7].trim();
                lastChapterLink=h.children('.row').children('.col-12').next().children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().children().children().attr('href');
                lastChapterDate=h.children('.row').children('.col-12').next().children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().first().next().children().next().text();
                lastChapterDate = lastChapterDate.split('\t')[9];
                var json1:mangaList={
                    id:id,
                    title:String(title),
                    link:String(link),
                    thumbnail:String(image),
                    lastChapter:String(lastChapter),
                    lastChapterDate:String(lastChapterDate),
                    lastChapterLink:String(lastChapterLink)
                }
                
                list.push(json1);
                
                    
                h=h.next();
            }catch(e){
                return list;
            }
        }
    })
    .catch((e)=>{
    });
    
    return list

}

export async function search(key:string):Promise<searchResult[]>{
    const base:string = 'https://kissmanga.in/wp-admin/admin-ajax.php'
    const params:URLSearchParams = new URLSearchParams();
    params.append('action','wp-manga-search-manga');
    params.append('title',key);
    return await axios.default.request({
        method:'POST',
        url:base,
        headers:headers,
        data:params
    }).then((data)=>{
        var list:searchResult[] = [];
        var result:searchKissMangaData[] = data.data.data;
        result.forEach(element => {
            let succsessResult:searchResult = {
                title:element.title,
                url:element.url,
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
        list.push(failureResult)
        return list;
    })
}

// export async function manga(manga:string):Promise<ma 
