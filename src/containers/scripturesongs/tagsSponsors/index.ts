import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadTagsSponsors } from '../../../actions';
import List from '../../../components/list';
import { getTagsSponsors, getTagsSponsorsPagination } from '../../../reducers/selectors';
import { AppState } from '../../../store';

interface Item {
	[key: string]: any;
}

const mapStateToProps = (state: AppState, props: NavigationInjectedProps) => ({
	items: getTagsSponsors(state),
	pagination: getTagsSponsorsPagination(state),
	subtitleExtractor: () => '',
	avatarExtractor: (item: Item) => item.logoImage.url,
	onPress: (item: Item) =>
		props.navigation.navigate({
			routeName: 'TagSponsor',
			params: {
				url: item.id,
				title: item.title,
			},
		}),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			loadData: loadTagsSponsors,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
