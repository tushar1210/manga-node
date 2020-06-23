import * as kissManga from '../src/Handlers/kissmanga'
import * as Fs from 'fs'
import {mangaList} from '../src/Interfaces/kissManga-mangaList'


var list:mangaList[] = [];

kissManga.scrapeKissMangaAll('0')
.then((data:mangaList[])=>{
        if(data.length==0){
                console.log('hello')
        } 

        data.forEach(element => {
                list.push(element);
        });
})
.catch((e)=>{
        console.log(e);
        return;
});   



