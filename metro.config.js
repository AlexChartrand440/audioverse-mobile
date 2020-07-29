/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
	const {
		resolver: { sourceExts },
	} = await getDefaultConfig();

	return {
		resolver: {
			sourceExts: [...sourceExts, 'graphql', 'gql'],
		},
		transformer: {
			getTransformOptions: async () => ({
				transform: {
					experimentalImportSupport: true,
					inlineRequires: true,
				},
			}),
			babelTransformerPath: require.resolve('@bam.tech/react-native-graphql-transformer'),
		},
	};
})();
