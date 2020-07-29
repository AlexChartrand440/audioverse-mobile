'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const gql = require('graphql-tag');

module.exports = {
	process(src) {
		const str = JSON.stringify(gql(src));
		return 'module.exports=' + str + ';module.exports.default=module.exports;';
	},
};
