import recordingFragment from './fragments/recording'

export default
`query musicTagRecordings($language: Language!, $tagName: String, $afterCursor: String) {
  musicTracks(
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
