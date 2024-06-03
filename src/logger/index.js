'use strict';

const fs = require('node:fs');
const path = require('node:path');

const loggers = {
  custom: require('./custom.js'),
  pino: require('./pino.js'),
};

const context = ({ name, root }) => {
  const Logger = loggers[name] || loggers.custom;

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }
  const date = new Date().toISOString().substring(0, 10);
  const filePath = path.join(root, `${date}.log`);

  return new Logger(filePath);
};

module.exports = (config) => context(config);
