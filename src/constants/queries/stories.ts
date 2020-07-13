import recordingFragment from './fragments/recording'

export default
`query stories($language: Language!, $sequenceId: ID, $afterCursor: String) {
  stories(
    language: $language
    sequenceId: $sequenceId
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
