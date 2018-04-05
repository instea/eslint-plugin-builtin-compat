/**
 * @fileoverview Warns about incompatible built-in usage
 * @author instea.co
 */
'use strict'

const { makeChecker } = require('../compatibility')
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
      category: 'Browser compatibility',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create: function(context) {
    // variables should be defined here
    const browserConfig = context.settings.browsers || context.settings.targets
    const ignoredBuiltins = context.settings['builtin-compat-ignore']
    const browserList = configToBrowserslist(browserConfig)
    const minBrowsers = browserslistToMinBrowsers(browserList)
    const compatibility = makeChecker(minBrowsers, ignoredBuiltins)

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
        const result = compatibility.check(node)
        if (result) {
          const unsupported = result.unsupported
            .map(({ browser, version_added }) => `${browser} ${version_added}`)
            .join(', ')
          const infoMsg = `Using incompatible method '${result.name}'. `
          const browsersMsg = `Unsupported browsers: ${unsupported}`
          context.report(node, infoMsg + browsersMsg)
        }
      },
    }
  },
}
