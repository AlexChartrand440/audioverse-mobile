import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadTagsAlbums } from '../../../actions';
import List from '../../../components/list';
import { getTagsAlbums, getTagsAlbumsPagination } from '../../../reducers/selectors';
import { AppState } from '../../../store';

interface Item {
	[key: string]: any;
}

const mapStateToProps = (state: AppState, props: NavigationInjectedProps) => ({
	items: getTagsAlbums(state),
	pagination: getTagsAlbumsPagination(state),
	subtitleExtractor: () => '',
	avatarExtractor: (item: Item) => item.logoImage.url,
	onPress: (item: Item) =>
		props.navigation.navigate({
			routeName: 'TagAlbum',
			params: {
				url: item.id,
				title: item.title,
			},
		}),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			loadData: loadTagsAlbums,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
