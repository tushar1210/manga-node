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

*Defined in [src/scrapper/mangasee123.ts:12](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangasee123.ts#L12)*

**Returns:** *[Scraper](_src_scrapper_mangasee123_.scraper.md)*

## Properties

###  baseURL

• **baseURL**: *string*

*Defined in [src/scrapper/mangasee123.ts:12](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangasee123.ts#L12)*

___

###  defaultHeaders

• **defaultHeaders**: *object*

*Defined in [src/scrapper/mangasee123.ts:11](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangasee123.ts#L11)*

## Methods

###  all

▸ **all**(): *Promise‹void›*

*Defined in [src/scrapper/mangasee123.ts:114](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangasee123.ts#L114)*

**Returns:** *Promise‹void›*

___

###  getAll

▸ **getAll**(): *Promise‹[allRes](../interfaces/_src_interfaces_responses_mangasee_.allres.md)[]›*

*Defined in [src/scrapper/mangasee123.ts:145](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangasee123.ts#L145)*

**Returns:** *Promise‹[allRes](../interfaces/_src_interfaces_responses_mangasee_.allres.md)[]›*

___

###  getChaps

▸ **getChaps**(`mangaName`: string): *Promise‹[chapterResults](../interfaces/_src_interfaces_responses_main_.chapterresults.md)[]›*

*Defined in [src/scrapper/mangasee123.ts:162](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangasee123.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`mangaName` | string |

**Returns:** *Promise‹[chapterResults](../interfaces/_src_interfaces_responses_main_.chapterresults.md)[]›*

___

###  hotUpdates

▸ **hotUpdates**(): *Promise‹[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]›*

*Defined in [src/scrapper/mangasee123.ts:24](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangasee123.ts#L24)*

**Returns:** *Promise‹[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]›*

___

###  latestUpdates

▸ **latestUpdates**(): *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

*Defined in [src/scrapper/mangasee123.ts:68](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangasee123.ts#L68)*

**Returns:** *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

___

###  mangaData

▸ **mangaData**(`chapterURL`: string): *Promise‹[chapterData](../interfaces/_src_interfaces_responses_main_.chapterdata.md)›*

*Defined in [src/scrapper/mangasee123.ts:202](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangasee123.ts#L202)*

**Parameters:**

Name | Type |
------ | ------ |
`chapterURL` | string |

**Returns:** *Promise‹[chapterData](../interfaces/_src_interfaces_responses_main_.chapterdata.md)›*

___

###  search

▸ **search**(`keyWord`: string): *Promise‹[allRes](../interfaces/_src_interfaces_responses_mangasee_.allres.md)[]›*

*Defined in [src/scrapper/mangasee123.ts:150](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangasee123.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`keyWord` | string |

**Returns:** *Promise‹[allRes](../interfaces/_src_interfaces_responses_mangasee_.allres.md)[]›*
