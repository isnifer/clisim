const { execSync } = require('child_process')

module.exports = async function findAndroidEmulators(asyncCallback) {
  try {
    const devices = execSync('emulator -list-avds', { encoding: 'utf-8' })
      .trim()
      .split('\n')
      .map(name => ({ name, value: name }))

    if (!devices.length) {
      throw new Error('Devices list is empty')
    }

    const { name } = await asyncCallback(devices)

    return execSync(`${process.env.ANDROID_HOME}/tools/emulator @${name}`)
  } catch (error) {
    console.error('Can not find any android devices') // eslint-disable-line
  }

  return false
}
