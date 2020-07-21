export default `mutation($playlistId: ID!, $recordingId: ID!) {
  playlistRecordingAdd(playlistId: $playlistId, recordingId: $recordingId)
}`;
