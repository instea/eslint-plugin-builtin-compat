const bcd = require('mdn-browser-compat-data')
const semver = require('semver')
const { chain, get } = require('lodash')
const { startsWithLowercase } = require('./utils')

function isMethod(name) {
  // TODO: implement symbols checker
  // skipping symbols for now
  if (name.startsWith('@@')) {
    return false
  }
  return startsWithLowercase(name) && !name.includes('_')
}

// parameter values: version string, true, false, null
// true < 9 < 11.1 < false == null
function gtVersion(v1, v2) {
  if (!v2) {
    return false
  }
  if (typeof v1 === 'boolean' || !v1) {
    return !v1
  }
  return semver.gt(semver.coerce(v1), semver.coerce(v2))
}

function findUnsupportedBrowsers(minBrowsers, supportedBrowsers) {
  function filterUnsupported(browserKey) {
    const descriptor = supportedBrowsers[browserKey]
    if (Array.isArray(descriptor)) {
      // TODO: support array descriptors
      return false
    }
    const suppVersion = descriptor.version_added
    const minVersion = minBrowsers[browserKey]
    return gtVersion(suppVersion, minVersion)
  }

  function toSupportEntries(browserKey) {
    const descriptor = supportedBrowsers[browserKey]
    return {
      browser: browserKey,
      version_added: descriptor.version_added,
      min_version: minBrowsers[browserKey],
    }
  }
  return Object.keys(supportedBrowsers)
    .filter(filterUnsupported)
    .map(toSupportEntries)
}

function composeData(name, path, data, { minBrowsers }) {
  if (name === '__compat') {
    return []
  }
  const nextPath = path.concat(name)

  const result = chain(data)
    .keys()
    .flatMap(n => composeData(n, nextPath, data[n], { minBrowsers }))
    .value()

  if (isMethod(name) && data.__compat) {
    const supportedBrowsers = data.__compat.support
    const unsupported = findUnsupportedBrowsers(minBrowsers, supportedBrowsers)
    result.push({ name, path, unsupported })
  }
  return result
}

// when names of methods collide, pick the best supported one
function getBestSupported(results) {
  const minBrowsers = chain(results)
    .map(r => r.unsupported.length)
    .min()
    .value()
  const candidates = results.filter(r => r.unsupported.length === minBrowsers)
  // get first browser from candidates
  const browser = get(candidates[0], 'unsupported[0].browser')
  if (!browser) {
    return candidates[0]
  }
  // get method with min version for the given browser
  const { bestSupported } = candidates.reduce((acc, candidate) => {
    const comp = candidate.unsupported.find(({ browser: b }) => b === browser)
    if (comp && (!acc || gtVersion(acc.min_version, comp.min_version))) {
      return { version: comp.min_version, bestSupported: candidate }
    }
    return acc
  }, null)
  return bestSupported
}

function makeMethodsTable(data, { minBrowsers }) {
  return chain(data)
    .keys()
    .flatMap(n => composeData(n, [], data[n], { minBrowsers }))
    .groupBy('name')
    .mapValues(results => getBestSupported(results))
    .pickBy(r => r.unsupported.length)
    .value()
}

function makeChecker(minBrowsers) {
  const methods = makeMethodsTable(bcd.javascript.builtins, { minBrowsers })
  function check(node) {
    const { name } = node.property
    return methods[name]
  }
  return { check }
}

module.exports = { makeChecker }
