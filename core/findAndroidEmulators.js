const { execSync } = require('child_process')
const fs = require('fs')

function isValidAndroidSdk(sdkRoot) {
  if (!sdkRoot) return false
  // not sure if this is a good test for a valid sdk
  // but since we only use emulator/emulator, it should be good enough
  const emulator = `${sdkRoot}/emulator/emulator`
  return fs.existsSync(emulator)
}

function getAndroidSdkRoot() {
  // see https://developer.android.com/studio/command-line/variables
  const { ANDROID_HOME } = process.env
  if (isValidAndroidSdk(ANDROID_HOME)) return ANDROID_HOME

  const { ANDROID_SDK_ROOT } = process.env
  if (isValidAndroidSdk(ANDROID_SDK_ROOT)) return ANDROID_SDK_ROOT

  console.error(
    `Can not find a valid android sdk in ANDROID_HOME (${ANDROID_HOME}) or ANDROID_SDK_ROOT (${ANDROID_SDK_ROOT})`
  )
  throw new Error('Android sdk not found')
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

    const { name } = await asyncCallback(devices)

    return execSync(`${getAndroidSdkRoot()}/emulator/emulator @${name}`)
  } catch (error) {
    console.error('Can not find any android devices') // eslint-disable-line
  }

  return false
}
