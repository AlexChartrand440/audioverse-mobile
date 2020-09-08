/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** A field whose value conforms to the standard URL format as specified in RF3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: string;
};

export type Aggregate = {
  __typename?: 'Aggregate';
  count: Scalars['Int'];
};

export type Attachment = Node & {
  __typename?: 'Attachment';
  filename: Scalars['String'];
  /** In bytes */
  filesize: Scalars['String'];
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  recording: Recording;
  url: Scalars['URL'];
};

export type AudioFile = Node & {
  __typename?: 'AudioFile';
  bitrate: Scalars['Int'];
  duration: Scalars['Float'];
  filename: Scalars['String'];
  /** In bytes */
  filesize: Scalars['String'];
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  recording: Recording;
  url: Scalars['URL'];
};

export type AuthenticatedUser = {
  __typename?: 'AuthenticatedUser';
  sessionToken: Scalars['String'];
  user: User;
};

export type AuthenticatedUserPayload = {
  __typename?: 'AuthenticatedUserPayload';
  authenticatedUser?: Maybe<AuthenticatedUser>;
  errors: Array<InputValidationError>;
};

export type Bible = Node & {
  __typename?: 'Bible';
  book: BibleBook;
  books: Array<BibleBook>;
  id: Scalars['ID'];
  isDramatized: Scalars['Boolean'];
  title: Scalars['String'];
};


export type BibleBookArgs = {
  id: Scalars['ID'];
};

export type BibleBook = Node & {
  __typename?: 'BibleBook';
  chapter: BibleChapter;
  chapterCount: Scalars['Int'];
  chapters: Array<BibleChapter>;
  id: Scalars['ID'];
  isDramatized: Scalars['Boolean'];
  title: Scalars['String'];
};


export type BibleBookChapterArgs = {
  id: Scalars['ID'];
};

export type BibleChapter = Node & {
  __typename?: 'BibleChapter';
  id: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['URL'];
};

export type BibleConnection = {
  __typename?: 'BibleConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<BibleEdge>>;
  nodes?: Maybe<Array<Bible>>;
  pageInfo: PageInfo;
};

export type BibleEdge = {
  __typename?: 'BibleEdge';
  cursor: Scalars['String'];
  node: Bible;
};

export type BlogPost = Node & {
  __typename?: 'BlogPost';
  body: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Image>;
  title: Scalars['String'];
};

export type BlogPostConnection = {
  __typename?: 'BlogPostConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<BlogPostEdge>>;
  nodes?: Maybe<Array<BlogPost>>;
  pageInfo: PageInfo;
};

export type BlogPostEdge = {
  __typename?: 'BlogPostEdge';
  cursor: Scalars['String'];
  node: BlogPost;
};

export type BlogPostOrder = {
  direction: OrderByDirection;
  field: BlogPostSortableField;
};

/** Properties by which blog post connections can be ordered. */
export enum BlogPostSortableField {
  PublishedAt = 'PUBLISHED_AT'
}

export type Collection = Node & {
  __typename?: 'Collection';
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String'];
  /** The canonical URL to this resource. */
  canonicalUrl: Scalars['String'];
  contentType: CollectionContentType;
  description: Scalars['String'];
  endDate?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  imageWithFallback: Image;
  isHidden?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  /** @deprecated Collection.logoImage is replaced with Collection.image */
  logoImage?: Maybe<Image>;
  /** @deprecated Collection.logoImageWithFallback is replaced with Collection.imageWithFallback */
  logoImageWithFallback: Image;
  notes?: Maybe<Scalars['String']>;
  recordings: RecordingConnection;
  sequences: SequenceConnection;
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['String'];
  sponsor?: Maybe<Sponsor>;
  startDate?: Maybe<Scalars['Date']>;
  summary: Scalars['String'];
  title: Scalars['String'];
};


export type CollectionRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RecordingsOrder>>;
  presenterId?: Maybe<Scalars['ID']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type CollectionSequencesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SequenceOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};

export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<CollectionEdge>>;
  nodes?: Maybe<Array<Collection>>;
  pageInfo: PageInfo;
};

/** The available types of collections. */
export enum CollectionContentType {
  AudiobookSeries = 'AUDIOBOOK_SERIES',
  Conference = 'CONFERENCE',
  StoryProgram = 'STORY_PROGRAM'
}

export type CollectionCreateInput = {
  contentType: CollectionContentType;
  description?: Maybe<Scalars['String']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  sponsorId: Scalars['ID'];
  summary?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  cursor: Scalars['String'];
  node: Collection;
};

export type CollectionPayload = {
  __typename?: 'CollectionPayload';
  collection?: Maybe<Collection>;
  errors: Array<InputValidationError>;
};

export type CollectionsOrder = {
  direction: OrderByDirection;
  field: CollectionsSortableField;
};

/** Properties by which collection connections can be ordered. */
export enum CollectionsSortableField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Title = 'TITLE'
}

export type CollectionUpdateInput = {
  description?: Maybe<Scalars['String']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
  summary?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};


export type Image = {
  __typename?: 'Image';
  url: Scalars['URL'];
};


export type ImageUrlArgs = {
  size: Scalars['Int'];
};

export type InputValidationError = {
  __typename?: 'InputValidationError';
  message: Scalars['String'];
};

