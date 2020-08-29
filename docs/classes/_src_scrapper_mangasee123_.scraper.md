[manga](../README.md) › [Globals](../globals.md) › ["src/Scrapper/mangasee123"](../modules/_src_scrapper_mangasee123_.md) › [scraper](_src_scrapper_mangasee123_.scraper.md)

# Class: scraper

## Hierarchy

* **scraper**

## Index

### Constructors

* [constructor](_src_scrapper_mangasee123_.scraper.md#constructor)

### Properties

* [baseURL](_src_scrapper_mangasee123_.scraper.md#baseurl)
* [defaultHeaders](_src_scrapper_mangasee123_.scraper.md#defaultheaders)

### Methods

* [all](_src_scrapper_mangasee123_.scraper.md#all)
* [getAll](_src_scrapper_mangasee123_.scraper.md#getall)
* [hotUpdates](_src_scrapper_mangasee123_.scraper.md#hotupdates)
* [latestUpdates](_src_scrapper_mangasee123_.scraper.md#latestupdates)
* [search](_src_scrapper_mangasee123_.scraper.md#search)

## Constructors

###  constructor

\+ **new scraper**(): *[scraper](_src_scrapper_mangasee123_.scraper.md)*

*Defined in [src/Scrapper/mangasee123.ts:10](https://github.com/tushar1210/manga-node/blob/a6fc0c4/src/Scrapper/mangasee123.ts#L10)*

**Returns:** *[scraper](_src_scrapper_mangasee123_.scraper.md)*

## Properties

###  baseURL

• **baseURL**: *string*

*Defined in [src/Scrapper/mangasee123.ts:10](https://github.com/tushar1210/manga-node/blob/a6fc0c4/src/Scrapper/mangasee123.ts#L10)*

___

###  defaultHeaders

• **defaultHeaders**: *object*

*Defined in [src/Scrapper/mangasee123.ts:9](https://github.com/tushar1210/manga-node/blob/a6fc0c4/src/Scrapper/mangasee123.ts#L9)*

## Methods

###  all

▸ **all**(): *Promise‹void›*

*Defined in [src/Scrapper/mangasee123.ts:98](https://github.com/tushar1210/manga-node/blob/a6fc0c4/src/Scrapper/mangasee123.ts#L98)*

**Returns:** *Promise‹void›*

___

###  getAll

▸ **getAll**(): *Promise‹[allRes](../interfaces/_src_interfaces_openmanga_responses_mangasee_.allres.md)[]›*

*Defined in [src/Scrapper/mangasee123.ts:130](https://github.com/tushar1210/manga-node/blob/a6fc0c4/src/Scrapper/mangasee123.ts#L130)*

**Returns:** *Promise‹[allRes](../interfaces/_src_interfaces_openmanga_responses_mangasee_.allres.md)[]›*

___

###  hotUpdates

▸ **hotUpdates**(): *Promise‹[hotUpRes](../interfaces/_src_interfaces_openmanga_responses_mangasee_.hotupres.md)[]›*

*Defined in [src/Scrapper/mangasee123.ts:22](https://github.com/tushar1210/manga-node/blob/a6fc0c4/src/Scrapper/mangasee123.ts#L22)*

**Returns:** *Promise‹[hotUpRes](../interfaces/_src_interfaces_openmanga_responses_mangasee_.hotupres.md)[]›*

___

###  latestUpdates

▸ **latestUpdates**(): *Promise‹[latestUpRes](../interfaces/_src_interfaces_openmanga_responses_mangasee_.latestupres.md)[]›*

*Defined in [src/Scrapper/mangasee123.ts:59](https://github.com/tushar1210/manga-node/blob/a6fc0c4/src/Scrapper/mangasee123.ts#L59)*

**Returns:** *Promise‹[latestUpRes](../interfaces/_src_interfaces_openmanga_responses_mangasee_.latestupres.md)[]›*

___

###  search

▸ **search**(`keyWord`: string): *Promise‹[allRes](../interfaces/_src_interfaces_openmanga_responses_mangasee_.allres.md)[]›*

*Defined in [src/Scrapper/mangasee123.ts:135](https://github.com/tushar1210/manga-node/blob/a6fc0c4/src/Scrapper/mangasee123.ts#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`keyWord` | string |

**Returns:** *Promise‹[allRes](../interfaces/_src_interfaces_openmanga_responses_mangasee_.allres.md)[]›*
