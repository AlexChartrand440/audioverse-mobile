import recordingFragment from './fragments/recording'

export default
`query trendingRecordings {
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
