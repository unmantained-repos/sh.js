#! /usr/bin/env node

var sh = require('../sh.js').sh;

sh('echo hello')('sed s/he/HE/');