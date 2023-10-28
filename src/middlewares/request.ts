import { Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from "uuid"

const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let xRequestId = req.header("x-request-id")

  if (!xRequestId) {
    xRequestId = uuidv4()
  }

  res.setHeader("x-request-id", xRequestId)

  next()
}

export default requestIdMiddleware