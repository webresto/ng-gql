module.exports = {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: false,
    arrowParens: 'avoid',
    overrides: [
        {
            files: '*.js',
            options: {
                parser: 'babel',
            },
        },
        {
            files: '*.ts',
            options: {
                parser: 'typescript',
            },
        },
        {
            files: '*.md',
            options: {
                parser: 'markdown',
            },
        },
        {
            files: '*.json',
            options: {
                parser: 'json',
            },
        },
        {
            files: '.prettierrc',
            options: {
                parser: 'json',
            },
        },
        {
            files: '.stylelintrc',
            options: {
                parser: 'json',
            },
        },
        {
            files: '*.scss',
            options: {
                parser: 'scss',
            },
        },
        {
            files: '*.html',
            options: {
                parser: 'html',
            },
        },
        {
            files: '*.template.html',
            options: {
                parser: 'angular',
            },
        },
        {
            files: '*.component.html',
            options: {
                parser: 'angular',
            },
        }
    ],
};
