/* eslint-disable import/no-extraneous-dependencies */
import { NextFunction, Response, Request } from 'express'

const parseDate = (value: string) => {
  if (typeof value === 'string') {
    if (value.match(/^___date /)) {
      const dateString = value.replace(/^___date /, '')

      return new Date(parseInt(dateString, 10))
    }

    if (value.match(/^___now/)) {
      return new Date()
    }
  }

  return value
}

const dateParser = (req: Request, res: Response, next: NextFunction) => {
  const newBody = Object
    .keys(req.body)
    .reduce(
      (accumulator, current) => ({ ...accumulator, [current]: parseDate(req.body[current]) }),
      {},
    )

  req.body = newBody
  next()
}

export default dateParser
