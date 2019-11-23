const { execSync } = require('child_process')
const fs = require('fs')

function getValidAndroidSdk(memo, sdkRoot) {
  if (!memo) {
    const path = `${sdkRoot}/emulator/emulator`
    if (fs.existsSync(path)) {
      return path
    }
  }

  return memo
}

function getEmulatorPath() {
  // @see https://developer.android.com/studio/command-line/variables
  const { ANDROID_HOME, ANDROID_SDK_ROOT } = process.env
  const emulatorPath = [ANDROID_HOME, ANDROID_SDK_ROOT].reduce(getValidAndroidSdk, false)

  if (emulatorPath) {
    return emulatorPath
  }

  console.error(
    `Can not find a valid Android SDK in ANDROID_HOME (${ANDROID_HOME})' +
    ' or ANDROID_SDK_ROOT (${ANDROID_SDK_ROOT})`
  )

  throw new Error('Android SDK not found')
}

module.exports = async function findAndroidEmulators(asyncCallback) {
  try {
    const devices = execSync('emulator -list-avds', { encoding: 'utf-8' })
      .trim()
      .split('\n')
      .map(name => ({ name, value: name }))

    if (!devices.length) {
      throw new Error('Devices list is empty')
    }

    const { name: deviceName } = await asyncCallback(devices)
    const emulatorPath = getEmulatorPath()

    return execSync(`${emulatorPath} @${deviceName}`)
  } catch (error) {
    console.error(error || 'Can not find any android devices') // eslint-disable-line
  }

  return false
}
