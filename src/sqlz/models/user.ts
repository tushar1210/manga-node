import { Model, STRING, ARRAY } from 'sequelize'
import { sequelize } from './index'

export class User extends Model {

}

export class UserModel {
  id: string
  email: string
  password: string
  title: string
  favourites: [string]
  created_at: Date
  updated_at: Date
}

User
  .init({
    email: STRING(200),
    password: STRING(100),
    title: STRING(200),
    favourites: ARRAY(STRING(200))
  }, {
    sequelize, modelName: 'User',freezeTableName: true, underscored: true
  })
