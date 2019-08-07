const { execSync } = require('child_process')

module.exports = function getCurrentXcodePath() {
  const response = execSync('/usr/bin/clang --version', { encoding: 'utf8' })
  const lineWithPath = response.split('\n').slice(-2, -1)[0]
  const pathToToolsArray = lineWithPath.split(': ')[1].split('/')

  return pathToToolsArray.slice(0, 5).join('/')
}
