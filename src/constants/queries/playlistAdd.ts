export default `mutation($title: String!, $language: Language!, $isPublic: Boolean!) {
  playlistAdd(
    input: { title: $title, language: $language, isPublic: $isPublic }
  ) {
    id
    isPublic
    language
    title
  }
}`;
