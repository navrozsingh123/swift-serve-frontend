import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Context modules intentionally export their provider alongside the hooks
    // that read it; Fast Refresh's one-export-per-file rule does not apply.
    files: ['src/components/ContextReducer.jsx', 'src/components/CartUIContext.jsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
