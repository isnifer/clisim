const { execSync } = require('child_process')
const { getDevices } = require('node-simctl')
const table = require('text-table')
const cmp = require('semver-compare')
const getCurrentXcodePath = require('./getCurrentXcodePath')

module.exports = async function findiOSSimulators(asyncCallback) {
  const result = await getDevices()

  const sdks = Object.keys(result).sort(cmp)
  const devices = sdks.reduce(
    (memo, sdk) => memo.concat(result[sdk].map(device => Object.assign({}, device, { sdk }))),
    []
  )

  const devicesNames = table(devices.map(device => [device.name, device.sdk]), {
    align: ['l', 'r'],
  }).split('\n')

  const { udid } = await asyncCallback(
    devices.map((device, index) => ({
      name: devicesNames[index],
      value: device.udid,
    }))
  )

  const pathToDeveloperDir = getCurrentXcodePath()
  const simulatorApp = `${pathToDeveloperDir}/Applications/Simulator.app`
  return execSync(`open -n -a ${simulatorApp} --args -CurrentDeviceUDID ${udid}`)
}
