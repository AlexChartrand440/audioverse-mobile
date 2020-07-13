import recordingFragment from './fragments/recording'

export default
`query newRecordings($language: Language!, $afterCursor: String) {
  sermons(
    language: $language
    first: 25
    after: $afterCursor
    orderBy: [{ field: CREATED_AT, direction: DESC }]
  ) {
    nodes {
      ...recordingFragment
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
${recordingFragment}
`