export type InternalContact = {
  __typename?: 'InternalContact';
  address: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type InternalContactInput = {
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

/** Supported languages */
export enum Language {
  Chinese = 'CHINESE',
  English = 'ENGLISH',
  French = 'FRENCH',
  German = 'GERMAN',
  Japanese = 'JAPANESE',
  Russian = 'RUSSIAN',
  Spanish = 'SPANISH'
}

export type License = Node & {
  __typename?: 'License';
  description: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Image>;
  isHidden?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  permitsSales?: Maybe<Scalars['Boolean']>;
  summary: Scalars['String'];
  title: Scalars['String'];
};

export type LicenseConnection = {
  __typename?: 'LicenseConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<LicenseEdge>>;
  nodes?: Maybe<Array<License>>;
  pageInfo: PageInfo;
};

export type LicenseCreateInput = {
  description?: Maybe<Scalars['String']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  language: Language;
  notes?: Maybe<Scalars['String']>;
  permitsSales?: Maybe<Scalars['Boolean']>;
  summary?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type LicenseEdge = {
  __typename?: 'LicenseEdge';
  cursor: Scalars['String'];
  node: License;
};

export type LicensePayload = {
  __typename?: 'LicensePayload';
  errors: Array<InputValidationError>;
  license?: Maybe<License>;
};

export type LicensesOrder = {
  direction: OrderByDirection;
  field: LicensesSortableField;
};

/** Properties by which license connections can be ordered. */
export enum LicensesSortableField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Title = 'TITLE'
}

export type LicenseUpdateInput = {
  description?: Maybe<Scalars['String']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  permitsSales?: Maybe<Scalars['Boolean']>;
  summary?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** The media file container types. */
export enum MediaFileContainer {
  Doc = 'DOC',
  Docx = 'DOCX',
  Flv = 'FLV',
  Jpg = 'JPG',
  Key = 'KEY',
  M3U8Ios = 'M3U8_IOS',
  M3U8Web = 'M3U8_WEB',
  M4A = 'M4A',
  M4V = 'M4V',
  Mov = 'MOV',
  Mp3 = 'MP3',
  Mp4 = 'MP4',
  Odp = 'ODP',
  Odt = 'ODT',
  Pages = 'PAGES',
  Pdf = 'PDF',
  Png = 'PNG',
  Ppt = 'PPT',
  Pptx = 'PPTX',
  Wav = 'WAV',
  Wma = 'WMA',
  Wmv = 'WMV'
}

export type Mutation = {
  __typename?: 'Mutation';
  collectionCreate: CollectionPayload;
  collectionDelete: SuccessPayload;
  collectionUpdate: CollectionPayload;
  favoriteRecording: Scalars['Boolean'];
  licenseCreate: LicensePayload;
  licenseDelete: SuccessPayload;
  licenseUpdate: LicensePayload;
  login: AuthenticatedUserPayload;
  loginSocial: AuthenticatedUserPayload;
  playlistAdd: UserPlaylist;
  playlistDelete: Scalars['Boolean'];
  playlistRecordingAdd: Scalars['Boolean'];
  playlistRecordingRemove: Scalars['Boolean'];
  playlistUpdate: UserPlaylist;
  sequenceCreate: SequencePayload;
  sequenceDelete: SuccessPayload;
  sequenceUpdate: SequencePayload;
  signup: AuthenticatedUserPayload;
  sponsorCreate: SponsorPayload;
  sponsorDelete: SuccessPayload;
  sponsorUpdate: SponsorPayload;
  unfavoriteRecording: Scalars['Boolean'];
  updateMyProfile: AuthenticatedUserPayload;
  userCreate: UserPayload;
  userDelete: SuccessPayload;
  /** Sends a reset password email to the user, as the first step in the reset password process. */
  userRecover: SuccessPayload;
  /** Resets a user's password with a token received from `userRecover`. */
  userReset: SuccessPayload;
  userUpdate: UserPayload;
};


export type MutationCollectionCreateArgs = {
  input: CollectionCreateInput;
};


export type MutationCollectionDeleteArgs = {
  collectionId: Scalars['ID'];
};


export type MutationCollectionUpdateArgs = {
  collectionId: Scalars['ID'];
  input: CollectionUpdateInput;
};


export type MutationFavoriteRecordingArgs = {
  id: Scalars['ID'];
};


export type MutationLicenseCreateArgs = {
  input: LicenseCreateInput;
};


export type MutationLicenseDeleteArgs = {
  licenseId: Scalars['ID'];
};


export type MutationLicenseUpdateArgs = {
  input: LicenseUpdateInput;
  licenseId: Scalars['ID'];
};


export type MutationLoginArgs = {
  input: UserLoginInput;
};


export type MutationLoginSocialArgs = {
  input: UserLoginSocialInput;
};


export type MutationPlaylistAddArgs = {
  input: UserPlaylistAddInput;
};


export type MutationPlaylistDeleteArgs = {
  playlistId: Scalars['ID'];
};


export type MutationPlaylistRecordingAddArgs = {
  playlistId: Scalars['ID'];
  recordingId: Scalars['ID'];
};


export type MutationPlaylistRecordingRemoveArgs = {
  playlistId: Scalars['ID'];
  recordingId: Scalars['ID'];
};


export type MutationPlaylistUpdateArgs = {
  input: UserPlaylistUpdateInput;
  playlistId: Scalars['ID'];
};


export type MutationSequenceCreateArgs = {
  input: SequenceCreateInput;
};


export type MutationSequenceDeleteArgs = {
  sequenceId: Scalars['ID'];
};


export type MutationSequenceUpdateArgs = {
  input: SequenceUpdateInput;
  sequenceId: Scalars['ID'];
};


export type MutationSignupArgs = {
  input: UserSignupInput;
};


export type MutationSponsorCreateArgs = {
  input: SponsorCreateInput;
};


export type MutationSponsorDeleteArgs = {
  sponsorId: Scalars['ID'];
};


export type MutationSponsorUpdateArgs = {
  input: SponsorUpdateInput;
  sponsorId: Scalars['ID'];
};


export type MutationUnfavoriteRecordingArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateMyProfileArgs = {
  input: UserUpdateInput;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserDeleteArgs = {
  userId: Scalars['ID'];
};


export type MutationUserRecoverArgs = {
  email: Scalars['String'];
};


export type MutationUserResetArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUserUpdateArgs = {
  input: UserUpdateInput;
  userId: Scalars['ID'];
};

export type Node = {
  id: Scalars['ID'];
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Person = Node & {
  __typename?: 'Person';
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String'];
  /** The canonical URL to this resource. */
  canonicalUrl: Scalars['String'];
  description: Scalars['String'];
  givenName: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Image>;
  imageWithFallback: Image;
  name: Scalars['String'];
  /** @deprecated Person.photo is replaced with Person.image */
  photo?: Maybe<Image>;
  /** @deprecated Person.photoWithFallback is replaced with Person.imageWithFallback */
  photoWithFallback: Image;
  recordings: RecordingConnection;
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['String'];
  summary: Scalars['String'];
  surname: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};


export type PersonRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RecordingsOrder>>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};

export type PersonConnection = {
  __typename?: 'PersonConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<PersonEdge>>;
  nodes?: Maybe<Array<Person>>;
  pageInfo: PageInfo;
};

export type PersonEdge = {
  __typename?: 'PersonEdge';
  cursor: Scalars['String'];
  node: Person;
};

export type PersonsOrder = {
  direction: OrderByDirection;
  field: PersonsSortableField;
};

/** The roles a Person can hold. */
export enum PersonsRoleField {
  Speaker = 'SPEAKER',
  Writer = 'WRITER'
}

/** Properties by which person connections can be ordered. */
export enum PersonsSortableField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Name = 'NAME'
}

export type PopularRecording = {
  __typename?: 'PopularRecording';
  recording: Recording;
  weight: Scalars['Float'];
};

export type PopularRecordingConnection = {
  __typename?: 'PopularRecordingConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<PopularRecordingEdge>>;
  nodes?: Maybe<Array<PopularRecording>>;
  pageInfo: PageInfo;
};

export type PopularRecordingEdge = {
  __typename?: 'PopularRecordingEdge';
  cursor: Scalars['String'];
  node: PopularRecording;
};

export type Query = {
  __typename?: 'Query';
  audiobible?: Maybe<Bible>;
  audiobibles: BibleConnection;
  /** Alias for `sequence(id: ID)` */
  audiobook?: Maybe<Sequence>;
  audiobooks: SequenceConnection;
  /** Alias for `collection(id: ID)` */
  audiobookSeries?: Maybe<Collection>;
  audiobookSerieses: CollectionConnection;
  /** Alias for `recording(id: ID)` */
  audiobookTrack?: Maybe<Recording>;
  audiobookTracks: RecordingConnection;
  blogPost?: Maybe<BlogPost>;
  blogPosts: BlogPostConnection;
  collection?: Maybe<Collection>;
  collections: CollectionConnection;
  /** Alias for `collection(id: ID)` */
  conference?: Maybe<Collection>;
  conferences: CollectionConnection;
  featuredBlogPosts: BlogPostConnection;
  featuredRecordings: RecordingConnection;
  license?: Maybe<License>;
  licenses: LicenseConnection;
  me?: Maybe<AuthenticatedUser>;
  /** Alias for `sequence(id: ID)` */
  musicAlbum?: Maybe<Sequence>;
  musicAlbums: SequenceConnection;
  /** @deprecated Query.musicBookTags will be replaced with a scriptural reference type. */
  musicBookTags: TagConnection;
  musicMoodTags: TagConnection;
  /** Alias for `recording(id: ID)` */
  musicTrack?: Maybe<Recording>;
  musicTracks: RecordingConnection;
  person?: Maybe<Person>;
  persons: PersonConnection;
  popularRecordings: PopularRecordingConnection;
  recording?: Maybe<Recording>;
  recordings: RecordingConnection;
  sequence?: Maybe<Sequence>;
  sequences: SequenceConnection;
  /** Alias for `sequence(id: ID)` */
  series?: Maybe<Sequence>;
  /** Series is both a singular and plural form. `series` returns a single sequence. `serieses` is an archaic plural form of series used here to avoid `seriess` or some other ugly solution. */
  serieses: SequenceConnection;
  /** Alias for `recording(id: ID)` */
  sermon?: Maybe<Recording>;
  sermons: RecordingConnection;
  sponsor?: Maybe<Sponsor>;
  sponsors: SponsorConnection;
  stories: RecordingConnection;
  /** Alias for `recording(id: ID)` */
  story?: Maybe<Recording>;
  /** Alias for `collection(id: ID)` */
  storyProgram?: Maybe<Collection>;
  storyPrograms: CollectionConnection;
  /** Alias for `sequence(id: ID)` */
  storySeason?: Maybe<Sequence>;
  storySeasons: SequenceConnection;
  testimonies: TestimonyConnection;
  user?: Maybe<User>;
  users: UserConnection;
};


export type QueryAudiobibleArgs = {
  id: Scalars['ID'];
};


export type QueryAudiobiblesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAudiobookArgs = {
  id: Scalars['ID'];
};


export type QueryAudiobooksArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SequenceOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};


export type QueryAudiobookSeriesArgs = {
  id: Scalars['ID'];
};


export type QueryAudiobookSeriesesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CollectionsOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};


export type QueryAudiobookTrackArgs = {
  id: Scalars['ID'];
};


export type QueryAudiobookTracksArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RecordingsOrder>>;
  presenterId?: Maybe<Scalars['ID']>;
  search?: Maybe<Scalars['String']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type QueryBlogPostArgs = {
  id: Scalars['ID'];
};


export type QueryBlogPostsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BlogPostOrder>>;
};


