# mustachenv

[![Build Status](https://travis-ci.org/Gerhut/mustachenv.svg?branch=master)](https://travis-ci.org/Gerhut/mustachenv)
[![Coverage Status](https://coveralls.io/repos/github/Gerhut/mustachenv/badge.svg?branch=master)](https://coveralls.io/github/Gerhut/mustachenv?branch=master)
[![dependencies Status](https://david-dm.org/Gerhut/mustachenv/status.svg)](https://david-dm.org/Gerhut/mustachenv)
[![devDependencies Status](https://david-dm.org/Gerhut/mustachenv/dev-status.svg)](https://david-dm.org/Gerhut/mustachenv?type=dev)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/Gerhut/mustachenv.svg)](https://greenkeeper.io/)

Render mustache templates with environment variables.

## Install

    npm install --global mustachenv

## Usage

    $ mustachenv [-d|--dotenv] [-h|--help] <template> <output>

    -d, --dotenv  - Import dotenv to support ".env" file.
    -v, --version - Show version and exit.
    -h, --help    - Display help.

    template      - Mustache template file, or "-" for stdin.
    output        - Render output file, or "-" for stdout.

## License

MIT
