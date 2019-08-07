const findiOSSimulators = require('./findiOSSimulators')
const getPrompt = require('./getPrompt')

module.exports = function runIOS() {
  return findiOSSimulators(list =>
    getPrompt({
      name: 'udid',
      message: 'What iOS Simulator do you like?',
      list,
    })
  )
}
