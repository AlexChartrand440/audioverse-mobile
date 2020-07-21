export default `fragment recordingFragment on Recording {
  id
  title
  contentType
  description
  duration
  recordingDate
  shareUrl
  collection {
    id
    title
    logoImage {
      url(size: 256)
    }
  }
  attachments {
    filename
    url
  }
  mediaFiles {
    bitrate
    duration
    filename
    filesize
    downloadURL: url
  }
  videoFiles {
    container
    filename
    filesize
    downloadURL: url
    height
    width
    logUrl
  }
  presenters {
    id
    name
    description
    photo {
      url(size: 256)
    }
  }
  sequence {
    id
    title
    logoImage {
      url(size: 256)
    }
  }
  sponsor {
    id
    title
    location
    logoImage {
      url(size: 256)
    }
  }
}`;
