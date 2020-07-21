interface ContentType {
	sermon: string;
	story: string;
	book: string;
	scriptureSong: string;
	ad: string;
	bible: string;
}

const contentTypes: ContentType = {
	sermon: 'SERMON',
	story: 'STORY',
	book: 'AUDIOBOOK_TRACK',
	scriptureSong: 'MUSIC_TRACK',
	ad: '5',
	bible: 'bible',
};

export default contentTypes;
