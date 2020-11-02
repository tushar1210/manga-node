[manga](../README.md) › [Globals](../globals.md) › ["src/scrapper/mangakakalot"](../modules/_src_scrapper_mangakakalot_.md) › [Scraper](_src_scrapper_mangakakalot_.scraper.md)

# Class: Scraper

## Hierarchy

* **Scraper**

## Index

### Constructors

* [constructor](_src_scrapper_mangakakalot_.scraper.md#constructor)

### Properties

* [baseURL](_src_scrapper_mangakakalot_.scraper.md#baseurl)
* [dataURL](_src_scrapper_mangakakalot_.scraper.md#dataurl)
* [defaultHeaders](_src_scrapper_mangakakalot_.scraper.md#defaultheaders)

### Methods

* [getAll](_src_scrapper_mangakakalot_.scraper.md#getall)
* [getChaps](_src_scrapper_mangakakalot_.scraper.md#getchaps)
* [hotUpdates](_src_scrapper_mangakakalot_.scraper.md#hotupdates)
* [latestUpdates](_src_scrapper_mangakakalot_.scraper.md#latestupdates)
* [mangaData](_src_scrapper_mangakakalot_.scraper.md#mangadata)
* [scrapeAll](_src_scrapper_mangakakalot_.scraper.md#scrapeall)
* [scrapeHotUpdates](_src_scrapper_mangakakalot_.scraper.md#scrapehotupdates)
* [scrapeLatestUpdates](_src_scrapper_mangakakalot_.scraper.md#scrapelatestupdates)
* [search](_src_scrapper_mangakakalot_.scraper.md#search)

## Constructors

###  constructor

\+ **new Scraper**(): *[Scraper](_src_scrapper_mangakakalot_.scraper.md)*

*Defined in [src/scrapper/mangakakalot.ts:11](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L11)*

**Returns:** *[Scraper](_src_scrapper_mangakakalot_.scraper.md)*

## Properties

###  baseURL

• **baseURL**: *string*

*Defined in [src/scrapper/mangakakalot.ts:10](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L10)*

___

###  dataURL

• **dataURL**: *string*

*Defined in [src/scrapper/mangakakalot.ts:11](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L11)*

___

###  defaultHeaders

• **defaultHeaders**: *object*

*Defined in [src/scrapper/mangakakalot.ts:9](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L9)*

## Methods

###  getAll

▸ **getAll**(): *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

*Defined in [src/scrapper/mangakakalot.ts:165](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L165)*

**Returns:** *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

___

###  getChaps

▸ **getChaps**(`mangaName`: string): *Promise‹[chapterResults](../interfaces/_src_interfaces_responses_main_.chapterresults.md)[]›*

*Defined in [src/scrapper/mangakakalot.ts:110](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`mangaName` | string |

**Returns:** *Promise‹[chapterResults](../interfaces/_src_interfaces_responses_main_.chapterresults.md)[]›*

___

###  hotUpdates

▸ **hotUpdates**(): *Promise‹[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]›*

*Defined in [src/scrapper/mangakakalot.ts:24](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L24)*

**Returns:** *Promise‹[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]›*

___

###  latestUpdates

▸ **latestUpdates**(): *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

*Defined in [src/scrapper/mangakakalot.ts:51](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L51)*

**Returns:** *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

___

###  mangaData

▸ **mangaData**(`chapterURL`: string): *Promise‹[chapterData](../interfaces/_src_interfaces_responses_main_.chapterdata.md)›*

*Defined in [src/scrapper/mangakakalot.ts:136](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`chapterURL` | string |

**Returns:** *Promise‹[chapterData](../interfaces/_src_interfaces_responses_main_.chapterdata.md)›*

___

###  scrapeAll

▸ **scrapeAll**(): *Promise‹void›*

*Defined in [src/scrapper/mangakakalot.ts:169](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L169)*

**Returns:** *Promise‹void›*

___

###  scrapeHotUpdates

▸ **scrapeHotUpdates**(`data`: AxiosResponse): *[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]*

*Defined in [src/scrapper/mangakakalot.ts:198](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L198)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | AxiosResponse |

**Returns:** *[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]*

___

###  scrapeLatestUpdates

▸ **scrapeLatestUpdates**(`data`: AxiosResponse): *[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]*

*Defined in [src/scrapper/mangakakalot.ts:223](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L223)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | AxiosResponse |

**Returns:** *[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]*

___

###  search

▸ **search**(`keyWord`: string): *Promise‹[searchResults](../interfaces/_src_interfaces_responses_main_.searchresults.md)[]›*

*Defined in [src/scrapper/mangakakalot.ts:76](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangakakalot.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`keyWord` | string |

**Returns:** *Promise‹[searchResults](../interfaces/_src_interfaces_responses_main_.searchresults.md)[]›*
