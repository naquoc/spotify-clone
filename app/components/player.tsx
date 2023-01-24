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
import { FC, useEffect, useRef, useState } from 'react'
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md'

import { useStoreActions } from 'easy-peasy'
import { formatTime } from '../lib/formatter'

const Player: FC<any> = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true)
  const [index, setIndex] = useState(songs.findIndex((s) => s.id === activeSong.id))
  const [seek, setSeek] = useState(0.0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const soundRef = useRef(null)
  const repeatRef = useRef(repeat)
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)

  useEffect(() => {
    let timerId: any
    if (playing && !isSeeking) {
      const f = () => {
        if (soundRef.current) {
          setSeek(soundRef.current.seek())
          timerId = requestAnimationFrame(f)
        }
      }
      timerId = requestAnimationFrame(f)
      return () => cancelAnimationFrame(timerId)
    }

    cancelAnimationFrame(timerId)

  }, [playing, isSeeking])

  useEffect(() => {
    setActiveSong(songs[index])
  }, [index, songs, setActiveSong])

  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])

  const prevSong = () => {
    setIndex((state: any) => {
      return state ? state - 1 : songs.length - 1
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

  const onEnd = () => {
    if (repeatRef.current) {
      if (soundRef.current) {
        setSeek(0)
        soundRef.current.seek(0)
      }
    } else {
      nextSong()
    }
  }

  const onLoad = () => {
    if (soundRef.current) {
      const songDuration = soundRef.current.duration()
      setDuration(songDuration)
    }
  }

  const onSeek = (e: any) => {
    if (soundRef.current) {
      setSeek(parseFloat(e[0]))
      soundRef.current.seek(e[0])
    }
  }

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
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
            onClick={prevSong}
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
            onClick={nextSong}
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
            <Text fontSize='xs'>{formatTime(seek)}</Text>
          </Box>
          <Box width='80%'>
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              id='player-range'
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg='gray.800'>
                <RangeSliderFilledTrack bg='gray.500' />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width='10%'>
            <Text fontSize='xs' textAlign='right'>{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
