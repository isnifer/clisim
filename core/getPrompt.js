const inquirer = require('inquirer')

module.exports = function getPrompt({ type = 'list', name, message, list }) {
  return inquirer.prompt([{
    type,
    name,
    message,
    choices: list.map(device => ({ name: device.name, value: device.value })),
    pageSize: 20,
  }])
}
