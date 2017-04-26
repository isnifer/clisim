const findAndroidEmulators = require('./find-android-emulators')
const getPrompt = require('./getPrompt')

module.exports = function runAndroid() {
  return findAndroidEmulators(list => getPrompt({
    name: 'name',
    message: 'What Android Emulator do you like?',
    list,
  }))
}
