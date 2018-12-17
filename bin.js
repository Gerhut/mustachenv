#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const dotenv = require('dotenv')
const minimist = require('minimist')
const Mustache = require('mustache')

const mustachenv = require('.')
const packageInfo = require('./package.json')

const printInfo = filename => {
  const pathname = path.resolve(__dirname, filename)
  const template = fs.readFileSync(pathname, 'utf8')
  const content = Mustache.render(template, packageInfo)
  process.stdout.write(content)
}

const argv = minimist(process.argv.slice(2), {
  boolean: ['dotenv', 'version', 'help'],
  alias: {
    d: 'dotenv',
    v: 'version',
    h: 'help'
  }
})

if (argv.version) {
  printInfo('./version.mustache')
  process.exit(0)
}
if (argv.help) {
  printInfo('./help.mustache')
  process.exit(0)
}

if (argv._.length < 2) {
  printInfo('./help.mustache')
  process.exit(2)
}

const input = argv._[0] === '-'
  ? process.stdin
  : fs.createReadStream(argv._[0], 'utf8')

if (argv.dotenv) dotenv.config()

input.once('readable', () => {
  let template = ''
  while (true) {
    const chunk = input.read()
    if (chunk == null) break
    template += chunk
  }

  const content = mustachenv(template)
  const output = argv._[1] === '-'
    ? process.stdout
    : fs.createWriteStream(argv._[1], 'utf8')
  output.write(content)
})

process.on('uncaughtException', (error) => {
  process.stderr.write(error.message + '\n')
  process.exit(1)
})
