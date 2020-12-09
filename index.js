const express = require('express'); // error no esta en ES6!
const bodyParser = require("body-parser");
const { JSONRPCServer } = require("json-rpc-2.0");
const cors = require('cors');
const app = express();



const { config } = require('./Infraestructura/lib/config/db');
const tramitesApi = require('./Dominio/routes/tramites.js');
const tipoPrioridadApi = require('./Dominio/routes/tipoPrioridad.js');
const tipoTramiteApi = require('./Dominio/routes/tipoTramite.js');
const tipoEstadoHistorialTramiteApi = require('./Dominio/routes/tipoEstadoHistorialTramite.js');
const tipoTramiteRequisitoApi = require('./Dominio/routes/tipoTramiteRequisito.js');
const requisitoApi = require('./Dominio/routes/requisito.js');
const EstadoHistorialTramiteApi = require('./Dominio/routes/EstadoHistorialTramite.js');
const HistorialTramiteApi = require('./Dominio/routes/HistorialTramite.js');
const secuenciaRutaApi = require('./Dominio/routes/secuenciaRuta.js');
const TipoRequisitoApi = require('./Dominio/routes/TipoRequisito.js');


// JSON RPC
const server = new JSONRPCServer();

// 1er parametro es el nombre del metodo
// 2do parametro es el metodo propio
// el metodo retorna un resultado y puede retornar una promesa del resultado
server.addMethod("echo", ({ text }) => `echo se recibio ${text}`);
server.addMethod("log", ({ message }) => console.log(message));


app.use(express.json());
app.use(cors());
//Servidor JSON RPC
app.post("/json-rpc", (req, res) => {
    console.log('Entre al post json rpc');
    const jsonRPCRequest = req.body;
    console.log("antes de entrar al server jsonrpc");
    console.log(jsonRPCRequest);
    // server.receive takes a JSON-RPC request and returns a promise of a JSON-RPC response.
    server.receive(jsonRPCRequest).then(jsonRPCResponse => {
        console.log("despuess de entrar al server jsonrpc");
      console.log(jsonRPCResponse);
      if (jsonRPCResponse) {
        res.json(jsonRPCResponse);
      } else {
        // If response is absent, it was a JSON-RPC notification method.
        // Respond with no content status (204).
        console.log('Error!');
        //res.sendStatus(204);
      }
    });
  });

tramitesApi(app);
tipoPrioridadApi(app);
tipoTramiteApi(app);
tipoEstadoHistorialTramiteApi(app);
tipoTramiteRequisitoApi(app);
requisitoApi(app);
EstadoHistorialTramiteApi(app);
HistorialTramiteApi(app);
secuenciaRutaApi(app);
TipoRequisitoApi(app);

app.listen(config.port, function() {
    console.log(`El servidor esta escuchando en  http://localhost:${config.port}`);
  });