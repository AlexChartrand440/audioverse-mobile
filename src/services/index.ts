import { GRAPHQL_URL } from 'react-native-dotenv';

import { UserState } from '../store/user/types';

/**
 * Fetches an arbitrary URL and returns the result
 * @param {string} endpoint
 */
export const fetchData = async (endpoint: string) => {
	const response: { [key: string]: any } = await fetch(endpoint, {
		method: 'GET',
	});
	if (response.status === 401) {
		throw new Error(response.status);
	}
	const contentType = response.headers.get('content-type');
	return contentType && contentType.indexOf('application/json') !== -1 ? response.json() : response.text();
};

export const fetchGraphQLData = (
	query: string,
	variables: { [key: string]: any },
	keyMapper: (results: any) => any,
	user?: UserState
): Promise<{ result: any; nextAfterCursor: string | undefined }> => {
	console.log('GraphQL variables:', variables, query);
	const headers: any = {
		'Content-Type': 'application/json',
	};
	if (user) {
		headers['x-av-session'] = user.sessionToken;
	}
	return fetch(GRAPHQL_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({ query, variables }),
	})
		.then((response) => response.json())
		.then((json) => {
			if (json.errors) {
				console.log('GraphQL errors', json.errors);
			}
			const results = keyMapper(json.data);
			return {
				result: results.nodes,
				nextAfterCursor: results.pageInfo?.hasNextPage ? results.pageInfo?.endCursor : undefined,
			};
		});
};
