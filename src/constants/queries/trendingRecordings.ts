import recordingFragment from './fragments/recording'

export default
`query trendingRecordings($language: Language!, $afterCursor: String) {
  popularRecordings(
    language: $language
    first: 25
    after: $afterCursor
    contentType: SERMON
  ) {
    nodes {
      recording {
        ...recordingFragment
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
${recordingFragment}
`
