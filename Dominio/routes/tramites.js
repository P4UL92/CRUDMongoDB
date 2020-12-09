// Ruta de los tramites
const express = require('express');
const router = express.Router();
const { JSONRPCServer } = require("json-rpc-2.0");
// tambien service o controller
const TramitesService = require('../../Aplicacion/controllers/tramiteControllers');

// Crear un tramite
// api/tramites

/*router.post('/', tramiteController.crearTramite);

module.exports = router;
*/

function tramitesApi(app) {
  const router = express.Router();
  // JSON RPC
  const server = new JSONRPCServer();

  //metodos
  server.addMethod("getTramite", async ({ body }) => {
    const tramites = await tramitesService.getAll(body);
    return tramites;
  });

  server.addMethod("getTramitebyID", async ({ body } ) => {
    const tramites = await tramitesService.getbyID(body);
    return tramites;
  });

  server.addMethod("createTramite", async ({ body }) => {
    const tramites = await tramitesService.create(body);
    return tramites;
  });

  server.addMethod("updateTramite", async ({ body, _id } ) => {
    const tramites = await tramitesService.update(body,_id);
    return tramites;
  });

  server.addMethod("deleteTramite", async ({ body } ) => {
    const tramites = await tramitesService.delete(body);
    return tramites;
  });

  app.use('/rpc/tramite', router);

  const tramitesService = new TramitesService();

  //GET JSONRPC
  //Servidor JSON RPC
  router.post("/tramite", function (req, res) {
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
module.exports = tramitesApi;