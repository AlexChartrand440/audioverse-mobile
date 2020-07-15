import recordingFragment from './fragments/recording'

export default
`query userFavoriteRecordings {
  me {
    user {
      favoriteRecordings {
        nodes {
          ...recordingFragment
        }
      }
    }
  }
}
${recordingFragment}
`
