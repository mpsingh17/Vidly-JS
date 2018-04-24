const path = require('path'),
      fs   = require('fs'),
      rfs  = require('rotating-file-stream') ;

const logDirectory = path.join(process.cwd(), 'logs') ;
fs.existsSync(logDirectory) || fs.mkdir(logDirectory) ;

const logStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
}) ;

module.exports = logStream ;