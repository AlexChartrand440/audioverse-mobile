import React from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Track } from 'react-native-track-player'
import Swiper from 'react-native-swiper'
import MarqueeText from 'react-native-marquee'
import { NavigationInjectedProps } from 'react-navigation'

import I18n from '../../../locales'
import { ContentTypes } from '../../constants'
import AVLogo from '../../../assets/av-logo.png'
import Slide from './Slide'

interface Item {
  [key: string]: any
}

interface Props extends NavigationInjectedProps {
  data: Track
  language: string
}

const getSlides = (data: Track) => {

  const slides: Item[] = []

  // description
	if (data.description) {
    slides.push({
      type: 'description',
      description: data.description
    })
	}

  // presenter
  const presenter = {
    type: 'presenter',
    image: data.artwork,
    title: data.artist,
    subtitle: '',
    route: '',
    params: {},
  }

  if ( data.contentType === ContentTypes.sermon && data.presenters && data.presenters.length === 1 ) {
    presenter.route = 'Presenter'
    presenter.params = {
      url: data.presenters[0].recordingsURI,
      title: data.artist,
      description: data.presenters[0].description,
      image: data.presenters[0].photo.url
    }
  }

  slides.push(presenter)
	
	// conference
  // don't show conference for books/stories
  const {collection} = data;
	if (data.contentType != ContentTypes.book && collection) {
    const image = collection.logoImage ? collection.logoImage.url : AVLogo
		slides.push({
      type: 'conference',
      image: image,
      title: collection.title,
      route: 'Conference',
      params: {
        url: collection.recordingsURI,
        title: collection.title
      }
    })
	}
	
  // series
  const {sequence} = data;
	if (sequence) {
		const image = sequence.logoImage ? sequence.logoImage.url : AVLogo
		slides.push({
      type: 'serie',
      image: image,
      title: sequence.title,
      route: 'Serie',
      params: {
        url: sequence.recordingsURI,
        title: sequence.title
      }
    })
	}
	
	return slides
}

const PlayerContent: React.FC<Props> = ({ data, language, navigation }) => {

  const slides = getSlides(data)
  const recordingDate = (!data.recordingDate || data.recordingDate == '0000-00-00 00:00:00') ? '' : I18n.t('Recorded', {locale: language}) + ' ' + data.recordingDate
  let sponsor: {[key: string]: any} = {}
  if (data.sponsor) {
    sponsor = {...data.sponsor}
    sponsor.image = sponsor.logoImage ? sponsor.logoImage.url : AVLogo
  }

  const handleOnPressSponsor = () => {
    navigation.navigate({ routeName: 'Sponsor', params: { url: sponsor.id, title: sponsor.title } })
  }

  const handleOnPressSlide = (slide: Item) => {
    if (slide.route) {
      navigation.navigate({ routeName: slide.route, params: slide.params })
    }
  }

  return (
    <View style={styles.container}>
      {sponsor.image && (
        <View style={styles.content}>
          <TouchableOpacity style={styles.metadata} onPress={handleOnPressSponsor}>
            <Image
              source={sponsor.image.toString().startsWith('http') ? {uri: sponsor.image} : sponsor.image}
              style={styles.image}
            />
            <View style={styles.info}>
              <MarqueeText marqueeOnStart duration={3500} loop style={styles.title}>{sponsor.title}</MarqueeText>
              <Text style={styles.subtitle} ellipsizeMode={'tail'} numberOfLines={1}>{recordingDate}</Text>
              <Text style={styles.subtitle} ellipsizeMode={'tail'} numberOfLines={1}>{sponsor.location}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Swiper
        activeDotColor="#FFF"
        removeClippedSubviews={false}
        loop={false}>
        {slides.map(slide => {
          if (slide.type === 'description') {
            return (
              <ScrollView style={styles.descriptionContainer} contentContainerStyle={styles.descriptionContentContainer} key={slide.type}>
                <Text style={styles.descriptionTitle}>{I18n.t('Description', {locale: language})}</Text>
                <Text style={styles.description}>{slide.description}</Text>
              </ScrollView>
            )
          } else {
            return <Slide
              key={slide.type}
              image={slide.image}
              header={slide.title}
              subtitle={slide.subtitle}
              onPress={() => { handleOnPressSlide(slide) }} />
          }
        })}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  descriptionContainer: {
    padding: 20,
    marginBottom: 50
  },
  descriptionContentContainer: {
    flexGrow: 1,
    justifyContent : 'center'
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  description: {
    fontSize: 18,
    textAlign: 'center'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#CCCCCC50',
    padding: 10,
    borderRadius: 10
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  info: {
    flex: 1,
    paddingHorizontal: 10
  },
  title: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500'
  },
  subtitle: {
    color: '#212121',
    fontSize: 14,
    fontWeight: '300'
  },
})

export default PlayerContent
