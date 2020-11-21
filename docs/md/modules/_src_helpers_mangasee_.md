[manga](../README.md) › [Globals](../globals.md) › ["src/helpers/mangasee"](_src_helpers_mangasee_.md)

# Module: "src/helpers/mangasee"

## Index

### Functions

* [chapToken](_src_helpers_mangasee_.md#const-chaptoken)
* [currentChapter](_src_helpers_mangasee_.md#currentchapter)
* [nextChapter](_src_helpers_mangasee_.md#const-nextchapter)
* [parseChapNumber](_src_helpers_mangasee_.md#const-parsechapnumber)
* [previousChapter](_src_helpers_mangasee_.md#const-previouschapter)
* [thumbnail](_src_helpers_mangasee_.md#const-thumbnail)

## Functions

### `Const` chapToken

▸ **chapToken**(`chapNumber`: string): *string*

*Defined in [src/helpers/mangasee.ts:15](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/helpers/mangasee.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`chapNumber` | string |

**Returns:** *string*

___

###  currentChapter

▸ **currentChapter**(`allChapterJSON`: [curChapterReq](../interfaces/_src_interfaces_requests_mangasee_.curchapterreq.md)[], `curChp`: [curChapterReq](../interfaces/_src_interfaces_requests_mangasee_.curchapterreq.md)): *Promise‹number›*

*Defined in [src/helpers/mangasee.ts:24](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/helpers/mangasee.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`allChapterJSON` | [curChapterReq](../interfaces/_src_interfaces_requests_mangasee_.curchapterreq.md)[] |
`curChp` | [curChapterReq](../interfaces/_src_interfaces_requests_mangasee_.curchapterreq.md) |

**Returns:** *Promise‹number›*

___

### `Const` nextChapter

▸ **nextChapter**(`sourceSpecificName`: string, `chapterIndex`: number | any, `allChapterJSON`: [curChapterReq](../interfaces/_src_interfaces_requests_mangasee_.curchapterreq.md)[]): *string*

*Defined in [src/helpers/mangasee.ts:39](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/helpers/mangasee.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`sourceSpecificName` | string |
`chapterIndex` | number &#124; any |
`allChapterJSON` | [curChapterReq](../interfaces/_src_interfaces_requests_mangasee_.curchapterreq.md)[] |

**Returns:** *string*

___

### `Const` parseChapNumber

▸ **parseChapNumber**(`chapNumber`: string): *string*

*Defined in [src/helpers/mangasee.ts:3](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/helpers/mangasee.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`chapNumber` | string |

**Returns:** *string*

___

### `Const` previousChapter

▸ **previousChapter**(`sourceSpecificName`: string, `chapterIndex`: number | any, `allChapterJSON`: [curChapterReq](../interfaces/_src_interfaces_requests_mangasee_.curchapterreq.md)[]): *string*

*Defined in [src/helpers/mangasee.ts:49](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/helpers/mangasee.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`sourceSpecificName` | string |
`chapterIndex` | number &#124; any |
`allChapterJSON` | [curChapterReq](../interfaces/_src_interfaces_requests_mangasee_.curchapterreq.md)[] |

**Returns:** *string*

___

### `Const` thumbnail

▸ **thumbnail**(`indexName`: string): *string*

*Defined in [src/helpers/mangasee.ts:35](https://github.com/tushar1210/manga-node/blob/6ab85fc/src/helpers/mangasee.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`indexName` | string |

**Returns:** *string*
