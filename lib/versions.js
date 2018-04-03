const browserslist = require('browserslist')
const semver = require('semver')

const bl2mb = {
  chrome: 'chrome',
  and_chr: 'chrome_android',
  chromeandroid: 'chrome_android',
  edge: 'edge',
  firefox: 'firefox',
  ff: 'firefox',
  firefoxandroid: 'firefox_android',
  and_ff: 'firefox_android',
  explorer: 'ie',
  ie: 'ie',
  opera: 'opera',
  safari: 'safari',
  ios: 'safari_ios',
  ios_saf: 'safari_ios',
  android: 'webview_android',
}

function configToBrowserslist(config) {
  if (Array.isArray(config)) {
    return browserslist(config)
  }
  // TODO: config can also be an object
  return browserslist()
}

function gtVersion(v1, v2) {
  return semver.gt(semver.coerce(v1), semver.coerce(v2))
}

function browserslistToMinBrowsers(browserslist) {
  return browserslist.reduce((browsers, browser) => {
    const [key, version] = browser.split(' ')
    const name = bl2mb[key]
    if (!name) {
      return browsers
    }
    const minVersion = version === 'all' ? true : version.split('-')[0]
    if (!browsers[name] || gtVersion(browsers[name], minVersion)) {
      browsers[name] = minVersion
    }
    return browsers
  }, {})
}

module.exports = { configToBrowserslist, browserslistToMinBrowsers }
