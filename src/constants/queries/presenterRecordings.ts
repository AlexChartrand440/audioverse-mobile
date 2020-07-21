import recordingFragment from './fragments/recording';

export default `query presenterRecordings($language: Language!, $presenterId: ID, $afterCursor: String) {
  recordings(
    language: $language
    presenterId: $presenterId
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
`;
