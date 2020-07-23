export default `mutation(
  $givenName: String
  $socialId: String!
  $socialName: UserSocialServiceName!
  $socialToken: String!
  $surname: String
) {
  loginSocial(
    input: {
      givenName: $givenName
      socialId: $socialId
      socialName: $socialName
      socialToken: $socialToken
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
