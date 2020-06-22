import * as axios from 'axios'
import * as Fs from 'fs'  ;
import * as Path from 'path';
import * as cheerio from 'cheerio';

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
        var json={
            success:true,
            title:"",
            link:"",
            image:"",
            lastChapter:"",
            lastChapterLink:"",
            lastChapterDate:""
        }

        var h=$('.page-listing-item').next()

        id=h.children('.row').children('.col-12').children('.page-item-detail').children('.item-thumb').attr('data-post-id');
        link=h.children('.row').children('.col-12').children('.page-item-detail').
        children('.item-thumb').children().first().attr('href');
        title=h.children('.row').children('.col-12').children('.page-item-detail').
        children('.item-thumb').children().first().attr('title');
        image=h.children('.row').children('.col-12').children('.page-item-detail').
        children('.item-thumb').children().children().first().attr('src');
        lastChapter=h.children('.row').children('.col-12').children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().first().next().children().next().text();
        lastChapter= lastChapter.split(' ')[1] + ' ' + lastChapter.split(' ')[2]
        lastChapterLink=h.children('.row').children('.col-12').children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().children().children().attr('href')
        lastChapterDate=h.children('.row').children('.col-12').children('.page-item-detail').children('.item-thumb').next().children().next().next().first().children().first().next().children().next().text()
        lastChapterDate = lastChapterDate.split('\t')[9]
        console.log(id,link,title,image,lastChapter,lastChapterDate,lastChapterLink)

    })
    .catch((e)=>{
        console.log(e);
    })

}