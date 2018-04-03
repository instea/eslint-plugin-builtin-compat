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
    browsers: ['last 1 versions', 'not ie <= 8'],
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
  ],

  invalid: [
    {
      code: '[1, 2, 3].includes(i => i === 3)',
      errors: [
        {
          message: 'Using incompatible method `includes`',
          type: 'MemberExpression',
        },
      ],
    },
  ],
})
