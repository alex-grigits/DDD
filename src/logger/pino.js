'use strict';

const pino = require('pino');
const Logger = require('./Logger');

class Pino extends Logger {
  constructor(filePath) {
    super();
    this.filePath = filePath;
    this.writeLogger = pino();
    this.logger = pino(pino.destination(this.filePath));
  }

  log(...args) {
    this.writeLogger.info(args);
    this.logger.info(args);
  }

  info(...args) {
    this.writeLogger.info(args);
    this.logger.info(args);
  }

  warn(...args) {
    this.writeLogger.warn(args);
    this.logger.warn(args);
  }

  dir(...args) {
    this.writeLogger.info(args);
    this.logger.info(args);
  }

  debug(...args) {
    this.writeLogger.debug(args);
    this.logger.debug(args);
  }

  error(...args) {
    this.writeLogger.error(args);
    this.logger.error(args);
  }
}

module.exports = Pino;
