import { StyleSheet } from 'react-native'
import image from '../../assets/default.png'

export const primaryColor = '#E53935'

export const GlobalStyles = StyleSheet.create({
  header: {
    backgroundColor: primaryColor,
    elevation: 0,
    borderBottomWidth: 0,
    shadowOpacity: 0,
  },
  tab: {
    backgroundColor: primaryColor
  },
  tabIndicator: {
    backgroundColor: '#FFFFFF'
  }
})

export const headerTintColor = '#FFFFFF'
export const defaultImage = image

const htmlTextStyle = {
  fontSize: 18,
  textAlign: 'center',
}
export const HTMLStyles =  {
  p: {
    ...htmlTextStyle,
    marginBottom: 20,
  },
  div: htmlTextStyle,
  li: {
    fontSize: 20,
  },
}
