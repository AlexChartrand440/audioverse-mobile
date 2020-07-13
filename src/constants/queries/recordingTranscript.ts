export default
`query recordingTranscript($recordingId: ID!) {
  recording(id: $recordingId) {
    transcript {
      text
    }
  }
}
`
