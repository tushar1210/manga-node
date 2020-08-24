import {Request,Response,Router} from 'express';
import * as handler from '../Handlers/manga';
import * as Fs from 'fs'  ;
import {mangaList,searchResult} from '../Interfaces/manga';
import * as mangaEdenScrapper from '../Scrapper/mangaeden';
import * as kissMangaScrapper from '../Scrapper/kissmanga';
const router = Router();

const sources={
    0:"https://mangasee123.com"
}



export default router;

