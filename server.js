// //Install express server
// const express = require('express');
// const path = require('path');
//
// const app = express();
//
// // Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/dist/'));
//
// app.get('/*', function(req,res) {
//
//   res.sendFile(path.join(__dirname + '/dist/index.html'));
// });
//
// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);

var static = require ('node-static');
var file = new static.Server(__dirname + '/dist');
require ('http'). createServer (function (request, response) {
  request.addListener ('end', function () {
    file.serve (request, response);
  }). resume ();
}). listen (process .env.PORT || 3000);