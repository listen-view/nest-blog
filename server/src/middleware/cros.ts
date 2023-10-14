import { NestMiddleware } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'

export class CrosMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*') // 允许所有域访问，根据需要修改为特定域
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    if (req.method === 'OPTIONS') {
      res.sendStatus(204)
    }
    next()
  }
}
