'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const config = require('./config');
const transportPath = `./transport/${config.apiServer.transport}.js`;
const server = require(transportPath);
const staticServer = require('./static.js')(config.staticServer);
const load = require('./load.js')(config.loaderRunOptions);
const db = require('./db.js')(config.dbAccessParameters);
const hash = require('./hash.js')(config.hashOptions);
const logger = require('./logger.js')(config.logger);

const sandbox = {
  console: Object.freeze(logger),
  db: Object.freeze(db),
  common: { hash },
};
const apiPath = path.join(process.cwd(), './api');
const routing = {};

(async () => {
  const files = await fsp.readdir(apiPath);
  const services = [];
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    services.push(serviceName);
    routing[serviceName] = await load(filePath, sandbox);
  }

  staticServer({ services });
  server(routing, config.apiServer.port);
})();
