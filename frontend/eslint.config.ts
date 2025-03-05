import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importx from 'eslint-plugin-import-x';
import perfectionist from 'eslint-plugin-perfectionist';
import preferArrow from 'eslint-plugin-prefer-arrow-functions';
import pluginPromise from 'eslint-plugin-promise';
import pluginReact from 'eslint-plugin-react';
import tsdoc from 'eslint-plugin-tsdoc';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  pluginJs.configs.recommended,
  stylistic.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  importx.flatConfigs.recommended,
  perfectionist.configs['recommended-natural'],
  pluginPromise.configs['flat/recommended'],
  eslintPluginUnicorn.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'], // Add this if you are using React 17+
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      preferArrow,
      tsdoc,
    },
    rules: {
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': [
        'error',
        'single',
        { avoidEscape: true },
      ],
      '@stylistic/semi': ['error', 'always'],
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ],
      react: {
        version: 'detect',
      },
    },
  },
);
