import recordingFragment from './fragments/recording'

export default
`query userPlaylistItems($id: ID!) {
  me {
    user {
      playlist(id: $id) {
        title
        recordings {
          nodes {
            ...recordingFragment
          }
        }
      }
    }
  }
}
${recordingFragment}
`
