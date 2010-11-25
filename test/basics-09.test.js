#! /usr/bin/env node

var sh = require('../sh.js').sh;
var assert = require('assert');

var hasRun = [false, false, false, false];

process.on('exit', function() {
  hasRun.forEach(function(v,i) {
    if (!v) throw new Error('callback ' + i + ' has not run');
  });
});


/*
 * here we mainly test a closure as a second argument, and check the resulting
 * plumbing
 */
sh('ls . nxfile').pipe('sed s/test/TTEESSTT/', function(c) {
  hasRun[0] = true;
  
  c.out.result(function(arg) {
    hasRun[1] = true;
    assert.ok(arg.indexOf('TTEESSTT') > -1, 'we get sed\'s output, not ls\'');
  });

  c.or(function(status) {
    throw new Error('sed is supposed to return 0, we got: ' + status);
  });
  
  c.and(function() {
    hasRun[2] = true;
  });
}).err('sed s/nxfile/NXFILE/').result(function(arg) {
  hasRun[3] = true;
  assert.ok(arg.indexOf('NXFILE') > -1, 'we get the second sed\'s output');
});;
