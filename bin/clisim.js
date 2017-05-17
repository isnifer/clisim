#!/usr/bin/env node

const program = require('commander')
const { runIOS, runAndroid, getCurrentPlatform, runFirstAvailableDevice } = require('../')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .option('-i, --ios', 'show list of available ios simulators')
  .option('-a, --android', 'show list of available android emulators')
  .option('-f, --first', 'run first android or ios device')
  .parse(process.argv)

async function getList() {
  const currentPlatform = await getCurrentPlatform(program)

  if (program.first) {
    return runFirstAvailableDevice(currentPlatform)
  }

  return currentPlatform === 'ios' ? runIOS() : runAndroid()
}

getList()
