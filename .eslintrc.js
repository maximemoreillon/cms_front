module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/multi-word-component-names': 'off',
    'space-before-function-paren': 'off',
    'space-before-blocks': 'off',
    camelcase: 'off',
    quotes: 'off',
    'padded-blocks': 'off',
    'no-trailing-spaces': 'off',
    'spaced-comment': 'off',
    'object-curly-spacing': 'off',
    'no-multiple-empty-lines': 'off',
    'comma-dangle': 'off',
    'import/no-absolute-path': 'off',
    'space-in-parens': 'off',
    indent: 'off',
    'keyword-spacing': 'off',
    curly: 'off',
    'key-spacing': 'off',
    'comma-spacing': 'off',
    semi: 'off',
    'arrow-parens': 'off',
    'operator-linebreak': 'off',
    'block-spacing': 'off',
    'import/order': 'off',
    'brace-style': 'off',
    'vue/max-attributes-per-line': 'off',
  }
}
