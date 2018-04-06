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
const { has } = require('lodash')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Warns about incompatible built-in usage',
      category: 'Browser compatibility',
      recommended: true,
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
      CallExpression: function(node) {
        if (!has(node, 'callee.object') || !has(node, 'callee.property')) {
          // only method calls
          return
        }
        const result = compatibility.check(node.callee)
        if (result && result.unsupported) {
          const unsupported = result.unsupported
            .map(({ browser, version_added }) => {
              const version = version_added ? ' ' + version_added : ''
              return `${browser}${version}`
            })
            .join(', ')
          const infoMsg = `Using possible incompatible method '${result.path
            .concat([result.name])
            .join('.')}'. `
          const browsersMsg = `Unsupported browsers: ${unsupported}`
          context.report(node, infoMsg + browsersMsg)
        }
      },
    }
  },
}
