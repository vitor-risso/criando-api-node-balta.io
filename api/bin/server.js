const app = require('../src/app')
const debug = require('debug')('nodestr:server');
const http = require('http');

const port = normalizePorter(process.env.PORT || '8080');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError)
server.on('listening', onListening)
console.log(`Seu servidor está rodando na porta ` + port)

function normalizePorter(value){
  const port = parseInt(value, 10);

  if(isNaN(port)){
    return value
  }

  if(port >= 0){
    return port;
  }
  
  return false
}

function onError(error){
  if(error.syscall !== 'listen'){
    throw error
  }

  const bind = typeof port ==='string' ? 'Pipe ' + port : 'Port ' + port; 

  switch(error){
    case 'EACCES':
      console.log(bind + ' requires elevated previleges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(bind + ' is already in use');
      process.exit('');
      break;
    default:
      throw error;
  }
}

function onListening(){
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on '+ bind)
}
