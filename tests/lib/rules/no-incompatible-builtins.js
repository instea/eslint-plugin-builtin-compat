/**
 * @fileoverview Warns about incompatible built-in usage
 * @author instea.co
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-incompatible-builtins'),
  RuleTester = require('eslint').RuleTester

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  settings: {
    browsers: ['last 3 versions', 'safari >= 8', 'not ie <= 8'],
    'builtin-compat-ignore': ['startsWith'],
  },
})

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()
ruleTester.run('no-incompatible-builtins', rule, {
  valid: [
    // give me some code that won't trigger a warning
    '[1, 2, 3].forEach(i => console.log(i))',
    '"hello world".startsWith("world")',
  ],

  invalid: [
    {
      code: '[1, 2, 3].includes(i => i === 3)',
      errors: [
        {
          message:
            "Using incompatible method 'includes'. Unsupported browsers: ie false, safari 9",
          type: 'MemberExpression',
        },
      ],
    },
    {
      code: 'Object.setPrototypeOf(obj, prototype);',
      errors: [
        {
          message:
            "Using incompatible method 'setPrototypeOf'. Unsupported browsers: ie 11, safari 9",
          type: 'MemberExpression',
        },
      ],
    },
  ],
})
