import React, {
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Track } from 'react-native-track-player'
import { NavigationInjectedProps } from 'react-navigation'

import I18n from '../../../locales'
import { resetAndPlayTrack } from '../../actions'
import { ContentTypes, Queries } from '../../constants'
import {LANGUAGE_MAP} from '../../sagas/api'
import { fetchGraphQLData } from '../../services'
import { parseRecording } from '../../utils'

import Entry from './Entry'
import InViewPort from './InViewPort'
import { itemWidth, sliderWidth } from './SliderEntry'
import SliderEntry from './SliderEntry'

interface Item {
  [key: string]: any
}

interface Props extends NavigationInjectedProps {
  history: Track[]
  actions: {
    resetAndPlayTrack: typeof resetAndPlayTrack
  }
  language: keyof typeof LANGUAGE_MAP
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  scrollview: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: '#9E9E9E',
  },
  listTitle: {
    color: '#1A1917',
    fontSize: 26,
    marginLeft: 10,
    marginVertical: 10,
    letterSpacing: 0.5,
  },
})

const Discover: React.FC<Props> = ({ navigation, history, actions, language }) => {

  const [sliderActiveSlide, setSliderActiveSlide] = useState(0)
  const [posts, setPosts] = useState([])
  const [wasStoriesVisible, setWasStoriesVisible] = useState(false)
  const [stories, setStories] = useState<[]>([])
  const [wasSongsVisible, setWasSongsVisible] = useState(false)
  const [songs, setSongs] = useState<[]>([])
  const sliderRef: any = useRef(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const { result } = await fetchGraphQLData(Queries.featuredBlogPosts, { language: LANGUAGE_MAP[language] }, (results) => results.featuredBlogPosts)
      if (result.length) {
        setPosts(
          result
        )
      }
    }

    fetchPosts()
  }, [])

  const loadStories = async (isVisible: boolean) => {
    if (!wasStoriesVisible && isVisible) {
      setWasStoriesVisible(true)
      const { result } = await fetchGraphQLData( Queries.stories, { language: LANGUAGE_MAP[language] }, (results) => results.stories)
      if (result.length) {
        setStories(result.map((el: any) => parseRecording(el)))
      }
    }
  }

  const loadSongs = async (isVisible: boolean) => {
    if (!wasSongsVisible && isVisible) {
      setWasSongsVisible(true)
      const { result } = await fetchGraphQLData( Queries.musicTagRecordings, { language: LANGUAGE_MAP[language] }, (results) => results.musicTracks)
      if (result.length) {
        setSongs(result.map((el: any) => parseRecording(el)))
      }
    }
  }

  const renderList = (data: Track[], title: string) => {
    if (!data.length) return null
    return (
      <View style={styles.listContainer}>
        <Text
          numberOfLines={1}
          style={styles.listTitle}>
          {I18n.t(title)}
        </Text>
        <FlatList
          horizontal={true}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  const renderItem: ListRenderItem<Item> = ({ item }) => {
    const artwork = typeof item.artwork === 'string' || item.contentType === ContentTypes.sermon
      ? (typeof item.artwork === 'string' ? { uri: item.artwork } : item.artwork) : 0
    const text = artwork ? '' : item.title.split('-')
    const data = {
      title: item.title,
      illustration: artwork,
      illustrationText: text.length > 1 ? text[1].trim() : item.title,
    }

    return (
      <Entry
        data={data}
        onPress={() => actions.resetAndPlayTrack([item])} />
    )
  }

  const renderItemWithParallax: ListRenderItem<Item> = ({ item }) => {
    const data = {
      illustration: {
        uri: item.image.url
      }
    }
    return (
      <SliderEntry
        data={data}
        onPress={() => navigation.navigate({ routeName: 'Post', params: {url: item.id} })}
      />
    )
  }

  return (
    <View style={styles.container}>
        <ScrollView
          style={styles.scrollview}
          scrollEventThrottle={200}
          directionalLockEnabled={true}>
          <Carousel
            ref={sliderRef}
            data={posts}
            renderItem={renderItemWithParallax}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            inactiveSlideShift={20}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            loop={true}
            loopClonesPerSide={2}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => setSliderActiveSlide(index) }
          />
          <Pagination
            dotsLength={posts.length}
            activeDotIndex={sliderActiveSlide}
            containerStyle={styles.paginationContainer}
            dotColor={'rgba(255, 255, 255, 0.92)'}
            dotStyle={styles.paginationDot}
            inactiveDotColor="#1a1917"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={sliderRef.current}
            tappableDots={!!sliderRef}
          />
          {renderList([...history].reverse(), 'history')}
          <InViewPort
            disabled={!navigation.isFocused() || wasStoriesVisible}
            onChange={loadStories}>
            {renderList(stories, 'stories')}
          </InViewPort>
          <InViewPort
            disabled={!navigation.isFocused() || wasSongsVisible}
            onChange={loadSongs}>
            {renderList(songs, 'Scripture_Songs')}
          </InViewPort>
        </ScrollView>
    </View>
  )

}

export default Discover
