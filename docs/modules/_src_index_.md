[manga](../README.md) › [Globals](../globals.md) › ["src/index"](_src_index_.md)

# Module: "src/index"

## Index

### Variables

* [PORT](_src_index_.md#const-port)
* [app](_src_index_.md#const-app)
* [connString](_src_index_.md#const-connstring)
* [mangasee123sc](_src_index_.md#const-mangasee123sc)

## Variables

### `Const` PORT

• **PORT**: *string | 5000* = process.env.PORT || 5000

*Defined in [src/index.ts:12](https://github.com/tushar1210/manga-node/blob/ee68806/src/index.ts#L12)*

___

### `Const` app

• **app**: *Express‹›* = express()

*Defined in [src/index.ts:13](https://github.com/tushar1210/manga-node/blob/ee68806/src/index.ts#L13)*

___

### `Const` connString

• **connString**: *string* = String(process.env.CONNECTION_STRING)

*Defined in [src/index.ts:25](https://github.com/tushar1210/manga-node/blob/ee68806/src/index.ts#L25)*

___

### `Const` mangasee123sc

• **mangasee123sc**: *[scraper](../classes/_src_scrapper_mangasee123_.scraper.md)‹›* = new scraper()

*Defined in [src/index.ts:14](https://github.com/tushar1210/manga-node/blob/ee68806/src/index.ts#L14)*
