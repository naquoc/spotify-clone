import { FC } from "react"
import GradientLayout from "../components/gradientLayout"
import prisma from "../lib/prisma"
import { Box, Image, Text, Flex } from '@chakra-ui/react'
import { useMe } from "../lib/hooks"

const Home: FC<any> = ({ artists }) => {
  const { user } = useMe()
  return (
    <GradientLayout
      color='purple'
      subtitle='profile'
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      image='https://frontendmasters.github.io/fullstack-app-next-website/images/profile.png'
      roundImage
    >
      <Box color='white' paddingX='40px'>
        <Box marginBottom='40px'>
          <Text fontSize='2xl' fontWeight='bold'>Top artists this month</Text>
          <Text fontSize='md'>Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist: any) => (
            <Box paddingX='10px' width='20%' key={artist.id}>
              <Box bg='gray.900' width='100%' borderRadius='4px' padding='15px'>
                <Image src='https://placedog.net/300/300' borderRadius='100%' />
                <Box marginTop='20px'>
                  <Text fontWeight='bold' fontSize='large'>{artist.name}</Text>
                  <Text fontSize='x-small'>Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
}


export default Home
