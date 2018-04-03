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
})

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()
ruleTester.run('no-incompatible-builtins', rule, {
  valid: [
    // give me some code that won't trigger a warning
    "import $ from 'jquery';",
    "import { filter } from 'lodash/fp'",
  ],

  invalid: [
    {
      code: "import _ from 'lodash';",
      errors: [
        {
          message: 'Prefer importing single functions over a full FP library',
          type: 'ImportDeclaration',
        },
      ],
    },
    /*
        {
            code: "'Hello world'.includes('world')",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
        */
  ],
})
