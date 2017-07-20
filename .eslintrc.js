module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true,
    es6: true
  },
  rules: {
    'arrow-parens': [1, 'always'],
    'arrow-spacing': 1,
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
    'comma-spacing': [1, { 'before': false, 'after': true }],
    'comma-style': [2, 'last'],
    'curly': 1,
    'dot-location': [1, 'property'],
    'eol-last': 1,
    'guard-for-in': 1,
    'indent': [1, 2, { 'SwitchCase': 1, 'MemberExpression': 1, 'CallExpression': { 'arguments': 1 }, 'ArrayExpression': 1, 'ObjectExpression': 1 }],
    'key-spacing': [1, { 'beforeColon': false, 'afterColon': true }],
    'max-len': [2, 120, { 'ignoreComments': true, 'ignoreStrings': true } ],
    'no-const-assign': 2,
    'no-duplicate-imports': 2,
    'no-multi-spaces': 1,
    'no-nested-ternary': 2,
    'no-trailing-spaces': [1, { 'skipBlankLines': false }],
    'no-var': 2,
    'object-curly-spacing': [1, 'always', { 'arraysInObjects': false, 'objectsInObjects': false }],
    'prefer-const': 1,
    'quotes': [2, 'single'],
    'semi': [2, 'never'],
    'space-infix-ops': 2,

    'ember/alias-model-in-controller': 0,
    'ember/named-functions-in-promises': 0,
    'ember/order-in-components': [2, {
      'order': [
        'service',
        'property',
        ['single-line-function', 'multi-line-function'],
        'observer',
        'lifecycle-hook',
        'actions',
        'method',
      ]
    }],
    'ember/order-in-models': [2, {
      'order': [
        'attribute',
        'relationship',
        ['single-line-function', 'multi-line-function'],
        'method',
      ]
    }],
    'ember/order-in-routes': [2, {
      'order': [
        'service',
        ['inherited-property', 'property'],
        'model',
        'lifecycle-hook',
        'actions',
        'method',
      ]
    }],
    'ember/order-in-controllers': [2, {
      'order': [
        'service',
        'query-params',
        ['inherited-property', 'property'],
        ['single-line-function', 'multi-line-function'],
        'observer',
        'actions',
        'method',
      ]
    }]
  }
}
