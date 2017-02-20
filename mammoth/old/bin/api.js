#!/usr/bin/env node
require('../server.babel.js'); // babel registration (runtime transpilation for node)

if (process.env.NODE_ENV !== 'production') {
  require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i
  })
}

require('../api/api');
