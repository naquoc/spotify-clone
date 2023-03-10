import { Box } from '@chakra-ui/layout';
import Nossr from './nossr';
import PlayerBar from './playerBar';
import Sidebar from './sidebar';

const PlayerLayout = ({ children }: any) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position='absolute' top='0' width="250px" left='0'>
        <Nossr>
          <Sidebar />
        </Nossr>
      </Box>
      <Box marginLeft='250px' height='calc(100vh - 100px)'>
        {children}
      </Box>
      <Box position='absolute' left="0" bottom='0'>
        <PlayerBar />
      </Box>
    </Box>
  )
}

export default PlayerLayout