export type QueryCollectionArgs = {
  id: Scalars['ID'];
};


export type QueryCollectionsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CollectionsOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};


export type QueryConferenceArgs = {
  id: Scalars['ID'];
};


export type QueryConferencesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CollectionsOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};


export type QueryFeaturedBlogPostsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryFeaturedRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  contentType?: Maybe<RecordingContentType>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  presenterId?: Maybe<Scalars['ID']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type QueryLicenseArgs = {
  id: Scalars['ID'];
};


export type QueryLicensesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<LicensesOrder>>;
  search?: Maybe<Scalars['String']>;
};


export type QueryMusicAlbumArgs = {
  id: Scalars['ID'];
};


export type QueryMusicAlbumsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SequenceOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};


export type QueryMusicBookTagsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryMusicMoodTagsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryMusicTrackArgs = {
  id: Scalars['ID'];
};


export type QueryMusicTracksArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RecordingsOrder>>;
  presenterId?: Maybe<Scalars['ID']>;
  search?: Maybe<Scalars['String']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type QueryPersonArgs = {
  id: Scalars['ID'];
};


export type QueryPersonsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PersonsOrder>>;
  role?: Maybe<PersonsRoleField>;
  search?: Maybe<Scalars['String']>;
  withContentTypes?: Maybe<Array<RecordingContentType>>;
};


export type QueryPopularRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  contentType?: Maybe<RecordingContentType>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  presenterId?: Maybe<Scalars['ID']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type QueryRecordingArgs = {
  id: Scalars['ID'];
};


export type QueryRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RecordingsOrder>>;
  presenterId?: Maybe<Scalars['ID']>;
  search?: Maybe<Scalars['String']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type QuerySequenceArgs = {
  id: Scalars['ID'];
};


export type QuerySequencesArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SequenceOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};


export type QuerySeriesArgs = {
  id: Scalars['ID'];
};


export type QuerySeriesesArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SequenceOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};


export type QuerySermonArgs = {
  id: Scalars['ID'];
};


export type QuerySermonsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RecordingsOrder>>;
  presenterId?: Maybe<Scalars['ID']>;
  search?: Maybe<Scalars['String']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type QuerySponsorArgs = {
  id: Scalars['ID'];
};


