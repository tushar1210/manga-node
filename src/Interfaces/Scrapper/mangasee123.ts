import * as axios from 'axios';
import * as Fs from 'fs';
import * as cheerio from 'cheerio';
class scraper{
    defaultHeaders:object;
    baseURL:string;
    constructor(){
        this.defaultHeaders = { 
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            'DNT':'1',
            'X-Requested-With':'XMLHttpRequest',
            'Accept':'application/json, text/javascript, */*; q=0.01',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        };
        this.baseURL="https://mangasee123.com";
    }
    async hotUpdates(){
        const url = this.baseURL+'/hot.php';
        axios.default.request({
            method:'GET',
            headers:this.defaultHeaders,
            url:url
        }).then((data)=>{
            var str,$=cheerio.load(data.data,{xmlMode: true});
            str=$('script:not([src])')[4].children[0].data?.toString()
            
            var parse = str?.match(/vm.HotUpdateJSON = (\[.*?\])/)
            var valid=JSON.parse(parse[0].split('vm.HotUpdateJSON = ')[1]);
            

            console.log(valid)
            
            

        }).catch((e)=>{
            console.log(e);
        })
    }
}

export  {scraper} ;