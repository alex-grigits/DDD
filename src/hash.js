'use strict';

const crypto = require('node:crypto');

const hash = (options) => (password) => new Promise((resolve, reject) => {
  const { byteSize, encoding, keyLen } = options;
  const salt = crypto.randomBytes(byteSize).toString(encoding);
  crypto.scrypt(password, salt, keyLen, (err, result) => {
    if (err) reject(err);
    resolve(salt + ':' + result.toString(encoding));
  });
});

module.exports = (config) => hash(config);
