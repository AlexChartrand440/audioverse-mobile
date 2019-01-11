import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Image } from 'react-native'

const ImageButton = ({ onPress, style, imageStyle, accessibilityLabel, ...props }) => (
  <TouchableOpacity
    onPress={onPress}
    style={style}
    accessible={true}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="button">
    <Image {...props} style={imageStyle} />
  </TouchableOpacity>
)

ImageButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.any,
  imageStyle: PropTypes.any
}

export default ImageButton
