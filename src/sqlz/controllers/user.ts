import { User } from "../models/user"

export async function signup(user: any): Promise<any> {
  return await User
    .create({
      email: user.email,
      password: user.password
    })
}

export async function login(user: any): Promise<any> {
  return await User
    .findOne({
      where: {
        email: user.email,
        password: user.password
      }
    })
}