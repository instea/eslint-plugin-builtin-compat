/**
 * @fileoverview Warns about incompatible built-in usage
 * @author instea.co
 */
'use strict'

const {
  configToBrowserslist,
  browserslistToMinBrowsers,
} = require('../versions')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Warns about incompatible built-in usage',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create: function(context) {
    // variables should be defined here
    const browsers = context.settings.browsers || context.settings.targets
    const list = configToBrowserslist(browsers)
    const minBrowsers = browserslistToMinBrowsers(list)

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // give me methods
      MemberExpression: function(node) {
        if (node.property.name === 'includes') {
          context.report(node, 'Using incompatible method `includes`')
        }
      },
    }
  },
}
