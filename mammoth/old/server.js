require('./server.babel'); // babel registration (runtime transpilation for node)

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import webpackConfig from './webpack.config';

import httpProxy from 'http-proxy';

import jwt from 'jsonwebtoken';
import jwtConfig from './jwt.config.json';
//import nodeadmin from 'nodeadmin/middleware'
//
//app.use(nodeadmin(app));

const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

const app = express();
// We need to use basic HTTP service to proxy
// websocket requests from webpack
const server = http.createServer(app);

///----------------api--------------\
const apiHost = process.env.APIHOST || 'localhost';
const apiPort = process.env.APIPORT || 3030;
const targetUrl = 'http://' + apiHost + ':' + apiPort;
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

 //Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: targetUrl + '/ws'});
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});
//\------------------------api-----------------/

// Webpack dev server
if (isDeveloping) {
  const WEBPACK_PORT = 3001;
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    headers: {'Access-Control-Allow-Origin': '*'},
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.listen(WEBPACK_PORT, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('WebpackDevServer listening at localhost:'+WEBPACK_PORT);
  });
}


const publicPath = path.join(__dirname, 'public');
app.use(bodyParser.json({ type: 'application/json' }))
app.use(express.static(publicPath));

const port = isProduction ? (process.env.PORT || 80) : (process.env.PORT || 3000);

// this is necessary to handle URL correctly since client uses Browser History
app.get('*', function (request, response){

  response.sendFile(path.resolve(__dirname , '', 'index.html'))
})
//
//app.post('/api/login', function(req, res) {
//      const credentials = req.body;
//      if(credentials.user==='admin' && credentials.password==='password'){
//
//        const profile = {'user': credentials.user, 'role': 'ADMIN'};
//        const jwtToken = jwt.sign(profile, jwtConfig.secret, {'expiresIn' : 5*60});  // expires in 300 seconds (5 min)
//        res.status(200).json({
//          id_token: jwtToken
//        });
//
//        //res.json({'user': credentials.user, 'role': 'ADMIN'});
//      }else{
//        res.status(401).json({'message' : 'Invalid user/password'});
//      }
//});
//
//app.post('/api/logout', function(req, res) {
//    res.status(200).json({'message' : 'User logged out'});
//});



server.listen(port, function (err, result) {
  if(err){
    console.log(err);
  }
  console.log('Server running on port ' + port);
}); 