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
  Center,
} from '@chakra-ui/layout'

import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'
import { usePlaylist } from '../lib/hooks'

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
        <Box width='120px' marginBottom='20px' paddingX='20px'>
          <NextImage src="/spotify.svg" alt='logo' height={60} width={120} priority />
        </Box>
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
            {playlists.map(playlist => (
              <ListItem paddingX='20px' key={playlist.id}>
                <LinkBox>
                  <LinkOverlay as={NextLink} href='/'>
                    {playlist.name}
                  </LinkOverlay>
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