export type QuerySponsorsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SponsorsOrder>>;
  search?: Maybe<Scalars['String']>;
  withMusic?: Maybe<Scalars['Boolean']>;
};


export type QueryStoriesArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RecordingsOrder>>;
  presenterId?: Maybe<Scalars['ID']>;
  search?: Maybe<Scalars['String']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type QueryStoryArgs = {
  id: Scalars['ID'];
};


export type QueryStoryProgramArgs = {
  id: Scalars['ID'];
};


export type QueryStoryProgramsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CollectionsOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};


export type QueryStorySeasonArgs = {
  id: Scalars['ID'];
};


export type QueryStorySeasonsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SequenceOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};


export type QueryTestimoniesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<TestimoniesOrder>>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UsersOrder>>;
  search?: Maybe<Scalars['String']>;
};

export type Recording = Node & {
  __typename?: 'Recording';
  attachments: Array<Attachment>;
  audioFiles: Array<AudioFile>;
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String'];
  canonicalUrl: Scalars['URL'];
  collection?: Maybe<Collection>;
  contentType: RecordingContentType;
  copyrightYear?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  downloadDisabled: Scalars['Boolean'];
  duration: Scalars['Float'];
  id: Scalars['ID'];
  imageWithFallback: Image;
  persons: Array<Person>;
  recordingDate?: Maybe<Scalars['Date']>;
  recordingTags: RecordingTagConnection;
  sequence?: Maybe<Sequence>;
  shareUrl?: Maybe<Scalars['URL']>;
  sponsor?: Maybe<Sponsor>;
  title: Scalars['String'];
  transcript?: Maybe<Transcript>;
  videoFiles: Array<VideoFile>;
  viewerHasFavorited: Scalars['Boolean'];
};


export type RecordingAttachmentsArgs = {
  allowedContainers?: Maybe<Array<MediaFileContainer>>;
};


export type RecordingAudioFilesArgs = {
  allowedContainers?: Maybe<Array<MediaFileContainer>>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
};


export type RecordingPersonsArgs = {
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  role?: Maybe<PersonsRoleField>;
};


export type RecordingRecordingTagsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RecordingVideoFilesArgs = {
  allowedContainers?: Maybe<Array<MediaFileContainer>>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
};

export type RecordingConnection = {
  __typename?: 'RecordingConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<RecordingEdge>>;
  nodes?: Maybe<Array<Recording>>;
  pageInfo: PageInfo;
};

/** The available types of recordings. */
export enum RecordingContentType {
  AudiobookTrack = 'AUDIOBOOK_TRACK',
  MusicTrack = 'MUSIC_TRACK',
  Sermon = 'SERMON',
  Story = 'STORY'
}

export type RecordingEdge = {
  __typename?: 'RecordingEdge';
  cursor: Scalars['String'];
  node: Recording;
};

export type RecordingsOrder = {
  direction: OrderByDirection;
  field: RecordingsSortableField;
};

/** Properties by which recording connections can be ordered. */
export enum RecordingsSortableField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  PublishedAt = 'PUBLISHED_AT',
  RecordedAt = 'RECORDED_AT',
  Title = 'TITLE'
}

export type RecordingTag = {
  __typename?: 'RecordingTag';
  tag: Tag;
};

export type RecordingTagConnection = {
  __typename?: 'RecordingTagConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<RecordingTagEdge>>;
  nodes?: Maybe<Array<RecordingTag>>;
  pageInfo: PageInfo;
};

export type RecordingTagEdge = {
  __typename?: 'RecordingTagEdge';
  cursor: Scalars['String'];
  node: RecordingTag;
};

export type Sequence = Node & {
  __typename?: 'Sequence';
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String'];
  /** The canonical URL to this resource. */
  canonicalUrl: Scalars['String'];
  collection?: Maybe<Collection>;
  contentType: SequenceContentType;
  description: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Image>;
  imageWithFallback: Image;
  isHidden?: Maybe<Scalars['Boolean']>;
  /** @deprecated Sequence.logoImage is replaced with Sequence.image */
  logoImage?: Maybe<Image>;
  /** @deprecated Sequence.logoImageWithFallback is replaced with Sequence.imageWithFallback */
  logoImageWithFallback: Image;
  notes?: Maybe<Scalars['String']>;
  recordings: RecordingConnection;
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['String'];
  sponsor?: Maybe<Sponsor>;
  summary: Scalars['String'];
  title: Scalars['String'];
};


export type SequenceRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  presenterId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};

export type SequenceConnection = {
  __typename?: 'SequenceConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<SequenceEdge>>;
  nodes?: Maybe<Array<Sequence>>;
  pageInfo: PageInfo;
};

/** The available types of sequence. */
export enum SequenceContentType {
  Audiobook = 'AUDIOBOOK',
  MusicAlbum = 'MUSIC_ALBUM',
  Series = 'SERIES',
  StorySeason = 'STORY_SEASON'
}

export type SequenceCreateInput = {
  collectionId?: Maybe<Scalars['ID']>;
  contentType: SequenceContentType;
  description?: Maybe<Scalars['String']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  sponsorId: Scalars['ID'];
  summary?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type SequenceEdge = {
  __typename?: 'SequenceEdge';
  cursor: Scalars['String'];
  node: Sequence;
};

export type SequenceOrder = {
  direction: OrderByDirection;
  field: SequenceSortableField;
};

export type SequencePayload = {
  __typename?: 'SequencePayload';
  errors: Array<InputValidationError>;
  sequence?: Maybe<Sequence>;
};

/** Properties by which sequence connections can be ordered. */
export enum SequenceSortableField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Title = 'TITLE'
}

