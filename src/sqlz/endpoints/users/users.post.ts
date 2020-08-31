import { Request, Response } from 'express'
import { UsersCtrl } from '../../controllers/index'

export async function signup(req: Request, res: Response) {
  // validators & checkers

  return await UsersCtrl
    .signup({
      email: req.query.email,
      password: req.query.password
    })
    .then((user: any) => res.status(201).send(user))
    .catch((error: any) => res.status(400).send(error))
}

export async function login(req: Request, res: Response) {
  // validators & checkers

  return await UsersCtrl
    .login({
      email: req.query.email,
      password: req.query.password
    })
    .then((user: any) => res.status(200).send(user))
    .catch((error: any) => res.status(402).send(error))
}