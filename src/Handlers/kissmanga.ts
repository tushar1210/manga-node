import * as axios from 'axios'
import * as Fs from 'fs'  ;
import * as cheerio from 'cheerio';
import {mangaList} from '../Interfaces/kissManga-mangaList'

const headers = { 
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    }  
export async function scrapeKissMangaAll(){
    var pageCtr=0
    const url  = 'https://kissmanga.in/manga-list/page/'+pageCtr+'/?m_orderby=alphabet'
    await axios.default.request({
        method:'GET',
        headers:headers,
        url:url
    }).then((data)=>{
        var $ = cheerio.load(data.data);
        var title,link,image,lastChapter,lastChapterLink,lastChapterDate,id;

        var list:mangaList[]=[] ;
        var ctr=5;
        var h=$('.page-listing-item');
        while(ctr-->0){
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
            
            list.push(json)
            
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

            var json:mangaList={
                id:id,
                title:String(title),
                link:String(link),
                thumbnail:String(image),
                lastChapter:String(lastChapter),
                lastChapterDate:String(lastChapterDate),
                lastChapterLink:String(lastChapterLink)
            }
            list.push(json)
            
            h=h.next();
        }
        Fs.appendFileSync('./build/temp/kissmanga.json',JSON.stringify(list))
    })
    .catch((e)=>{
        console.log(e);
    });

}