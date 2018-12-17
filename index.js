const Mustache = require('mustache')

const mustachenv = template => Mustache.render(template, process.env)

module.exports = mustachenv
