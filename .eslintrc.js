module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@angular-eslint/all',
        'prettier',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@angular-eslint/no-host-metadata-property': 'off',
        '@angular-eslint/use-injectable-provided-in': 'off',
        '@angular-eslint/use-component-view-encapsulation': 'off',
        '@angular-eslint/no-forward-ref': 'off',
        '@angular-eslint/no-output-native': 'off',
        '@angular-eslint/template/cyclomatic-complexity': 'off',
        '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
        '@angular-eslint/sort-ngmodule-metadata-arrays': 'off',
        'no-var': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        '@angular-eslint/prefer-standalone-component': ['disable'],
        quotes: [
          'error',
          'single',
          {
            avoidEscape: true,
          },
        ],
        'grouped-accessor-pairs': ['error', 'setBeforeGet'],
      },
    },
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility',
      ],
      rules: {
        'max-len': 'off',
      },
    },
  ],
};
