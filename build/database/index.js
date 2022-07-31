"use strict";

var _typeorm = require("typeorm");

(0, _typeorm.getConnectionOptions)().then(options => {
  const newOptions = options;
  newOptions.host = 'database';
  (0, _typeorm.createConnection)({ ...options
  });
});