export type SequenceUpdateInput = {
  collectionId?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
  summary?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Sponsor = Node & UniformResourceLocatable & {
  __typename?: 'Sponsor';
  address?: Maybe<Scalars['String']>;
  /** The canonical HTML path to this resource. */
  canonicalPath: Scalars['String'];
  /** The canonical URL to this resource. */
  canonicalUrl: Scalars['String'];
  collections: CollectionConnection;
  description: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  imageWithFallback: Image;
  internalContact?: Maybe<InternalContact>;
  isHidden: Scalars['Boolean'];
  location?: Maybe<Scalars['String']>;
  /** @deprecated Sponsor.logoImage is replaced with Sponsor.image */
  logoImage?: Maybe<Image>;
  /** @deprecated Sponsor.logoImageWithFallback is replaced with Sponsor.imageWithFallback */
  logoImageWithFallback: Image;
  notes?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  recordings: RecordingConnection;
  sequences: SequenceConnection;
  /** A shareable short URL to this resource. */
  shareUrl: Scalars['String'];
  summary: Scalars['String'];
  title: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};


export type SponsorCollectionsArgs = {
  after?: Maybe<Scalars['String']>;
  contentType?: Maybe<CollectionContentType>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CollectionsOrder>>;
  search?: Maybe<Scalars['String']>;
};


export type SponsorRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  contentType?: Maybe<RecordingContentType>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RecordingsOrder>>;
  presenterId?: Maybe<Scalars['ID']>;
  sequenceId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type SponsorSequencesArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  contentType?: Maybe<SequenceContentType>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SequenceOrder>>;
  search?: Maybe<Scalars['String']>;
};

export type SponsorConnection = {
  __typename?: 'SponsorConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<SponsorEdge>>;
  nodes?: Maybe<Array<Sponsor>>;
  pageInfo: PageInfo;
};

export type SponsorCreateInput = {
  address?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  internalContact?: Maybe<InternalContactInput>;
  isHidden?: Maybe<Scalars['Boolean']>;
  language: Language;
  location?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};

export type SponsorEdge = {
  __typename?: 'SponsorEdge';
  cursor: Scalars['String'];
  node: Sponsor;
};

export type SponsorPayload = {
  __typename?: 'SponsorPayload';
  errors: Array<InputValidationError>;
  sponsor?: Maybe<Sponsor>;
};

export type SponsorsOrder = {
  direction: OrderByDirection;
  field: SponsorsSortableField;
};

/** Properties by which sponsor connections can be ordered. */
export enum SponsorsSortableField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Title = 'TITLE'
}

