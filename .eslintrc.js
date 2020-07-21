module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'import',
		'react',
		'react-native',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'prettier',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
		'prettier/react',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	rules: {
		'sort-imports': [
			'error',
			{
				ignoreDeclarationSort: true,
				ignoreCase: true,
			},
		],
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
			},
		],
		'@typescript-eslint/ban-types': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'react/display-name': 'off',
		'react/prop-types': 'off', // BUG: https://github.com/yannickcr/eslint-plugin-react/issues/2719
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
		react: {
			version: 'detect',
		},
	},
};

