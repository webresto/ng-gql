module.exports = {
  root: true,
  plugins: ['rxjs', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@angular-eslint/all',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        createDefaultProgram: true,
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@angular-eslint/no-host-metadata-property': 'off',
        '@angular-eslint/use-injectable-provided-in': 'off',
        '@angular-eslint/use-component-view-encapsulation': 'off',
        '@angular-eslint/no-forward-ref': 'off',
        '@angular-eslint/no-output-native': 'off',
        '@angular-eslint/template/cyclomatic-complexity': 'off',
        '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
        '@angular-eslint/prefer-standalone-component': 'off',
        '@angular-eslint/sort-ngmodule-metadata-arrays': 'off',
        'no-var': 'error',
        'no-console': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array-simple',
          },
        ],
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: [
              // Index signature
              'signature',

              // Fields
              'private-static-field',
              'protected-static-field',
              'public-static-field',

              'private-instance-field',
              'protected-instance-field',
              'public-instance-field',

              'private-decorated-field',
              'protected-decorated-field',
              'public-decorated-field',

              'protected-abstract-field',
              'public-abstract-field',

              'private-constructor',
              'protected-constructor',
              'public-constructor',

              'public-decorated-method',
              'protected-decorated-method',
              'private-decorated-method',

              'public-instance-method',
              'protected-instance-method',
              'private-instance-method',

              'public-static-method',
              'protected-static-method',
              'private-static-method',

              'public-abstract-method',
              'protected-abstract-method',
            ],
          },
        ],
        quotes: [
          'error',
          'single',
          {
            avoidEscape: true,
          },
        ],
        'max-len': [
          'error',
          {
            code: 160,
            ignoreUrls: true,
            ignoreComments: true,
            ignorePattern: '^import |^export +(.*?)',
            ignoreRegExpLiterals: true,
          },
        ],
        'grouped-accessor-pairs': ['error', 'setBeforeGet'],
        'rxjs/no-async-subscribe': 'error',
        'rxjs/no-ignored-observable': 'error',
        'rxjs/no-nested-subscribe': 'error',
        'rxjs/no-unbound-methods': 'error',
        'rxjs/throw-error': 'error',
        'rxjs/no-subject-value': 'error',
        'rxjs/suffix-subjects': 'off',
        'rxjs/prefer-observer': 'error',
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        'max-len': 'off',
      },
    },
  ],
};
