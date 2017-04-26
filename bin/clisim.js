#!/usr/bin/env node

const program = require('commander')
const { runIOS, runAndroid, getCurrentPlatform } = require('../')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .option('-i, --ios', 'show list of available ios simulators')
  .option('-a, --android', 'show list of available android emulators')
  .parse(process.argv)

async function getList() {
  const currentPlatform = await getCurrentPlatform(program)
  return currentPlatform === 'ios' ? runIOS() : runAndroid()
}

getList()
