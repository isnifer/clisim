const { execSync } = require('child_process')
const { getDevices } = require('node-simctl')
const table = require('text-table')
const cmp = require('semver-compare')

module.exports = async function findiOSSimulators(asyncCallback) {
  const result = await getDevices()

  const sdks = Object.keys(result).sort(cmp)
  const devices = sdks.reduce(
    (memo, sdk) => {
      const nextDevices = result[sdk].map(
        device => Object.assign({}, device, { sdk })
      )
      return memo.concat(nextDevices)
    },
    []
  )

  const devicesNames = table(
    devices.map(device => ([device.name, device.sdk])), { align: ['l', 'r'] }
  ).split('\n')

  const { udid } = await asyncCallback(
    devices.map((device, index) => ({
      name: devicesNames[index],
      value: device.udid,
    }))
  )

  const simulatorApp = '/Applications/Xcode.app/Contents/Developer/Applications/Simulator.app'
  return execSync(
    `open -n -a ${simulatorApp} --args -CurrentDeviceUDID ${udid}`
  )
}
