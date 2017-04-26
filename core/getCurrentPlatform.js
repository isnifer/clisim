const getPrompt = require('./getPrompt')

module.exports = async function getCurrentPlatform(program) {
  if (program.ios) {
    return 'ios'
  }

  if (program.android) {
    return 'android'
  }

  const { platform } = await getPrompt({
    name: 'platform',
    message: 'Select platform for device',
    list: [{ name: 'iOS', value: 'ios' }, { name: 'Android', value: 'android' }],
  })

  return platform
}
