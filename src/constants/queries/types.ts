/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

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

export type Collection = Node & {
  __typename?: 'Collection';
  contentType: CollectionContentType;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  logoImage?: Maybe<Image>;
  logoImageWithFallback: Image;
  recordings: RecordingConnection;
  sequence: SequenceConnection;
  sponsor?: Maybe<Sponsor>;
  title: Scalars['String'];
};


export type CollectionRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RecordingsOrder>>;
  presenterId?: Maybe<Scalars['ID']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type CollectionSequenceArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
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

export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  cursor: Scalars['String'];
  node: Collection;
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

export type MediaFile = Node & {
  __typename?: 'MediaFile';
  bitrate: Scalars['Int'];
  duration: Scalars['Float'];
  filename: Scalars['String'];
  /** In bytes */
  filesize: Scalars['String'];
  id: Scalars['ID'];
  recording: Recording;
  url: Scalars['URL'];
};

export type Mutation = {
  __typename?: 'Mutation';
  favoriteRecording: Scalars['Boolean'];
  login: AuthenticatedUserPayload;
  loginSocial: AuthenticatedUserPayload;
  playlistAdd: UserPlaylist;
  playlistDelete: Scalars['Boolean'];
  playlistRecordingAdd: Scalars['Boolean'];
  playlistRecordingRemove: Scalars['Boolean'];
  playlistUpdate: UserPlaylist;
  signup: AuthenticatedUserPayload;
  unfavoriteRecording: Scalars['Boolean'];
  updateMyProfile: AuthenticatedUserPayload;
};


export type MutationFavoriteRecordingArgs = {
  id: Scalars['ID'];
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


export type MutationSignupArgs = {
  input: UserSignupInput;
};


export type MutationUnfavoriteRecordingArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateMyProfileArgs = {
  input: UserUpdateProfileInput;
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
  description: Scalars['String'];
  givenName: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  photo?: Maybe<Image>;
  photoWithFallback: Image;
  recordings: RecordingConnection;
  summary: Scalars['String'];
  surname: Scalars['String'];
};


export type PersonRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
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
  collection?: Maybe<Collection>;
  collections: CollectionConnection;
  /** Alias for `collection(id: ID)` */
  conference?: Maybe<Collection>;
  conferences: CollectionConnection;
  featuredBlogPosts: BlogPostConnection;
  featuredRecordings: RecordingConnection;
  me?: Maybe<AuthenticatedUser>;
  /** Alias for `sequence(id: ID)` */
  musicAlbum?: Maybe<Sequence>;
  musicAlbums: SequenceConnection;
  musicBookTags: TagConnection;
  musicMoodTags: TagConnection;
  /** Alias for `recording(id: ID)` */
  musicTrack?: Maybe<Recording>;
  musicTracks: RecordingConnection;
  person?: Maybe<Person>;
  popularRecordings: PopularRecordingConnection;
  presenters: PersonConnection;
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
};


export type QueryAudiobibleArgs = {
  id: Scalars['ID'];
};


export type QueryAudiobiblesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


export type QueryAudiobookArgs = {
  id: Scalars['ID'];
};


export type QueryAudiobooksArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
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
  language: Language;
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
  language: Language;
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


export type QueryCollectionArgs = {
  id: Scalars['ID'];
};


export type QueryCollectionsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
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
  language: Language;
  orderBy?: Maybe<Array<CollectionsOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};


export type QueryFeaturedBlogPostsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
};


export type QueryFeaturedRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  contentType?: Maybe<RecordingContentType>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
  presenterId?: Maybe<Scalars['ID']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type QueryMusicAlbumArgs = {
  id: Scalars['ID'];
};


export type QueryMusicAlbumsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
  orderBy?: Maybe<Array<SequenceOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};


export type QueryMusicBookTagsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
};


export type QueryMusicMoodTagsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
};


export type QueryMusicTrackArgs = {
  id: Scalars['ID'];
};


export type QueryMusicTracksArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
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


export type QueryPopularRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  contentType?: Maybe<RecordingContentType>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
  presenterId?: Maybe<Scalars['ID']>;
  sequenceId?: Maybe<Scalars['ID']>;
  sponsorId?: Maybe<Scalars['ID']>;
  tagName?: Maybe<Scalars['String']>;
};


