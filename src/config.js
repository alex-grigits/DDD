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
    colors: {
      info: '\x1b[1;37m',
      debug: '\x1b[1;33m',
      error: '\x1b[0;31m',
      system: '\x1b[1;34m',
      access: '\x1b[1;38m',
    },
    dateTimeLength: 19,
  }
}