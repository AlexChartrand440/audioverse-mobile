module.exports = {
	printWidth: 120,
	singleQuote: true,
	useTabs: true,
	tabWidth: 2,
	semi: true,
	bracketSpacing: true,
	jsxBracketSameLine: true,
	overrides: [
		{
			files: ".prettierrc",
			options: { parser: "json" }
		}
	]
}
