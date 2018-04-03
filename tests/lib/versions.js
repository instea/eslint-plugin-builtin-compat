const { expect } = require('chai')
const {
  configToBrowserslist,
  browserslistToMinBrowsers,
} = require('../../lib/versions')

describe('versions', () => {
  describe('configToBrowserslist', () => {
    it('should convert browsers array', () => {
      const config = ['last 1 versions', 'not ie <= 8']
      const browsers = configToBrowserslist(config)
      expect(browsers).to.be.an('array')
      browsers.forEach(b => {
        expect(b).to.be.a('string')
      })
    })
  })

  describe('browserslistToMinBrowsers', () => {
    it('should convert supported browsers', () => {
      const browsers = [
        'and_chr 64',
        'and_ff 57',
        'and_qq 1.2',
        'and_uc 11.8',
        'android 62',
        'baidu 7.12',
        'bb 10',
        'chrome 65',
        'edge all',
        'firefox 59',
        'ie 11',
        'ie_mob 11',
        'ios_saf 11.0-11.2',
        'op_mini all',
        'op_mob 37',
        'opera 50',
        'safari 11',
        'samsung 6.2',
      ]
      const minBrowsers = browserslistToMinBrowsers(browsers)
      expect(minBrowsers).to.deep.equal({
        chrome: '65',
        chrome_android: '64',
        edge: true,
        firefox: '59',
        firefox_android: '57',
        ie: '11',
        opera: '50',
        safari: '11',
        safari_ios: '11.0',
        webview_android: '62',
      })
    })

    it('should convert to min version', () => {
      const browsers = [
        'ie 11',
        'ie 10',
        'ie 9',
        'ios_saf 10.0-10.2',
        'ios_saf 10.3',
        'ios_saf 11.0-11.2',
      ]
      const minBrowsers = browserslistToMinBrowsers(browsers)
      expect(minBrowsers).to.deep.equal({
        ie: '9',
        safari_ios: '10.0',
      })
    })
  })
})
