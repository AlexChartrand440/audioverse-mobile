import { print } from 'graphql';

import audiobible from './audiobible.graphql';
import audiobibleChapters from './audiobibleChapters.graphql';
import audiobibleChapterText from './audiobibleChapterText.graphql';
import audiobookRecordings from './audiobookRecordings.graphql';
import audiobooks from './audiobooks.graphql';
import blogPost from './blogPost.graphql';
import collectionRecordings from './collectionRecordings.graphql';
import conferences from './conferences.graphql';
import favoriteRecording from './favoriteRecording.graphql';
import featuredBlogPosts from './featuredBlogPosts.graphql';
import featuredRecordings from './featuredRecordings.graphql';
import login from './login.graphql';
import loginSocial from './loginSocial.graphql';
import musicAlbumRecordings from './musicAlbumRecordings.graphql';
import musicAlbums from './musicAlbums.graphql';
import musicBookTags from './musicBookTags.graphql';
import musicMoodTags from './musicMoodTags.graphql';
import musicTagRecordings from './musicTagRecordings.graphql';
import musicTracks from './musicTracks.graphql';
import newRecordings from './newRecordings.graphql';
import playlistAdd from './playlistAdd.graphql';
import playlistDelete from './playlistDelete.graphql';
import playlistRecordingAdd from './playlistRecordingAdd.graphql';
import playlistRecordingRemove from './playlistRecordingRemove.graphql';
import presenterRecordings from './presenterRecordings.graphql';
import presenters from './presenters.graphql';
import recording from './recording.graphql';
import recordingTranscript from './recordingTranscript.graphql';
import search from './search.graphql';
import sequenceRecordings from './sequenceRecordings.graphql';
import serieses from './serieses.graphql';
import signup from './signup.graphql';
import sponsorRecordings from './sponsorRecordings.graphql';
import sponsors from './sponsors.graphql';
import sponsorsWithMusic from './sponsorsWithMusic.graphql';
import stories from './stories.graphql';
import storySeasons from './storySeasons.graphql';
import tagRecordings from './tagRecordings.graphql';
import trendingRecordings from './trendingRecordings.graphql';
import unfavoriteRecording from './unfavoriteRecording.graphql';
import userFavoriteRecordings from './userFavoriteRecordings.graphql';
import userPlaylistItems from './userPlaylistItems.graphql';
import userPlaylists from './userPlaylists.graphql';

/**
 * Changes to the .graphql files will not be picked up by babel-plugin-import-graphql until
 * the server is restarted (`npm start`) again.
 */

export default {
	audiobible: print(audiobible),
	audiobibleChapters: print(audiobibleChapters),
	audiobibleChapterText: print(audiobibleChapterText),
	audiobookRecordings: print(audiobookRecordings),
	audiobooks: print(audiobooks),
	blogPost: print(blogPost),
	conferences: print(conferences),
	collectionRecordings: print(collectionRecordings),
	favoriteRecording: print(favoriteRecording),
	featuredBlogPosts: print(featuredBlogPosts),
	featuredRecordings: print(featuredRecordings),
	login: print(login),
	loginSocial: print(loginSocial),
	musicAlbumRecordings: print(musicAlbumRecordings),
	musicAlbums: print(musicAlbums),
	musicBookTags: print(musicBookTags),
	musicMoodTags: print(musicMoodTags),
	musicTagRecordings: print(musicTagRecordings),
	musicTracks: print(musicTracks),
	newRecordings: print(newRecordings),
	playlistAdd: print(playlistAdd),
	playlistDelete: print(playlistDelete),
	playlistRecordingAdd: print(playlistRecordingAdd),
	playlistRecordingRemove: print(playlistRecordingRemove),
	presenters: print(presenters),
	presenterRecordings: print(presenterRecordings),
	recording: print(recording),
	search: print(search),
	sequenceRecordings: print(sequenceRecordings),
	recordingTranscript: print(recordingTranscript),
	serieses: print(serieses),
	signup: print(signup),
	sponsors: print(sponsors),
	sponsorRecordings: print(sponsorRecordings),
	sponsorsWithMusic: print(sponsorsWithMusic),
	stories: print(stories),
	storySeasons: print(storySeasons),
	tagRecordings: print(tagRecordings),
	trendingRecordings: print(trendingRecordings),
	unfavoriteRecording: print(unfavoriteRecording),
	userFavoriteRecordings: print(userFavoriteRecordings),
	userPlaylists: print(userPlaylists),
	userPlaylistItems: print(userPlaylistItems),
};
