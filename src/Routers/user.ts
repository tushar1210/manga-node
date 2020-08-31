import { Express, Request, Response } from 'express'
import { UsersCtrlEndPoint } from '../sqlz/endpoints'

export function routes(app: Express) {
  app.post('/api/signup', UsersCtrlEndPoint.UsersCtrlPost.signup)
  app.post('/api/login', UsersCtrlEndPoint.UsersCtrlPost.login)
}