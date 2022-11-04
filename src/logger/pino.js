'use strict';

const fs = require('node:fs');
const path = require('node:path');
const pino = require('pino');

class Logger {
  constructor(config, logPath) {
    if (!fs.existsSync(logPath)) {
      fs.mkdirSync(logPath);
    }
    this.config = config;
    this.path = logPath;
    const date = new Date().toISOString().substring(0, 10);
    const filePath = path.join(logPath, `${date}.log`);
    this.writeLogger = pino();
    this.logger = pino(pino.destination(filePath));
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

  system(...args) {
    this.writeLogger.info(args);
    this.logger.info(args);
  }

  access(...args) {
    this.writeLogger.info(args);
    this.logger.info(args);
  }
}

module.exports = (config) => new Logger(config, './log');
