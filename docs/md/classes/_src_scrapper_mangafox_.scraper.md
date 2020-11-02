[manga](../README.md) › [Globals](../globals.md) › ["src/scrapper/mangafox"](../modules/_src_scrapper_mangafox_.md) › [Scraper](_src_scrapper_mangafox_.scraper.md)

# Class: Scraper

## Hierarchy

* **Scraper**

## Index

### Constructors

* [constructor](_src_scrapper_mangafox_.scraper.md#constructor)

### Properties

* [baseURL](_src_scrapper_mangafox_.scraper.md#baseurl)
* [defaultHeaders](_src_scrapper_mangafox_.scraper.md#defaultheaders)

### Methods

* [getAll](_src_scrapper_mangafox_.scraper.md#getall)
* [getChaps](_src_scrapper_mangafox_.scraper.md#getchaps)
* [hotUpdates](_src_scrapper_mangafox_.scraper.md#hotupdates)
* [latestUpdates](_src_scrapper_mangafox_.scraper.md#latestupdates)
* [mangaData](_src_scrapper_mangafox_.scraper.md#mangadata)
* [scrapeAll](_src_scrapper_mangafox_.scraper.md#scrapeall)
* [search](_src_scrapper_mangafox_.scraper.md#search)

## Constructors

###  constructor

\+ **new Scraper**(): *[Scraper](_src_scrapper_mangafox_.scraper.md)*

*Defined in [src/scrapper/mangafox.ts:9](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangafox.ts#L9)*

**Returns:** *[Scraper](_src_scrapper_mangafox_.scraper.md)*

## Properties

###  baseURL

• **baseURL**: *string*

*Defined in [src/scrapper/mangafox.ts:9](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangafox.ts#L9)*

___

###  defaultHeaders

• **defaultHeaders**: *object*

*Defined in [src/scrapper/mangafox.ts:8](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangafox.ts#L8)*

## Methods

###  getAll

▸ **getAll**(): *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

*Defined in [src/scrapper/mangafox.ts:210](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangafox.ts#L210)*

**Returns:** *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

___

###  getChaps

▸ **getChaps**(`mangaName`: string): *Promise‹[chapterResults](../interfaces/_src_interfaces_responses_main_.chapterresults.md)[]›*

*Defined in [src/scrapper/mangafox.ts:120](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangafox.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`mangaName` | string |

**Returns:** *Promise‹[chapterResults](../interfaces/_src_interfaces_responses_main_.chapterresults.md)[]›*

___

###  hotUpdates

▸ **hotUpdates**(): *Promise‹[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]›*

*Defined in [src/scrapper/mangafox.ts:21](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangafox.ts#L21)*

**Returns:** *Promise‹[hotUpdates](../interfaces/_src_interfaces_responses_main_.hotupdates.md)[]›*

___

###  latestUpdates

▸ **latestUpdates**(): *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

*Defined in [src/scrapper/mangafox.ts:52](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangafox.ts#L52)*

**Returns:** *Promise‹[latestUpdates](../interfaces/_src_interfaces_responses_main_.latestupdates.md)[]›*

___

###  mangaData

▸ **mangaData**(`chapterURL`: string): *Promise‹[chapterData](../interfaces/_src_interfaces_responses_main_.chapterdata.md)›*

*Defined in [src/scrapper/mangafox.ts:148](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangafox.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`chapterURL` | string |

**Returns:** *Promise‹[chapterData](../interfaces/_src_interfaces_responses_main_.chapterdata.md)›*

___

###  scrapeAll

▸ **scrapeAll**(): *Promise‹void›*

*Defined in [src/scrapper/mangafox.ts:214](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangafox.ts#L214)*

**Returns:** *Promise‹void›*

___

###  search

▸ **search**(`keyword`: string): *Promise‹[searchResults](../interfaces/_src_interfaces_responses_main_.searchresults.md)[]›*

*Defined in [src/scrapper/mangafox.ts:82](https://github.com/tushar1210/manga-node/blob/fed3e48/src/scrapper/mangafox.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`keyword` | string |

**Returns:** *Promise‹[searchResults](../interfaces/_src_interfaces_responses_main_.searchresults.md)[]›*
