/* eslint-env mocha */
const assert = require('assert')
const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')

const node = process.argv[0]
const bin = require.resolve('./bin.js')

const fixture = filename => path.resolve(__dirname, 'fixtures', filename)

it('file -> file', () => {
  fs.writeFileSync(fixture('1.in'), '{{{ FOO }}}')
  childProcess.spawnSync(node, [bin, fixture('1.in'), fixture('1.out')], {
    env: { FOO: 'bar' }
  })
  const actual = fs.readFileSync(fixture('1.out'), 'utf8')
  assert.strictEqual(actual, 'bar')
})

it('file -> console', () => {
  fs.writeFileSync(fixture('2.in'), '{{{ FOO }}}')
  const actual = childProcess.spawnSync(node, [bin, fixture('2.in'), '-'], {
    env: { FOO: 'bar' },
    encoding: 'utf8'
  }).stdout
  assert.strictEqual(actual, 'bar')
})

it('console -> file', () => {
  childProcess.spawnSync(node, [bin, '-', fixture('3.out')], {
    env: { FOO: 'bar' },
    input: '{{{ FOO }}}'
  })
  const actual = fs.readFileSync(fixture('3.out'), 'utf8')
  assert.strictEqual(actual, 'bar')
})

it('console -> console', () => {
  const actual = childProcess.spawnSync(node, [bin, '-', '-'], {
    env: { FOO: 'bar' },
    input: '{{{ FOO }}}',
    encoding: 'utf8'
  }).stdout
  assert.strictEqual(actual, 'bar')
})

it('with dotenv', () => {
  fs.writeFileSync(fixture('.env'), 'FOO=bar\n')
  const actual = childProcess.spawnSync(node, [bin, '-', '-', '--dotenv'], {
    cwd: fixture('.'),
    input: '{{{ FOO }}}',
    encoding: 'utf8'
  }).stdout
  assert.strictEqual(actual, 'bar')
})

it('show version', () => {
  childProcess.spawnSync(node, [bin, '--version'])
})

it('display help', () => {
  childProcess.spawnSync(node, [bin, '--help'])
})

it('no arguments enough', () => {
  const actual = childProcess.spawnSync(node, [bin]).status
  assert.strictEqual(actual, 2)
})

it('render failed', () => {
  const actual = childProcess.spawnSync(node, [bin, '-', '-'], {
    input: '{{{'
  }).status
  assert.strictEqual(actual, 1)
})
