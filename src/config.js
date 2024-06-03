'use strict';

module.exports = {
  staticServer: {
    port: 8000,
    root: './static',
    renderEngine: 'html', // 'ejs' | 'html'
  },
  apiServer: {
    port: 8001,
    transport: 'ws', // 'http' | 'ws'
  },
  dbAccessParameters: {
    host: '127.0.0.1',
    port: 5432,
    database: 'example',
    user: 'marcus',
    password: 'marcus',
  },
  hashOptions: {
    byteSize: 16,
    encoding: 'base64',
    keyLen: 64,
  },
  loaderRunOptions: {
    timeout: 5000,
    displayErrors: false,
  },
  logger: {
    name: 'custom', // 'custom' | 'pino'
    root: './log',
  }
};
