import { NextApiRequest } from "next"
import { FC } from "react"
import { validateToken } from "../../lib/auth"
import prisma from "../../lib/prisma"

const Playlist: FC<any> = ({ playlist }) => {
  return <div>{playlist.name}</div>
}

export const getServerSideProps = async ({ query, req }: { query: any, req: NextApiRequest }) => {
  const { id } = validateToken(req.cookies.SPOTIFY_CLONE_ACCESS_TOKEN)
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id as any,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            }
          }
        }
      }
    }
  })

  return {
    props: { playlist }
  }
}

export default Playlist

