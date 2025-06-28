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
      globals: {
        __dirname: 'readonly',
        require: 'readonly',
        document: 'readonly',
        $: 'readonly',
        console: 'readonly',
        module: 'readonly',
        fetch: 'readonly',
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
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // ignore unused function args with leading _
          varsIgnorePattern: '^_', // ignore unused variables with leading _
          caughtErrorsIgnorePattern: '^_', // ignore unused catch clause vars with leading _
        },
      ],
      '@typescript-eslint/consistent-type-assertions': 'error',
      //@TODO Update these later: 'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-console': ['off', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'unused-imports/no-unused-imports': 'error',
      'react/jsx-boolean-value': ['error', 'always'],
      'react/jsx-no-useless-fragment': 'warn',
      //@TODO update the jsx-no-bind to error later
      'react/jsx-no-bind': 'off',
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
