import { NextApiRequest } from "next"
import { FC } from "react"
import GradientLayout from "../../components/gradientLayout"
import SongsTable from "../../components/songsTable"
import { validateToken } from "../../lib/auth"
import prisma from "../../lib/prisma"

const getBGColor = (id: number) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ]
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist: FC<any> = ({ playlist }) => {
  const color = getBGColor(playlist.id)
  return (
    <GradientLayout
      color={color}
      title={playlist.name}
      subtitle='playlist'
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
      roundImage={false}
    >
      <SongsTable />
    </GradientLayout>
  )
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

