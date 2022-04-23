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
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/multi-word-component-names': 'warn',
    'space-before-function-paren': 'warn',
    'space-before-blocks': 'warn',
    'camelcase': 'warn',
    'quotes': 'warn',
    'padded-blocks': 'warn',
    'no-trailing-spaces': 'warn',
    'spaced-comment': 'warn',
    'object-curly-spacing': 'warn',
    'no-multiple-empty-lines': 'warn',
    'comma-dangle': 'warn',
    'import/no-absolute-path': 'warn',
    'space-in-parens': 'warn',
    'indent': 'warn',
    'keyword-spacing': 'warn',
    'curly': 'warn',
    'key-spacing': 'warn',
    'comma-spacing': 'warn',
    'semi': 'warn',
    'arrow-parens': 'warn',
    'operator-linebreak': 'warn',
    'block-spacing': 'warn',
    'arrow-parens': 'warn',
    'import/order': 'warn',
    'brace-style': 'warn',
  }
}
