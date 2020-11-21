[manga](../README.md) › [Globals](../globals.md) › ["src/scrapper/mangasee123"](../modules/_src_scrapper_mangasee123_.md) › [Scraper](_src_scrapper_mangasee123_.scraper.md)

# Class: Scraper

## Hierarchy

* **Scraper**

## Index

### Constructors

* [constructor](_src_scrapper_mangasee123_.scraper.md#constructor)

### Properties

* [baseURL](_src_scrapper_mangasee123_.scraper.md#baseurl)
* [defaultHeaders](_src_scrapper_mangasee123_.scraper.md#defaultheaders)

### Methods

* [all](_src_scrapper_mangasee123_.scraper.md#all)
* [getAll](_src_scrapper_mangasee123_.scraper.md#getall)
* [getChaps](_src_scrapper_mangasee123_.scraper.md#getchaps)
* [hotUpdates](_src_scrapper_mangasee123_.scraper.md#hotupdates)
* [latestUpdates](_src_scrapper_mangasee123_.scraper.md#latestupdates)
* [mangaData](_src_scrapper_mangasee123_.scraper.md#mangadata)
* [search](_src_scrapper_mangasee123_.scraper.md#search)

## Constructors

###  constructor

\+ **new Scraper**(): *[Scraper](_src_scrapper_mangasee123_.scraper.md)*

*Defined in [src/scrapper/mangasee123.ts:11](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangasee123.ts#L11)*

**Returns:** *[Scraper](_src_scrapper_mangasee123_.scraper.md)*

## Properties

###  baseURL

• **baseURL**: *string*

*Defined in [src/scrapper/mangasee123.ts:11](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangasee123.ts#L11)*

___

###  defaultHeaders

• **defaultHeaders**: *object*

*Defined in [src/scrapper/mangasee123.ts:10](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangasee123.ts#L10)*

## Methods

###  all

▸ **all**(): *Promise‹void›*

*Defined in [src/scrapper/mangasee123.ts:115](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangasee123.ts#L115)*

**Returns:** *Promise‹void›*

___

###  getAll

▸ **getAll**(): *Promise‹[searchResults](../interfaces/_src_interfaces_responses_main_.searchresults.md)[]›*

*Defined in [src/scrapper/mangasee123.ts:148](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangasee123.ts#L148)*

**Returns:** *Promise‹[searchResults](../interfaces/_src_interfaces_responses_main_.searchresults.md)[]›*

___

###  getChaps

▸ **getChaps**(`mangaName`: string): *Promise‹[chapterResults](../interfaces/_src_interfaces_responses_main_.chapterresults.md)[]›*

*Defined in [src/scrapper/mangasee123.ts:165](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangasee123.ts#L165)*

**Parameters:**

Name | Type |
------ | ------ |
`mangaName` | string |

**Returns:** *Promise‹[chapterResults](../interfaces/_src_interfaces_responses_main_.chapterresults.md)[]›*

___

###  hotUpdates

▸ **hotUpdates**(): *Promise‹[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]›*

*Defined in [src/scrapper/mangasee123.ts:23](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangasee123.ts#L23)*

**Returns:** *Promise‹[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]›*

___

###  latestUpdates

▸ **latestUpdates**(): *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

*Defined in [src/scrapper/mangasee123.ts:68](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangasee123.ts#L68)*

**Returns:** *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

___

###  mangaData

▸ **mangaData**(`chapterURL`: string): *Promise‹[chapterData](../interfaces/_src_interfaces_responses_main_.chapterdata.md)›*

*Defined in [src/scrapper/mangasee123.ts:205](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangasee123.ts#L205)*

**Parameters:**

Name | Type |
------ | ------ |
`chapterURL` | string |

**Returns:** *Promise‹[chapterData](../interfaces/_src_interfaces_responses_main_.chapterdata.md)›*

___

###  search

▸ **search**(`keyWord`: string): *Promise‹[searchResults](../interfaces/_src_interfaces_responses_main_.searchresults.md)[]›*

*Defined in [src/scrapper/mangasee123.ts:153](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/scrapper/mangasee123.ts#L153)*

**Parameters:**

Name | Type |
------ | ------ |
`keyWord` | string |

**Returns:** *Promise‹[searchResults](../interfaces/_src_interfaces_responses_main_.searchresults.md)[]›*
