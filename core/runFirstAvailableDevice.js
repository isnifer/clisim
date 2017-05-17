const findiOSSimulators = require('./findiOSSimulators')
const findAndroidEmulators = require('./findAndroidEmulators')

module.exports = function runFirstAvailableDevice(platform) {
  if (platform === 'ios') {
    return findiOSSimulators(devices => devices[0].value)
  }

  return findAndroidEmulators(devices => devices[0])
}
