[manga](../README.md) › [Globals](../globals.md) › ["src/Handlers/manga"](_src_handlers_manga_.md)

# Module: "src/Handlers/manga"

## Index

### Functions

* [getChapter](_src_handlers_manga_.md#getchapter)
* [mangaEdenChapterList](_src_handlers_manga_.md#mangaedenchapterlist)
* [mangaEdenGetImage](_src_handlers_manga_.md#mangaedengetimage)
* [mangaEdenList](_src_handlers_manga_.md#mangaedenlist)
* [updateMangaEdenListJSON](_src_handlers_manga_.md#updatemangaedenlistjson)

### Object literals

* [headers](_src_handlers_manga_.md#const-headers)

## Functions

###  getChapter

▸ **getChapter**(`chapterId`: String): *Promise‹AxiosResponse‹any››*

*Defined in [src/Handlers/manga.ts:66](https://github.com/tushar1210/manga-node/blob/3ac409b/src/Handlers/manga.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`chapterId` | String |

**Returns:** *Promise‹AxiosResponse‹any››*

___

###  mangaEdenChapterList

▸ **mangaEdenChapterList**(`mangaID`: String): *Promise‹AxiosResponse‹any››*

*Defined in [src/Handlers/manga.ts:45](https://github.com/tushar1210/manga-node/blob/3ac409b/src/Handlers/manga.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`mangaID` | String |

**Returns:** *Promise‹AxiosResponse‹any››*

___

###  mangaEdenGetImage

▸ **mangaEdenGetImage**(`dir`: String, `imgPath`: String): *Promise‹unknown›*

*Defined in [src/Handlers/manga.ts:26](https://github.com/tushar1210/manga-node/blob/3ac409b/src/Handlers/manga.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`dir` | String |
`imgPath` | String |

**Returns:** *Promise‹unknown›*

___

###  mangaEdenList

▸ **mangaEdenList**(): *Promise‹AxiosResponse‹any››*

*Defined in [src/Handlers/manga.ts:10](https://github.com/tushar1210/manga-node/blob/3ac409b/src/Handlers/manga.ts#L10)*

**Returns:** *Promise‹AxiosResponse‹any››*

___

###  updateMangaEdenListJSON

▸ **updateMangaEdenListJSON**(): *Promise‹void›*

*Defined in [src/Handlers/manga.ts:53](https://github.com/tushar1210/manga-node/blob/3ac409b/src/Handlers/manga.ts#L53)*

**Returns:** *Promise‹void›*

## Object literals

### `Const` headers

### ▪ **headers**: *object*

*Defined in [src/Handlers/manga.ts:5](https://github.com/tushar1210/manga-node/blob/3ac409b/src/Handlers/manga.ts#L5)*

###  Accept

• **Accept**: *string* = "text/html,application/xhtml+xml,application/xmlq=0.9,image/webp,image/apng,*/*q=0.8,application/signed-exchangev=b3q=0.9"

*Defined in [src/Handlers/manga.ts:7](https://github.com/tushar1210/manga-node/blob/3ac409b/src/Handlers/manga.ts#L7)*

###  User-Agent

• **User-Agent**: *string* = "Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"

*Defined in [src/Handlers/manga.ts:6](https://github.com/tushar1210/manga-node/blob/3ac409b/src/Handlers/manga.ts#L6)*
