import recordingFragment from './fragments/recording'

export default
`query tagRecordings(
  $language: Language!
  $tagName: String
  $afterCursor: String
) {
  recordings(
    language: $language
    tagName: $tagName
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
