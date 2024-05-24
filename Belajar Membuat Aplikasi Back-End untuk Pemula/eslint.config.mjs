import globals from 'globals';
import pluginJs from '@eslint/js';
import google from 'eslint-config-google';

export default [
  {files: ['./scr/*.js'], languageOptions: {sourceType: 'commonjs'}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  {
    plugins: {
      google: google
    }, 
    'rules': {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'no-multi-spaces': ['error']
    }
  },
];