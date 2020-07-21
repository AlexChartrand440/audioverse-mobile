import recordingFragment from './fragments/recording';

export default `query recording($id: ID!) {
  recording(
    id: $id) {
      ...recordingFragment
  }
}
${recordingFragment}
`;
