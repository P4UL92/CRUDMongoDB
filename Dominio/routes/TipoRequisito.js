// Ruta de los tramites
const express = require('express');
const router = express.Router();
const { JSONRPCServer } = require("json-rpc-2.0");
// tambien service o controller
const TipoRequisitoService = require('../../Aplicacion/controllers/TipoRequisitoControllers');

// Crear un tramite
// api/tramites

/*router.post('/', tramiteController.crearTramite);

module.exports = router;
*/

function TipoRequisitoApi(app) {
  const router = express.Router();
  // JSON RPC
  const server = new JSONRPCServer();

  //metodos
  server.addMethod("gettiporequisito", async ({ body }) => {
    const tiporequisito = await tiporequisitoService.getAll(body);
    return tiporequisito;
  });

  server.addMethod("gettiporequisitobyID", async ({ body } ) => {
    const tiporequisito = await tiporequisitoService.getbyID(body);
    return tiporequisito;
  });

  server.addMethod("createtiporequisito", async ({ body }) => {
    const tiporequisito = await tiporequisitoService.create(body);
    return tiporequisito;
  });

  server.addMethod("updatetiporequisito", async ({ body, _id } ) => {
    const tiporequisito = await tiporequisitoService.update(body,_id);
    return tiporequisito;
  });

  server.addMethod("deletetiporequisito", async ({ body } ) => {
    const tiporequisito = await tiporequisitoService.delete(body);
    return tiporequisito;
  });

  app.use('/rpc/tramite', router);

  const tiporequisitoService = new TipoRequisitoService();

  //GET JSONRPC
  //Servidor JSON RPC
  router.post("/TipoRequisito", function (req, res) {
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
module.exports = TipoRequisitoApi;