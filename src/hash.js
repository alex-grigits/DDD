'use strict';

const crypto = require('node:crypto');
const { HASH_OPTIONS: { BYTE_SIZE, ENCODING, KEY_LENGTH } } = require('./config');

const hash = (password) => new Promise((resolve, reject) => {
  const salt = crypto.randomBytes(BYTE_SIZE).toString(ENCODING);
  crypto.scrypt(password, salt, KEY_LENGTH, (err, result) => {
    if (err) reject(err);
    resolve(salt + ':' + result.toString(ENCODING));
  });
});

module.exports = hash;
