module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off', // Allow the "any" type
        'react/prop-types': 'off', // Disable prop-types validation
    },
    settings: {
        react: {
            version: 'detect', // Automatically detect React version
        },
    },
};