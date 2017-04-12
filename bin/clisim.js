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

async function getList() {
  if (program.ios) {
    return findiOSSimulators(list => inquirer.prompt([{
      type: 'list',
      name: 'udid',
      message: 'What iOS Simulator do you like?',
      choices: list.map(device => ({
        name: device.name,
        value: device.udid,
      })),
      pageSize: 20,
    }]))
  }

  if (program.android) {
    try {
      const list = await findAndroidEmulators()
      return console.log(list)
    } catch (e) {
      console.log(e)
    }
  }

  console.log('You do not pass platform key')
}

getList()
