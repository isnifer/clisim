#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const { findiOSSimulators, findAndroidEmulators } = require('../')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .option('-i, --ios', 'show list of available ios simulators')
  .option('-a, --android', 'show list of available android emulators')
  .parse(process.argv)

function getPropmt({ type = 'list', name, message, list }) {
  return inquirer.prompt([{
    type,
    name,
    message,
    choices: list.map(device => ({ name: device.name, value: device.value })),
    pageSize: 20,
  }])
}

async function getList() {
  if (program.ios) {
    return findiOSSimulators(list => getPropmt({
      name: 'udid',
      message: 'What iOS Simulator do you like?',
      list,
    }))
  }

  if (program.android) {
    return findAndroidEmulators(list => getPropmt({
      name: 'name',
      message: 'What Android Emulator do you like?',
      list,
    }))
  }

  return console.log('You do not pass platform key') // eslint-disable-line
}

getList()
