import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadStories } from '../../actions';
import List from '../../components/list';
import { getStories, getStoriesPagination } from '../../reducers/selectors';
import { AppState } from '../../store';

interface Item {
	[key: string]: any;
}

const mapStateToProps = (state: AppState, props: NavigationInjectedProps) => ({
	items: getStories(state),
	pagination: getStoriesPagination(state),
	avatarExtractor: (item: Item) => item.logoImage.url,
	subtitleExtractor: () => '',
	onPress: (item: Item) =>
		props.navigation.navigate({
			routeName: 'Story',
			params: {
				url: item.id,
				title: item.title,
			},
		}),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			loadData: loadStories,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
