// Ruta de los tramites
const express = require('express');
const router = express.Router();
const { JSONRPCServer } = require("json-rpc-2.0");
// tambien service o controller
const TipoTramiteRequisitoService = require('../../Aplicacion/controllers/tipoTramiteRequisitoControllers');

// Crear un tramite
// api/tramites

/*router.post('/', tramiteController.crearTramite);

module.exports = router;
*/

function tipoTramiteRequisitoApi(app) {
  const router = express.Router();
  // JSON RPC
  const server = new JSONRPCServer();

  //metodos
  server.addMethod("getTipoTramiteRequisito", async ({ body }) => {
    const tipoTramiteRequisito = await tipoTramiteRequisitoService.getAll(body);
    return tipoTramiteRequisito;
  });

  server.addMethod("getTipoTramiteRequisitobyID", async ({ body } ) => {
    const tipoTramiteRequisito = await tipoTramiteRequisitoService.getbyID(body);
    return tipoTramiteRequisito;
  });

  server.addMethod("createTipoTramiteRequisito", async ({ body }) => {
    const tipoTramiteRequisito = await tipoTramiteRequisitoService.create(body);
    return tipoTramiteRequisito;
  });

  server.addMethod("updateTipoTramiteRequisito", async ({ body, _id } ) => {
    const tipoTramiteRequisito = await tipoTramiteRequisitoService.update(body,_id);
    return tipoTramiteRequisito;
  });

  server.addMethod("deleteTipoTramiteRequisito", async ({ body } ) => {
    const tipoTramiteRequisito = await tipoTramiteRequisitoService.delete(body);
    return tipoTramiteRequisito;
  });

  app.use('/rpc/tramite', router);

  const tipoTramiteRequisitoService = new TipoTramiteRequisitoService();

  //GET JSONRPC
  //Servidor JSON RPC
  router.post("/tipoTramiteRequisito", function (req, res) {
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


}
module.exports = tipoTramiteRequisitoApi;