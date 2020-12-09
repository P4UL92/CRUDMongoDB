// Ruta de los HistorialTramite
const express = require('express');
const router = express.Router();
const { JSONRPCServer } = require("json-rpc-2.0");
// tambien service o controller
const HistorialTramiteService = require('../../Aplicacion/controllers/HistorialTramiteControllers');

// Crear un HistorialTramite
// api/HistorialTramite

/*router.post('/', tramiteController.crearTramite);

module.exports = router;
*/

function HistorialTramiteApi(app) {
  const router = express.Router();
  // JSON RPC
  const server = new JSONRPCServer();

  //metodos
  server.addMethod("getHistorialTramite", async ({ body }) => {
    const historialtramite = await historialtramiteService.getAll(body);
    return historialtramite;
  });

  server.addMethod("getHistorialTramitebyID", async ({ body } ) => {
    const historialtramite = await historialtramiteService.getbyID(body);
    return historialtramite;
  });

  server.addMethod("createHistorialTramite", async ({ body }) => {
    const historialtramite = await historialtramiteService.create(body);
    return historialtramite;
  });

  server.addMethod("updateHistorialTramite", async ({ body, _id } ) => {
    const historialtramite = await historialtramiteService.update(body,_id);
    return historialtramite;
  });

  server.addMethod("deleteHistorialTramite", async ({ body } ) => {
    const historialtramite = await historialtramiteService.delete(body);
    return historialtramite;
  });

  app.use('/rpc/tramite', router);

  const historialtramiteService = new HistorialTramiteService();

  //GET JSONRPC
  //Servidor JSON RPC
  router.post("/HistorialTramite", function (req, res) {
    const jsonRPCRequest = req.body;
    server.receive(jsonRPCRequest).then(jsonRPCResponse => {
      //console.log(jsonRPCResponse);
      if (jsonRPCResponse) {
        res.json(jsonRPCResponse);
      } else {
        console.log('Error!');
      }
    });
  });


  /*{
  "jsonrpc": "2.0",
  "method": "postTramite",
  "params": {
    "body": {

        "idTramite": 108,
        "idTipoTramite": 49875,
        "idTipoPrioridad": "t1234567",
        "observacion": "Guimel Prueba 5",
        "responsableLegal": "Oficina de recursos inf..",
        "documentoInteresado": "Lenin Pulp",
        "fechaFin": "2020-10-15T05:00:00.000Z",
        "detalle": "Documento bien listo ",
        "estado": "",
        "usuarioCreacion": "gbashualdo",
        "usuarioModificacion": "gbashualdo",
        "fechaCreacion": "2020-10-08T05:00:00.000Z",
        "fechaModificacion": "2020-10-10T05:00:00.000Z",
        "fechaInicio": "2020-10-07T05:00:00.000Z"
      
    }, "_id" : "5fca864f9d837535bc663256"
     
    
  },
  "id": 1
}*/

}
module.exports = HistorialTramiteApi;