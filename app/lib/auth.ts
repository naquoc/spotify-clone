import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

interface JwtPayload {
  id: number
}

export const validateRoute = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.SPOTIFY_CLONE_ACCESS_TOKEN

    let user

    if (token) {
      try {
        const { id } = jwt.verify(token, 'hello') as JwtPayload
        user = await prisma.user.findUnique({
          where: { id }
        })

        if (!user) {
          throw new Error('This user is no exist!')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not Authorized' })
        return
      }

      return handler(req, res, user)
    }

    res.status(401)
    res.json({ error: 'Not Authorized' })
  }

}

export const validateToken = (token: any) => {
  const user = jwt.verify(token, 'hello') as JwtPayload
  return user
}
