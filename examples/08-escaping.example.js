#! /usr/bin/env node

var sh = require('../sh.js');

sh('echo hello\\ \\ world \\" \\\' \\\\');
