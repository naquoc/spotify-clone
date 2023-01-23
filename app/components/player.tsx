import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from '@chakra-ui/react'

import ReactHowler from 'react-howler'
import { useEffect, useRef, useState } from 'react'
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md'

import { useStoreActions } from 'easy-peasy'

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true)
  const [index, setIndex] = useState(0)
  const [seek, setSeek] = useState(0.0)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const soundRef = useRef(null)

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length() - 1
    })
  }

  const nextSong = () => {
    setIndex((state: number) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length)

        if (next === state) {
          return nextSong()
        }

        return next
      }
      return state === songs.length - 1 ? 0 : state + 1
    })
  }

  return (
    <Box>
      <Box>
        <ReactHowler playing={playing} src={activeSong?.url} ref={soundRef} />
      </Box>
      <Center color='gray.600'>
        <ButtonGroup>
          <IconButton
            outline='none'
            variant='link'
            aria-label='shuffle'
            fontSize='24px'
            icon={<MdShuffle />}
            color={shuffle ? 'white' : 'gray.600'}
            onClick={() => setShuffle((prev) => !prev)}

          />
          <IconButton
            outline='none'
            variant='link'
            aria-label='previous'
            fontSize='24px'
            icon={<MdSkipPrevious />}
          />
          {playing ? (
            <IconButton
              outline='none'
              variant='link'
              aria-label='pause'
              fontSize='40px'
              color='white'
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlaying(false)}
            />
          ) : (
            <IconButton
              outline='none'
              variant='link'
              aria-label='play'
              fontSize='40px'
              color='white'
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlaying(true)}
            />
          )}
          <IconButton
            outline='none'
            variant='link'
            aria-label='next'
            fontSize='24px'
            icon={<MdSkipNext />}
          />
          <IconButton
            outline='none'
            variant='link'
            aria-label='repeat'
            fontSize='24px'
            icon={<MdOutlineRepeat />}
            color={repeat ? 'white' : 'gray.600'}
            onClick={() => setRepeat((prev) => !prev)}
          />
        </ButtonGroup>
      </Center>
      <Box color='gray.600'>
        <Flex justify='center' align='center'>
          <Box width='10%'>
            <Text fontSize='xs'>1:21</Text>
          </Box>
          <Box width='80%'>
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={321}
              id='player-range'
            >
              <RangeSliderTrack bg='gray.800'>
                <RangeSliderFilledTrack bg='gray.500' />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width='10%'>
            <Text fontSize='xs' textAlign='right'>321</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
