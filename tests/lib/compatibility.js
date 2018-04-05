const { expect } = require('chai')
const { makeChecker } = require('../../lib/compatibility')

describe('compatibility', () => {
  describe('makeChecker', () => {
    it('should have check method', () => {
      const compat = makeChecker({})
      expect(compat).to.be.an('object')
      expect(compat.check).to.be.a('function')
    })

    it('should be incompatibile', () => {
      const minBrowsers = {
        chrome: '65',
        ie: '9',
        safari: '11',
      }
      const compat = makeChecker(minBrowsers)
      const node = { property: { name: 'includes' } }
      const result = compat.check(node)
      expect(result).to.be.an('object')
      expect(result.name).to.equal('includes')
      expect(result.unsupported).to.eql([
        {
          browser: 'ie',
          min_version: '9',
          version_added: false,
        },
      ])
    })

    it('should be compatible', () => {
      const minBrowsers = {
        chrome: '65',
        ie: '9',
        safari: '11',
      }
      const compat = makeChecker(minBrowsers)
      const node = { property: { name: 'indexOf' } }
      expect(compat.check(node)).to.be.undefined
    })
  })
})
