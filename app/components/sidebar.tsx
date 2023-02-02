import NextImage from 'next/image'
import NextLink from 'next/link'

import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  LinkBox,
  LinkOverlay,
  Flex,
  Text,
} from '@chakra-ui/layout'

import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'
import { usePlaylist } from '../lib/hooks'
import { GiMusicalNotes } from 'react-icons/gi'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/'
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search'
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library'
  },
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/'
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorites'
  },
]

const Sidebar = () => {
  const { playlists } = usePlaylist()
  return (
    <Box width='100%' height='calc(100vh - 100px)' bg='black' paddingX='5px' color='gray'>
      <Box paddingY='20px' height='100%'>
        <Flex width='120px' marginBottom='20px' paddingX='20px'>
          <Box fontSize='24px' mr='2'>
            <GiMusicalNotes />
          </Box>
          <Text as='b'>Musicapp</Text>
        </Flex>
        <Box marginBottom='20px'>
          <List spacing={2}>
            {navMenu.map(menu => (
              <ListItem paddingX='20px' fontSize='16px' key={menu.name}>
                <LinkBox>
                  <LinkOverlay as={NextLink} href={menu.route}>
                    <ListIcon as={menu.icon} color="white" marginRight='20px' />
                    {menu.name}
                  </LinkOverlay>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color='gray.900' />
        <Box marginTop='20px' marginBottom='20px'>
          <List spacing={2}>
            {musicMenu.map(menu => (
              <ListItem paddingX='20px' fontSize='16px' key={menu.name}>
                <LinkBox>
                  <LinkOverlay as={NextLink} href={menu.route}>
                    <ListIcon as={menu.icon} color='white' marginRight='20px' />
                    {menu.name}
                  </LinkOverlay>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color='gray.900' />
        <Box height='66%' overflow='auto' paddingY='20px'>
          <List spacing={2}>
            {playlists.map((playlist: any) => (
              <ListItem paddingX='20px' key={playlist.id}>
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: '/playlist/[id]',
                      query: { id: playlist.id },
                    }}
                    passHref
                    legacyBehavior>
                    <LinkOverlay>
                      {playlist.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
