'use strict';

const fs = require('node:fs');
const util = require('node:util');
const path = require('node:path');
const Logger = require('./Logger');

const COLORS = {
  log: '\x1b[1;39m',
  info: '\x1b[1;32m',
  warn: '\x1b[1;33m',
  debug: '\x1b[1;36m',
  error: '\x1b[0;31m',
  system: '\x1b[1;34m',
  access: '\x1b[1;38m',
};

const DATE_TIME_LENGTH = 19;

class Custom extends Logger {
  constructor(filePath) {
    super();
    this.filePath = filePath;
    this.path = path.dirname(this.filePath);
    this.stream = fs.createWriteStream(this.filePath, { flags: 'a' });
    this.regexp = new RegExp(path.dirname(this.path), 'g');
  }

  close() {
    return new Promise((resolve) => this.stream.end(resolve));
  }

  write(type = 'info', s) {
    const now = new Date().toISOString();
    const date = now.substring(0, DATE_TIME_LENGTH);
    const color = COLORS[type];
    const line = date + '\t' + s;
    console.log(color + line + '\x1b[0m');
    const out = line.replace(/[\n\r]\s*/g, '; ') + '\n';
    this.stream.write(out);
  }

  log(...args) {
    const msg = util.format(...args);
    this.write('info', msg);
  }

  info(...args) {
    const msg = util.format(...args);
    this.write('info', msg);
  }

  warn(...args) {
    const msg = util.format(...args);
    this.write('warn', msg);
  }

  dir(...args) {
    const msg = util.inspect(...args);
    this.write('info', msg);
  }

  debug(...args) {
    const msg = util.format(...args);
    this.write('debug', msg);
  }

  error(...args) {
    const msg = util.format(...args).replace(/[\n\r]{2,}/g, '\n');
    this.write('error', msg.replace(this.regexp, ''));
  }
}

module.exports = Custom;
