import recordingFragment from './fragments/recording'

// TODO: use popularRecordings after MySQL Index has been added

export default
`query trendingRecordings($language: Language!, $afterCursor: String) {
  featuredRecordings(
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
