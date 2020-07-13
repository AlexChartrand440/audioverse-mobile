import recordingFragment from './fragments/recording'

export default
`query sponsorRecordings($language: Language!, $sponsorId: ID, $afterCursor: String) {
  recordings(
    language: $language
    sponsorId: $sponsorId
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
