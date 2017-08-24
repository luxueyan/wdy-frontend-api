module.exports = {
  root: true,
  // parser: 'babel-eslint',
  parserOptions: {
    "ecmaVersion": 2017
    // sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    // 'eslint:recommended',
    'plugin:node/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'node'
  ],

  env: {
    'node': true,
    'es6': true,
    'jasmine': true
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    "node/shebang": ["error", {"convertPath": null}],
    // allow async-await
    'generator-star-spacing': 0,
    'space-before-function-paren': 0,
    "spaced-comment": [0, "never"],
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