export type SponsorUpdateInput = {
  address?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  internalContact?: Maybe<InternalContactInput>;
  isHidden?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type SuccessPayload = {
  __typename?: 'SuccessPayload';
  errors: Array<InputValidationError>;
  success: Scalars['Boolean'];
};

export type Tag = Node & {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type TagConnection = {
  __typename?: 'TagConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<TagEdge>>;
  nodes?: Maybe<Array<Tag>>;
  pageInfo: PageInfo;
};

export type TagEdge = {
  __typename?: 'TagEdge';
  cursor: Scalars['String'];
  node: Tag;
};

export type TestimoniesOrder = {
  direction: OrderByDirection;
  field: TestimoniesSortableField;
};

/** Properties by which testimony connections can be ordered. */
export enum TestimoniesSortableField {
  WrittenDate = 'WRITTEN_DATE'
}

export type Testimony = Node & {
  __typename?: 'Testimony';
  author: Scalars['String'];
  body: Scalars['String'];
  id: Scalars['ID'];
  writtenDate: Scalars['Date'];
};

export type TestimonyConnection = {
  __typename?: 'TestimonyConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<TestimonyEdge>>;
  nodes?: Maybe<Array<Testimony>>;
  pageInfo: PageInfo;
};

export type TestimonyEdge = {
  __typename?: 'TestimonyEdge';
  cursor: Scalars['String'];
  node: Testimony;
};

export type Transcript = Node & {
  __typename?: 'Transcript';
  id: Scalars['ID'];
  text: Scalars['String'];
};

/** Represents a type that can be retrieved by a URL. */
export type UniformResourceLocatable = {
  canonicalPath: Scalars['String'];
  canonicalUrl: Scalars['String'];
  shareUrl: Scalars['String'];
};


export type User = Node & {
  __typename?: 'User';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars['String']>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']>;
  /** The name of the country. */
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  /** The user's email address. */
  email: Scalars['String'];
  favoriteRecordings: RecordingConnection;
  /** The user's first name. */
  givenName: Scalars['String'];
  id: Scalars['ID'];
  /** Whether the user has permission to perform all administrative functions. */
  isSuperuser: Scalars['Boolean'];
  /** The user's preferred interface language. */
  language: Language;
  /** The full name of the user, based on the values for givenName and surname. */
  name: Scalars['String'];
  playlist?: Maybe<UserPlaylist>;
  playlists: UserPlaylistConnection;
  /** The postal or zip code. */
  postalCode?: Maybe<Scalars['String']>;
  /** The name of the region, such as the province, state, or district. */
  province?: Maybe<Scalars['String']>;
  /** The user's administrative roles. */
  roles: Array<UserRoles>;
  /** The user's last name. */
  surname: Scalars['String'];
};


export type UserFavoriteRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RecordingsOrder>>;
  presenterId?: Maybe<Scalars['ID']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type UserPlaylistArgs = {
  id: Scalars['ID'];
};


export type UserPlaylistsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserPlaylistsOrder>>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<UserEdge>>;
  nodes?: Maybe<Array<User>>;
  pageInfo: PageInfo;
};

export type UserCreateInput = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars['String']>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']>;
  /** The name of the country. */
  country?: Maybe<Scalars['String']>;
  /** The user's email address. */
  email: Scalars['String'];
  /** The user's first name. */
  givenName: Scalars['String'];
  /** Whether the user has permission to perform all administrative functions. */
  isSuperuser?: Maybe<Scalars['Boolean']>;
  /** The user's preferred interface language. */
  language?: Maybe<Language>;
  /** The user's password. */
  password?: Maybe<Scalars['String']>;
  /** The postal or zip code. */
  postalCode?: Maybe<Scalars['String']>;
  /** The name of the region, such as the province, state, or district. */
  province?: Maybe<Scalars['String']>;
  /** The user's administrative roles. */
  roles?: Maybe<Array<UserRoles>>;
  /** The user's last name. */
  surname: Scalars['String'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginSocialInput = {
  givenName?: Maybe<Scalars['String']>;
  socialId: Scalars['String'];
  socialName: UserSocialServiceName;
  socialToken: Scalars['String'];
  surname?: Maybe<Scalars['String']>;
};

export type UserPayload = {
  __typename?: 'UserPayload';
  errors: Array<InputValidationError>;
  user?: Maybe<User>;
};

export type UserPlaylist = Node & {
  __typename?: 'UserPlaylist';
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  language: Language;
  recordings: RecordingConnection;
  summary: Scalars['String'];
  title: Scalars['String'];
};


export type UserPlaylistRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  includeUnpublished?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  presenterId?: Maybe<Scalars['ID']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};

export type UserPlaylistAddInput = {
  isPublic: Scalars['Boolean'];
  language: Language;
  summary?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type UserPlaylistConnection = {
  __typename?: 'UserPlaylistConnection';
  aggregate?: Maybe<Aggregate>;
  edges?: Maybe<Array<UserPlaylistEdge>>;
  nodes?: Maybe<Array<UserPlaylist>>;
  pageInfo: PageInfo;
};

export type UserPlaylistEdge = {
  __typename?: 'UserPlaylistEdge';
  cursor: Scalars['String'];
  node: UserPlaylist;
};

export type UserPlaylistsOrder = {
  direction: OrderByDirection;
  field: UserPlaylistsSortableField;
};

/** Properties by which a user's playlists connection can be ordered. */
export enum UserPlaylistsSortableField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Title = 'TITLE'
}

export type UserPlaylistUpdateInput = {
  isPublic: Scalars['Boolean'];
  summary?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

/** The administrative roles a user may hold. */
export enum UserRoles {
  Administration = 'ADMINISTRATION',
  Catalog = 'CATALOG',
  Communcations = 'COMMUNCATIONS',
  Equipment = 'EQUIPMENT',
  Legal = 'LEGAL',
  Mediamanager = 'MEDIAMANAGER',
  Screening = 'SCREENING',
  Stats = 'STATS',
  Technical = 'TECHNICAL'
}

export type UserSignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/** The supported social login services. */
export enum UserSocialServiceName {
  Apple = 'APPLE',
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE'
}

export type UsersOrder = {
  direction: OrderByDirection;
  field: UsersSortableField;
};

/** Properties by which user connections can be ordered. */
export enum UsersSortableField {
  CreatedAt = 'CREATED_AT',
  Email = 'EMAIL',
  Id = 'ID'
}

export type UserUpdateInput = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars['String']>;
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']>;
  /** The name of the country. */
  country?: Maybe<Scalars['String']>;
  /** The user's email address. */
  email?: Maybe<Scalars['String']>;
  /** The user's first name. */
  givenName?: Maybe<Scalars['String']>;
  /** Whether the user has permission to perform all administrative functions. */
  isSuperuser?: Maybe<Scalars['Boolean']>;
  /** The user's preferred interface language. */
  language?: Maybe<Language>;
  /** The user's password. */
  password?: Maybe<Scalars['String']>;
  /** The postal or zip code. */
  postalCode?: Maybe<Scalars['String']>;
  /** The name of the region, such as the province, state, or district. */
  province?: Maybe<Scalars['String']>;
  /** The user's administrative roles. */
  roles?: Maybe<Array<UserRoles>>;
  /** The user's last name. */
  surname?: Maybe<Scalars['String']>;
};

export type VideoFile = Node & {
  __typename?: 'VideoFile';
  bitrate: Scalars['Int'];
  container: Scalars['String'];
  duration: Scalars['Float'];
  filename: Scalars['String'];
  /** In bytes */
  filesize: Scalars['String'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  /** The URL to record video views for analytics. */
  logUrl?: Maybe<Scalars['URL']>;
  mimeType: Scalars['String'];
  recording: Recording;
  url: Scalars['URL'];
  width: Scalars['Int'];
};

export type AudiobibleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AudiobibleQuery = (
  { __typename?: 'Query' }
  & { audiobible?: Maybe<(
    { __typename?: 'Bible' }
    & { books: Array<(
      { __typename?: 'BibleBook' }
      & Pick<BibleBook, 'id' | 'title'>
    )> }
  )> }
);

export type AudiobibleChapterTextQueryVariables = Exact<{
  id: Scalars['ID'];
  bookId: Scalars['ID'];
  chapterId: Scalars['ID'];
}>;


export type AudiobibleChapterTextQuery = (
  { __typename?: 'Query' }
  & { audiobible?: Maybe<(
    { __typename?: 'Bible' }
    & { book: (
      { __typename?: 'BibleBook' }
      & { chapter: (
        { __typename?: 'BibleChapter' }
        & Pick<BibleChapter, 'text'>
      ) }
    ) }
  )> }
);

export type AudiobibleChaptersQueryVariables = Exact<{
  id: Scalars['ID'];
  bookId: Scalars['ID'];
}>;


export type AudiobibleChaptersQuery = (
  { __typename?: 'Query' }
  & { audiobible?: Maybe<(
    { __typename?: 'Bible' }
    & { book: (
      { __typename?: 'BibleBook' }
      & { chapters: Array<(
        { __typename?: 'BibleChapter' }
        & Pick<BibleChapter, 'id' | 'title' | 'url'>
      )> }
    ) }
  )> }
);

export type AudiobookRecordingsQueryVariables = Exact<{
  language: Language;
  sequenceId?: Maybe<Scalars['ID']>;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type AudiobookRecordingsQuery = (
  { __typename?: 'Query' }
  & { recordings: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type RecordingFragmentFragment = (
  { __typename?: 'Recording' }
  & Pick<Recording, 'id' | 'title' | 'contentType' | 'description' | 'duration' | 'recordingDate' | 'shareUrl'>
  & { imageWithFallback: (
    { __typename?: 'Image' }
    & Pick<Image, 'url'>
  ), collection?: Maybe<(
    { __typename?: 'Collection' }
    & Pick<Collection, 'id' | 'title'>
    & { logoImage?: Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'url'>
    )> }
  )>, attachments: Array<(
    { __typename?: 'Attachment' }
    & Pick<Attachment, 'filename' | 'url'>
  )>, mediaFiles: Array<(
    { __typename?: 'AudioFile' }
    & Pick<AudioFile, 'bitrate' | 'duration' | 'filename' | 'filesize'>
    & { downloadURL: AudioFile['url'] }
  )>, videoFiles: Array<(
    { __typename?: 'VideoFile' }
    & Pick<VideoFile, 'container' | 'filename' | 'filesize' | 'height' | 'width' | 'logUrl'>
    & { downloadURL: VideoFile['url'] }
  )>, presenters: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'name' | 'description'>
    & { photo?: Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'url'>
    )> }
  )>, sequence?: Maybe<(
    { __typename?: 'Sequence' }
    & Pick<Sequence, 'id' | 'title'>
    & { logoImage?: Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'url'>
    )> }
  )>, sponsor?: Maybe<(
    { __typename?: 'Sponsor' }
    & Pick<Sponsor, 'id' | 'title' | 'location'>
    & { logoImage: (
      { __typename?: 'Image' }
      & Pick<Image, 'url'>
    ) }
  )> }
);

export type AudiobooksQueryVariables = Exact<{
  language: Language;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type AudiobooksQuery = (
  { __typename?: 'Query' }
  & { audiobooks: (
    { __typename?: 'SequenceConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Sequence' }
      & Pick<Sequence, 'id' | 'title'>
      & { logoImage: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ) }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type BlogPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BlogPostQuery = (
  { __typename?: 'Query' }
  & { blogPost?: Maybe<(
    { __typename?: 'BlogPost' }
    & Pick<BlogPost, 'id' | 'title' | 'body'>
    & { image?: Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'url'>
    )> }
  )> }
);

export type CollectionRecordingsQueryVariables = Exact<{
  language: Language;
  collectionId?: Maybe<Scalars['ID']>;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type CollectionRecordingsQuery = (
  { __typename?: 'Query' }
  & { recordings: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type ConferenceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ConferenceQuery = (
  { __typename?: 'Query' }
  & { conference?: Maybe<(
    { __typename?: 'Collection' }
    & Pick<Collection, 'id' | 'title'>
    & { logoImage: (
      { __typename?: 'Image' }
      & Pick<Image, 'url'>
    ) }
  )> }
);

export type ConferencesQueryVariables = Exact<{
  language: Language;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type ConferencesQuery = (
  { __typename?: 'Query' }
  & { conferences: (
    { __typename?: 'CollectionConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Collection' }
      & Pick<Collection, 'id' | 'title'>
      & { logoImage: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ) }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type Unnamed_1_MutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type Unnamed_1_Mutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'favoriteRecording'>
);

export type FeaturedBlogPostsQueryVariables = Exact<{
  language: Language;
}>;


export type FeaturedBlogPostsQuery = (
  { __typename?: 'Query' }
  & { featuredBlogPosts: (
    { __typename?: 'BlogPostConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'BlogPost' }
      & Pick<BlogPost, 'id' | 'title'>
      & { image?: Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      )> }
    )>> }
  ) }
);

export type FeaturedRecordingsQueryVariables = Exact<{
  language: Language;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type FeaturedRecordingsQuery = (
  { __typename?: 'Query' }
  & { featuredRecordings: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type Unnamed_2_MutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type Unnamed_2_Mutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthenticatedUserPayload' }
    & { authenticatedUser?: Maybe<(
      { __typename?: 'AuthenticatedUser' }
      & Pick<AuthenticatedUser, 'sessionToken'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ) }
    )>, errors: Array<(
      { __typename?: 'InputValidationError' }
      & Pick<InputValidationError, 'message'>
    )> }
  ) }
);

export type Unnamed_3_MutationVariables = Exact<{
  givenName?: Maybe<Scalars['String']>;
  socialId: Scalars['String'];
  socialName: UserSocialServiceName;
  socialToken: Scalars['String'];
  surname?: Maybe<Scalars['String']>;
}>;


export type Unnamed_3_Mutation = (
  { __typename?: 'Mutation' }
  & { loginSocial: (
    { __typename?: 'AuthenticatedUserPayload' }
    & { authenticatedUser?: Maybe<(
      { __typename?: 'AuthenticatedUser' }
      & Pick<AuthenticatedUser, 'sessionToken'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ) }
    )>, errors: Array<(
      { __typename?: 'InputValidationError' }
      & Pick<InputValidationError, 'message'>
    )> }
  ) }
);

export type MusicAlbumRecordingsQueryVariables = Exact<{
  language: Language;
  sequenceId?: Maybe<Scalars['ID']>;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type MusicAlbumRecordingsQuery = (
  { __typename?: 'Query' }
  & { recordings: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type MusicAlbumsQueryVariables = Exact<{
  language: Language;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type MusicAlbumsQuery = (
  { __typename?: 'Query' }
  & { musicAlbums: (
    { __typename?: 'SequenceConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Sequence' }
      & Pick<Sequence, 'id' | 'title'>
      & { logoImage: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ) }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type MusicBookTagsQueryVariables = Exact<{
  language: Language;
}>;


export type MusicBookTagsQuery = (
  { __typename?: 'Query' }
  & { musicBookTags: (
    { __typename?: 'TagConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name'>
    )>> }
  ) }
);

export type MusicMoodTagsQueryVariables = Exact<{
  language: Language;
}>;


export type MusicMoodTagsQuery = (
  { __typename?: 'Query' }
  & { musicMoodTags: (
    { __typename?: 'TagConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name'>
    )>> }
  ) }
);

export type MusicTagRecordingsQueryVariables = Exact<{
  language: Language;
  tagName?: Maybe<Scalars['String']>;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type MusicTagRecordingsQuery = (
  { __typename?: 'Query' }
  & { musicTracks: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type MusicTracksQueryVariables = Exact<{
  language: Language;
  sponsorId?: Maybe<Scalars['ID']>;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type MusicTracksQuery = (
  { __typename?: 'Query' }
  & { musicTracks: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type NewRecordingsQueryVariables = Exact<{
  language: Language;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type NewRecordingsQuery = (
  { __typename?: 'Query' }
  & { sermons: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type Unnamed_4_MutationVariables = Exact<{
  title: Scalars['String'];
  language: Language;
  isPublic: Scalars['Boolean'];
}>;


export type Unnamed_4_Mutation = (
  { __typename?: 'Mutation' }
  & { playlistAdd: (
    { __typename?: 'UserPlaylist' }
    & Pick<UserPlaylist, 'id' | 'isPublic' | 'language' | 'title'>
  ) }
);

export type Unnamed_5_MutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type Unnamed_5_Mutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'playlistDelete'>
);

export type Unnamed_6_MutationVariables = Exact<{
  playlistId: Scalars['ID'];
  recordingId: Scalars['ID'];
}>;


export type Unnamed_6_Mutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'playlistRecordingAdd'>
);

export type Unnamed_7_MutationVariables = Exact<{
  playlistId: Scalars['ID'];
  recordingId: Scalars['ID'];
}>;


export type Unnamed_7_Mutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'playlistRecordingRemove'>
);

export type PresenterRecordingsQueryVariables = Exact<{
  language: Language;
  presenterId?: Maybe<Scalars['ID']>;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type PresenterRecordingsQuery = (
  { __typename?: 'Query' }
  & { recordings: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type PresentersQueryVariables = Exact<{
  language: Language;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type PresentersQuery = (
  { __typename?: 'Query' }
  & { presenters: (
    { __typename?: 'PersonConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'name' | 'description'>
      & { photo86: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ), photo256?: Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      )> }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type RecordingQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RecordingQuery = (
  { __typename?: 'Query' }
  & { recording?: Maybe<(
    { __typename?: 'Recording' }
    & RecordingFragmentFragment
  )> }
);

export type RecordingTranscriptQueryVariables = Exact<{
  recordingId: Scalars['ID'];
}>;


export type RecordingTranscriptQuery = (
  { __typename?: 'Query' }
  & { recording?: Maybe<(
    { __typename?: 'Recording' }
    & { transcript?: Maybe<(
      { __typename?: 'Transcript' }
      & Pick<Transcript, 'text'>
    )> }
  )> }
);

export type SearchQueryVariables = Exact<{
  language: Language;
  term: Scalars['String'];
}>;


export type SearchQuery = (
  { __typename?: 'Query' }
  & { conferences: (
    { __typename?: 'CollectionConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Collection' }
      & Pick<Collection, 'id' | 'title'>
      & { logoImage: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ) }
    )>> }
  ), presenters: (
    { __typename?: 'PersonConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'name' | 'description'>
      & { photoWithFallback: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ), photo?: Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      )> }
    )>> }
  ), sermons: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>> }
  ), serieses: (
    { __typename?: 'SequenceConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Sequence' }
      & Pick<Sequence, 'id' | 'title'>
      & { logoImage: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ) }
    )>> }
  ), sponsors: (
    { __typename?: 'SponsorConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Sponsor' }
      & Pick<Sponsor, 'id' | 'title'>
      & { logoImage: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ) }
    )>> }
  ) }
);

export type SequenceRecordingsQueryVariables = Exact<{
  language: Language;
  sequenceId?: Maybe<Scalars['ID']>;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type SequenceRecordingsQuery = (
  { __typename?: 'Query' }
  & { recordings: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type SeriesesQueryVariables = Exact<{
  language: Language;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type SeriesesQuery = (
  { __typename?: 'Query' }
  & { serieses: (
    { __typename?: 'SequenceConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Sequence' }
      & Pick<Sequence, 'id' | 'title' | 'description'>
      & { logoImage: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ), logoImage256?: Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      )> }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type Unnamed_8_MutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type Unnamed_8_Mutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'AuthenticatedUserPayload' }
    & { authenticatedUser?: Maybe<(
      { __typename?: 'AuthenticatedUser' }
      & Pick<AuthenticatedUser, 'sessionToken'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ) }
    )>, errors: Array<(
      { __typename?: 'InputValidationError' }
      & Pick<InputValidationError, 'message'>
    )> }
  ) }
);

export type SponsorRecordingsQueryVariables = Exact<{
  language: Language;
  sponsorId?: Maybe<Scalars['ID']>;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type SponsorRecordingsQuery = (
  { __typename?: 'Query' }
  & { recordings: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type SponsorsQueryVariables = Exact<{
  language: Language;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type SponsorsQuery = (
  { __typename?: 'Query' }
  & { sponsors: (
    { __typename?: 'SponsorConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Sponsor' }
      & Pick<Sponsor, 'id' | 'title' | 'description'>
      & { photo86: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ), logoImage256?: Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      )> }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type SponsorsWithMusicQueryVariables = Exact<{
  language: Language;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type SponsorsWithMusicQuery = (
  { __typename?: 'Query' }
  & { sponsors: (
    { __typename?: 'SponsorConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Sponsor' }
      & Pick<Sponsor, 'id' | 'title'>
      & { logoImage: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ) }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type StoriesQueryVariables = Exact<{
  language: Language;
  sequenceId?: Maybe<Scalars['ID']>;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type StoriesQuery = (
  { __typename?: 'Query' }
  & { stories: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type StorySeasonsQueryVariables = Exact<{
  language: Language;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type StorySeasonsQuery = (
  { __typename?: 'Query' }
  & { storySeasons: (
    { __typename?: 'SequenceConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Sequence' }
      & Pick<Sequence, 'id' | 'title'>
      & { logoImage: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ) }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type TagRecordingsQueryVariables = Exact<{
  language: Language;
  tagName?: Maybe<Scalars['String']>;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type TagRecordingsQuery = (
  { __typename?: 'Query' }
  & { recordings: (
    { __typename?: 'RecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'Recording' }
      & RecordingFragmentFragment
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type TrendingRecordingsQueryVariables = Exact<{
  language: Language;
  afterCursor?: Maybe<Scalars['String']>;
}>;


export type TrendingRecordingsQuery = (
  { __typename?: 'Query' }
  & { popularRecordings: (
    { __typename?: 'PopularRecordingConnection' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'PopularRecording' }
      & { recording: (
        { __typename?: 'Recording' }
        & RecordingFragmentFragment
      ) }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'endCursor'>
    ) }
  ) }
);

export type Unnamed_9_MutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type Unnamed_9_Mutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unfavoriteRecording'>
);

export type UserFavoriteRecordingsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserFavoriteRecordingsQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'AuthenticatedUser' }
    & { user: (
      { __typename?: 'User' }
      & { favoriteRecordings: (
        { __typename?: 'RecordingConnection' }
        & { nodes?: Maybe<Array<(
          { __typename?: 'Recording' }
          & RecordingFragmentFragment
        )>> }
      ) }
    ) }
  )> }
);

export type UserPlaylistItemsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserPlaylistItemsQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'AuthenticatedUser' }
    & { user: (
      { __typename?: 'User' }
      & { playlist?: Maybe<(
        { __typename?: 'UserPlaylist' }
        & Pick<UserPlaylist, 'title'>
        & { recordings: (
          { __typename?: 'RecordingConnection' }
          & { nodes?: Maybe<Array<(
            { __typename?: 'Recording' }
            & RecordingFragmentFragment
          )>> }
        ) }
      )> }
    ) }
  )> }
);

export type UserPlaylistsQueryVariables = Exact<{
  language: Language;
}>;


export type UserPlaylistsQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'AuthenticatedUser' }
    & { user: (
      { __typename?: 'User' }
      & { playlists: (
        { __typename?: 'UserPlaylistConnection' }
        & { nodes?: Maybe<Array<(
          { __typename?: 'UserPlaylist' }
          & Pick<UserPlaylist, 'id' | 'title'>
        )>> }
      ) }
    ) }
  )> }
);
