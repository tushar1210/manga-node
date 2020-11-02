[manga](../README.md) › [Globals](../globals.md) › ["src/index"](_src_index_.md)

# Module: "src/index"

## Index

### Variables

* [PORT](_src_index_.md#const-port)
* [app](_src_index_.md#const-app)
* [mangafoxsc](_src_index_.md#const-mangafoxsc)
* [mangakakalotsc](_src_index_.md#const-mangakakalotsc)
* [mangasee123sc](_src_index_.md#const-mangasee123sc)
* [path](_src_index_.md#const-path)

## Variables

### `Const` PORT

• **PORT**: *string | 5000* = process.env.PORT || 5000

*Defined in [src/index.ts:13](https://github.com/tushar1210/manga-node/blob/a01e945/src/index.ts#L13)*

___

### `Const` app

• **app**: *Express‹›* = express()

*Defined in [src/index.ts:14](https://github.com/tushar1210/manga-node/blob/a01e945/src/index.ts#L14)*

___

### `Const` mangafoxsc

• **mangafoxsc**: *[Scraper](../classes/_src_scrapper_mangasee123_.scraper.md)‹›* = new mangafoxScraper()

*Defined in [src/index.ts:17](https://github.com/tushar1210/manga-node/blob/a01e945/src/index.ts#L17)*

___

### `Const` mangakakalotsc

• **mangakakalotsc**: *[Scraper](../classes/_src_scrapper_mangasee123_.scraper.md)‹›* = new mangakakalotScrapper()

*Defined in [src/index.ts:16](https://github.com/tushar1210/manga-node/blob/a01e945/src/index.ts#L16)*

___

### `Const` mangasee123sc

• **mangasee123sc**: *[Scraper](../classes/_src_scrapper_mangasee123_.scraper.md)‹›* = new mangasee123Scrapper()

*Defined in [src/index.ts:15](https://github.com/tushar1210/manga-node/blob/a01e945/src/index.ts#L15)*

___

### `Const` path

• **path**: *any* = require('path')

*Defined in [src/index.ts:8](https://github.com/tushar1210/manga-node/blob/a01e945/src/index.ts#L8)*
