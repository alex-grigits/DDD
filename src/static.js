'use strict';

const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

const getStaticPath = (staticRoot) => path.join(process.cwd(), staticRoot);

const toBool = [() => true, () => false];

const prepareFile = async (staticRoot, url) => {
  const staticPath = getStaticPath(staticRoot);
  const paths = [staticPath, url];
  if (url.endsWith('/')) paths.push('index.html');
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(staticPath);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : staticPath + '/404.html';
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

module.exports = (config) => {
  http.createServer(async (req, res) => {
    const file = await prepareFile(config.root, req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { 'Content-Type': mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
  }).listen(config.port);

  console.log(`Static on port ${config.port}`);
};
