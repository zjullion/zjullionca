const commonExtends = [
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:import/recommended',
  'plugin:import/typescript',
  'plugin:typescript-sort-keys/recommended',
]

const commonPlugins = [
  '@typescript-eslint/eslint-plugin',
  'eslint-plugin-import',
  'only-warn',
  'prefer-arrow',
  'simple-import-sort',
  'sort-destructure-keys',
  'typescript-sort-keys',
]

const commonRules = {
  '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
  '@typescript-eslint/strict-boolean-expressions': [
    'warn',
    {
      allowAny: false,
      allowNullableBoolean: true,
      allowNullableEnum: false,
      allowNullableNumber: false,
      allowNullableObject: false,
      allowNullableString: false,
      allowNumber: false,
      allowString: false,
    },
  ],
  'arrow-parens': 'warn',
  'comma-dangle': ['warn', 'always-multiline'],
  'default-case-last': 'warn',
  eqeqeq: [
    'warn',
    'always',
    {
      null: 'never',
    },
  ],
  'implicit-arrow-linebreak': 'warn',
  'import/newline-after-import': 'warn',
  'import/no-unresolved': 'off',
  'max-len': ['warn', { code: 120, tabWidth: 2 }],
  'no-else-return': 'warn',
  'no-unused-vars': ['warn', { ignoreRestSiblings: true }],
  'no-use-before-define': 'warn',
  'prefer-arrow/prefer-arrow-functions': 'warn',
  quotes: ['warn', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
  'simple-import-sort/exports': 'warn',
  'simple-import-sort/imports': 'warn',
  'sort-destructure-keys/sort-destructure-keys': 'warn',
  'sort-keys': [
    'warn',
    'asc',
    {
      allowLineSeparatedGroups: true,
      caseSensitive: true,
      natural: true,
    },
  ],
  'sort-vars': ['warn', { ignoreCase: true }],
}

const generateConfig = (directory, env) => ({
  env,
  files: [`${directory}/**/**.{ts,tsx}`],
  parserOptions: {
    project: `${directory}/tsconfig.json`,
  },
})

const backendDirs = ['createUser']
const backendOverrides = backendDirs.map((directory) => ({
  ...generateConfig(`backend/${directory}`, { browser: false, es6: true, node: true }),
}))

const frontendConfig = {
  ...generateConfig('frontend', { browser: true, es6: true, node: false }),

  //config:
  plugins: [
    ...commonPlugins,
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },

  //rules:
  extends: [...commonExtends, 'plugin:react/recommended'],
  rules: {
    ...commonRules,
    'react/jsx-sort-props': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
  },
}

// eslint-disable-next-line no-undef
module.exports = {
  //config:
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: commonPlugins,
  root: true,

  //rules:
  extends: commonExtends,
  rules: commonRules,

  overrides: [
    ...backendOverrides,
    frontendConfig,
    generateConfig('infrastructure', { browser: false, es6: true, node: true }),
  ],
}