export type QueryPresentersArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
  orderBy?: Maybe<Array<PersonsOrder>>;
  search?: Maybe<Scalars['String']>;
};


export type QueryRecordingArgs = {
  id: Scalars['ID'];
};


export type QueryRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
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
  language: Language;
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
  language: Language;
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
  language: Language;
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
  language: Language;
  orderBy?: Maybe<Array<SponsorsOrder>>;
  search?: Maybe<Scalars['String']>;
  withMusic?: Maybe<Scalars['Boolean']>;
};


export type QueryStoriesArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  language: Language;
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
  language: Language;
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
  language: Language;
  orderBy?: Maybe<Array<SequenceOrder>>;
  search?: Maybe<Scalars['String']>;
  sponsorId?: Maybe<Scalars['ID']>;
};

export type Recording = Node & {
  __typename?: 'Recording';
  attachments: Array<Attachment>;
  canonicalUrl: Scalars['URL'];
  collection?: Maybe<Collection>;
  contentType: RecordingContentType;
  copyrightYear?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  downloadDisabled: Scalars['Boolean'];
  duration: Scalars['Float'];
  id: Scalars['ID'];
  mediaFiles: Array<MediaFile>;
  presenters: Array<Person>;
  recordingDate?: Maybe<Scalars['Date']>;
  sequence?: Maybe<Sequence>;
  shareUrl?: Maybe<Scalars['URL']>;
  sponsor?: Maybe<Sponsor>;
  title: Scalars['String'];
  transcript?: Maybe<Transcript>;
  videoFiles: Array<VideoFile>;
  viewerHasFavorited: Scalars['Boolean'];
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
  Title = 'TITLE'
}

export type Sequence = Node & {
  __typename?: 'Sequence';
  collection?: Maybe<Collection>;
  contentType: SequenceContentType;
  description: Scalars['String'];
  id: Scalars['ID'];
  logoImage?: Maybe<Image>;
  logoImageWithFallback: Image;
  recordings: RecordingConnection;
  sponsor?: Maybe<Sponsor>;
  summary: Scalars['String'];
  title: Scalars['String'];
};


export type SequenceRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RecordingsOrder>>;
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

export type SequenceEdge = {
  __typename?: 'SequenceEdge';
  cursor: Scalars['String'];
  node: Sequence;
};

export type SequenceOrder = {
  direction: OrderByDirection;
  field: SequenceSortableField;
};

/** Properties by which sequence connections can be ordered. */
export enum SequenceSortableField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Title = 'TITLE'
}

export type Sponsor = Node & {
  __typename?: 'Sponsor';
  collections: CollectionConnection;
  description: Scalars['String'];
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  logoImage?: Maybe<Image>;
  logoImageWithFallback: Image;
  recordings: RecordingConnection;
  sequences: SequenceConnection;
  title: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};


export type SponsorCollectionsArgs = {
  after?: Maybe<Scalars['String']>;
  contentType?: Maybe<CollectionContentType>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CollectionsOrder>>;
  search?: Maybe<Scalars['String']>;
};


export type SponsorRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  contentType?: Maybe<RecordingContentType>;
  first?: Maybe<Scalars['Int']>;
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

export type SponsorEdge = {
  __typename?: 'SponsorEdge';
  cursor: Scalars['String'];
  node: Sponsor;
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

export type Transcript = Node & {
  __typename?: 'Transcript';
  id: Scalars['ID'];
  text: Scalars['String'];
};


export type User = Node & {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  favoriteRecordings: RecordingConnection;
  givenName: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  playlist?: Maybe<UserPlaylist>;
  playlists: UserPlaylistConnection;
  surname: Scalars['String'];
};


export type UserFavoriteRecordingsArgs = {
  after?: Maybe<Scalars['String']>;
  collectionId?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
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
  orderBy?: Maybe<Array<UserPlaylistsOrder>>;
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

export type UserUpdateProfileInput = {
  email: Scalars['String'];
  givenName: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  surname: Scalars['String'];
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
  logUrl?: Maybe<Scalars['URL']>;
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
  & { collection?: Maybe<(
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
    { __typename?: 'MediaFile' }
    & Pick<MediaFile, 'bitrate' | 'duration' | 'filename' | 'filesize'>
    & { downloadURL: MediaFile['url'] }
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
