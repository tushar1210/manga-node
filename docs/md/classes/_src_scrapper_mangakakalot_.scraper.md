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

*Defined in [src/scrapper/mangakakalot.ts:11](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L11)*

**Returns:** *[Scraper](_src_scrapper_mangakakalot_.scraper.md)*

## Properties

###  baseURL

• **baseURL**: *string*

*Defined in [src/scrapper/mangakakalot.ts:10](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L10)*

___

###  dataURL

• **dataURL**: *string*

*Defined in [src/scrapper/mangakakalot.ts:11](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L11)*

___

###  defaultHeaders

• **defaultHeaders**: *object*

*Defined in [src/scrapper/mangakakalot.ts:9](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L9)*

## Methods

###  getAll

▸ **getAll**(): *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

*Defined in [src/scrapper/mangakakalot.ts:174](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L174)*

**Returns:** *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

___

###  getChaps

▸ **getChaps**(`mangaName`: string): *Promise‹[chapterResults](../interfaces/_src_interfaces_responses_main_.chapterresults.md)[]›*

*Defined in [src/scrapper/mangakakalot.ts:111](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L111)*

**Parameters:**

Name | Type |
------ | ------ |
`mangaName` | string |

**Returns:** *Promise‹[chapterResults](../interfaces/_src_interfaces_responses_main_.chapterresults.md)[]›*

___

###  hotUpdates

▸ **hotUpdates**(): *Promise‹[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]›*

*Defined in [src/scrapper/mangakakalot.ts:24](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L24)*

**Returns:** *Promise‹[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]›*

___

###  latestUpdates

▸ **latestUpdates**(): *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

*Defined in [src/scrapper/mangakakalot.ts:51](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L51)*

**Returns:** *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

___

###  mangaData

▸ **mangaData**(`chapterURL`: string): *Promise‹[chapterData](../interfaces/_src_interfaces_responses_main_.chapterdata.md)›*

*Defined in [src/scrapper/mangakakalot.ts:137](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L137)*

**Parameters:**

Name | Type |
------ | ------ |
`chapterURL` | string |

**Returns:** *Promise‹[chapterData](../interfaces/_src_interfaces_responses_main_.chapterdata.md)›*

___

###  scrapeAll

▸ **scrapeAll**(): *Promise‹void›*

*Defined in [src/scrapper/mangakakalot.ts:178](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L178)*

**Returns:** *Promise‹void›*

___

###  scrapeHotUpdates

▸ **scrapeHotUpdates**(`data`: AxiosResponse): *[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]*

*Defined in [src/scrapper/mangakakalot.ts:207](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L207)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | AxiosResponse |

**Returns:** *[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]*

___

###  scrapeLatestUpdates

▸ **scrapeLatestUpdates**(`data`: AxiosResponse): *[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]*

*Defined in [src/scrapper/mangakakalot.ts:232](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L232)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | AxiosResponse |

**Returns:** *[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]*

___

###  search

▸ **search**(`keyWord`: string): *Promise‹[searchResults](../interfaces/_src_interfaces_responses_main_.searchresults.md)[]›*

*Defined in [src/scrapper/mangakakalot.ts:76](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangakakalot.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`keyWord` | string |

**Returns:** *Promise‹[searchResults](../interfaces/_src_interfaces_responses_main_.searchresults.md)[]›*
