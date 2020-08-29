[manga](../README.md) › [Globals](../globals.md) › ["src/sqlz/models/index"](_src_sqlz_models_index_.md)

# Module: "src/sqlz/models/index"

## Index

### Variables

* [config](_src_sqlz_models_index_.md#const-config)
* [env](_src_sqlz_models_index_.md#const-env)
* [sequelize](_src_sqlz_models_index_.md#const-sequelize)

## Variables

### `Const` config

• **config**: *any* = require(__dirname + '/../config/config')[env]

*Defined in [src/sqlz/models/index.ts:5](https://github.com/tushar1210/manga-node/blob/a6fc0c4/src/sqlz/models/index.ts#L5)*

___

### `Const` env

• **env**: *string* = process.env.NODE_ENV || 'development'

*Defined in [src/sqlz/models/index.ts:4](https://github.com/tushar1210/manga-node/blob/a6fc0c4/src/sqlz/models/index.ts#L4)*

___

### `Const` sequelize

• **sequelize**: *Sequelize‹›* = new Sequelize(config.database, config.username, config.password, config)

*Defined in [src/sqlz/models/index.ts:7](https://github.com/tushar1210/manga-node/blob/a6fc0c4/src/sqlz/models/index.ts#L7)*
