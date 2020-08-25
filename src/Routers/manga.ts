import {Request,Response,Router} from 'express';
import {scraper as mangasee123Scrapper} from '../Interfaces/Scrapper/mangasee123';
const router = Router();

const sources={
    0:"https://mangasee123.com"
}

router.get('/:mangaId/hot-updates',async(request:Request, response:Response)=>{
    var mangaId = request.params.mangaId.toString();

    if(mangaId=='0'){
        var mangasee = new mangasee123Scrapper();
        await mangasee.hotUpdates()
        

    }

});


export default router;

