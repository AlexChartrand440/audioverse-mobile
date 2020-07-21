import recordingFragment from './fragments/recording';

export default `query featuredRecordings($language: Language!, $afterCursor: String) {
  featuredRecordings(
    language: $language
    first: 25
    after: $afterCursor
    contentType: SERMON
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
