module.exports = {
  STATIC_SERVER_PORT: 8000,
  SERVER_PORT: 8001,
  TRANSPORT: 'ws', // 'http' | 'ws'
  DB_ACCESS_PARAMETERS: {
    host: '127.0.0.1',
    port: 5432,
    database: 'example',
    user: 'marcus',
    password: 'marcus',
  },
  HASH_OPTIONS: {
    BYTE_SIZE: 16,
    ENCODING: 'base64',
    KEY_LENGTH: 64,
  },
  LOAD_RUN_OPTIONS: {
    timeout: 5000,
    displayErrors: false,
  },
  LOGGER_OPTIONS: {
    COLORS: {
      info: '\x1b[1;37m',
      debug: '\x1b[1;33m',
      error: '\x1b[0;31m',
      system: '\x1b[1;34m',
      access: '\x1b[1;38m',
    },
    DATETIME_LENGTH: 19,
  }
}