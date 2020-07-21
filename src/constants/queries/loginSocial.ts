export default `mutation(
  $email: String!
  $givenName: String!
  $socialId: String!
  $socialName: String!
  $surname: String!
) {
  loginSocial(
    input: {
      email: $email
      givenName: $givenName
      socialId: $socialId
      socialName: $socialName
      surname: $surname
    }
  ) {
    authenticatedUser {
      user {
        id
      }
      sessionToken
    }
    errors {
      message
    }
  }
}
`;
