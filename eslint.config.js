import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser,
            parserOptions: {
                project: ['./tsconfig.app.json'],
                sourceType: 'module',
                ecmaVersion: 'latest',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            react,
            'react-hooks': reactHooks,
            prettier,
            'unused-imports': unusedImports,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/consistent-type-assertions': 'error',
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-var': 'error',
            'unused-imports/no-unused-imports': 'error',
            'react/jsx-boolean-value': ['error', 'always'],
            'react/jsx-no-useless-fragment': 'warn',
            'react/jsx-no-bind': 'error',
            'prettier/prettier': 'error'
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    }
];
