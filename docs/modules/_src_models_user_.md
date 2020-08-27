[manga](../README.md) › [Globals](../globals.md) › ["src/Models/user"](_src_models_user_.md)

# Module: "src/Models/user"

## Index

### Variables

* [Schema](_src_models_user_.md#let-schema)
* [User](_src_models_user_.md#let-user)
* [mongoose](_src_models_user_.md#mongoose)
* [user](_src_models_user_.md#let-user)

## Variables

### `Let` Schema

• **Schema**: *Schema* = mongoose.Schema

*Defined in [src/Models/user.ts:3](https://github.com/tushar1210/manga-node/blob/ee68806/src/Models/user.ts#L3)*

___

### `Let` User

• **User**: *Model‹Document‹›, object›* = mongoose.model('User', user)

*Defined in [src/Models/user.ts:25](https://github.com/tushar1210/manga-node/blob/ee68806/src/Models/user.ts#L25)*

___

###  mongoose

• **mongoose**: *"mongoose"*

*Defined in [src/Models/user.ts:1](https://github.com/tushar1210/manga-node/blob/ee68806/src/Models/user.ts#L1)*

___

### `Let` user

• **user**: *Schema‹any›* = new Schema({
    id: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    favourities: {
        type: [String],
        required: false
    }
})

*Defined in [src/Models/user.ts:5](https://github.com/tushar1210/manga-node/blob/ee68806/src/Models/user.ts#L5)*
