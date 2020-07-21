import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadTagsBooks } from '../../../actions';
import List from '../../../components/list';
import { getTagsBooks, getTagsBooksPagination } from '../../../reducers/selectors';
import { AppState } from '../../../store';

interface Item {
	[key: string]: any;
}

const mapStateToProps = (state: AppState, props: NavigationInjectedProps) => ({
	items: getTagsBooks(state),
	pagination: getTagsBooksPagination(state),
	titleExtractor: (item: Item) => item.name,
	subtitleExtractor: () => '',
	onPress: (item: Item) =>
		props.navigation.navigate({
			routeName: 'TagBook',
			params: {
				url: item.name,
				title: item.name,
			},
		}),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			loadData: loadTagsBooks,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
