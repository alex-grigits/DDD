'use strict';

const config = {
  baseUrl: 'ws://127.0.0.1:8001',
  api: {
    user: {
      create: ['record'],
      read: ['id'],
      update: ['id', 'record'],
      delete: ['id'],
      find: ['mask'],
    },
    country: {
      read: ['id'],
      delete: ['id'],
      find: ['mask'],
    },
    city: {
      read: ['id'],
    }
  },
}

const getProtocol = (url) => new URL(url).protocol.replace(':', '');

const createAPI = (structure, transport) => {
  const api = {};
  const services = Object.keys(structure);
  for (const serviceName of services) {
    api[serviceName] = {};
    const service = structure[serviceName];
    const methods = Object.keys(service);
    for (const methodName of methods) {
      api[serviceName][methodName] = (...args) => {
        const packet = { name: serviceName, method: methodName, args };
        return transport(packet);
      }
    };
  }
  return api;
}

const createHttpEndpoint = (baseUrl, fetch) => (packet) => {
  const { name, method, args } = packet;
  const crud = { create: 'post', read: 'get', update: 'put', delete: 'delete' };
  let url = `${baseUrl}/${name}`;
  const options = {
    method: crud[method].toUpperCase(),
    headers: { 'Content-Type': 'application/json' },
    'User-Agent': 'chrome',
  };
  if (args.length) {
    if (typeof args[0] === 'object') options.body = JSON.stringify(args[0]);
    if (typeof args[0] === 'string') url += `/${args[0]}`;
  }
  return new Promise((resolve, reject) => {
    fetch(url, options).then((res) => {
      const { status } = res;
      if (status !== 200) {
        reject(new Error(`Status code ${status}`));
        return;
      }
      resolve(res.json());
    });
  });
};

const createWsEndpoint = (socket) => (packet) => {
  return new Promise((resolve) => {
    socket.send(JSON.stringify(packet));
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      resolve(data);
    };
  });
};

const http = (url, structure) => {
  const transport = createHttpEndpoint(url, fetch);
  const api = createAPI(structure, transport);
  return Promise.resolve(api);
}

const ws = (url, structure) => {
  const socket = new WebSocket(url);
  const transport = createWsEndpoint(socket);
  const api = createAPI(structure, transport);
  return new Promise((resolve) => {
    socket.addEventListener('open', () => resolve(api));
  });
}

const TRANSPORTS = { http, ws };

const scaffold = (url, structure) => {
  const protocol = getProtocol(url);
  return TRANSPORTS[protocol](url, structure);
};

let api;

(async () => {
  api = await scaffold(
    config.baseUrl,
    config.api,
  );
})();

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('getAllData');
  const output = document.getElementById('output');
  const radioButtons = document.querySelectorAll('input[name="service"]');
  let selectedService = radioButtons[0];

  const getAllData = (output) => async () => {
    try {
      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          selectedService = radioButton.value;
          break;
        }
      }
      const res = await api[selectedService].read();
      console.table(res);
      output.innerText = JSON.stringify(res, null ,4);
    } catch (error) {
      console.error(error);
    }
  }

  button.addEventListener('click', getAllData(output));
});
