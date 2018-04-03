/**
 * @fileoverview Warns about incompatible built-in usage
 * @author instea.co
 */
'use strict'

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

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // give me methods
      ImportDeclaration: function(node) {
        node.specifiers.forEach(function(specifier) {
          if (
            specifier.type == 'ImportDefaultSpecifier' &&
            specifier.local.type == 'Identifier' &&
            specifier.local.name == '_'
          ) {
            context.report(
              node,
              'Prefer importing single functions over a full FP library'
            )
          }
        })
      },
    }
  },
}
