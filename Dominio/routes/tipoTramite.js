// Ruta de los tramites
const express = require('express');
const router = express.Router();
const { JSONRPCServer } = require("json-rpc-2.0");
// tambien service o controller
const TipoTramiteService = require('../../Aplicacion/controllers/tipoTramiteControllers');

// Crear un tramite
// api/tramites

/*router.post('/', tramiteController.crearTramite);

module.exports = router;
*/

function tipoTramiteApi(app) {
  const router = express.Router();
  // JSON RPC
  const server = new JSONRPCServer();

  //metodos
  server.addMethod("getTipoTramite", async ({ body }) => {
    const tipoTramite = await tipoTramiteService.getAll(body);
    return tipoTramite;
  });

  server.addMethod("getTipoTramitebyID", async ({ body } ) => {
    const tipoTramite = await tipoTramiteService.getbyID(body);
    return tipoTramite;
  });

  server.addMethod("createTipoTramite", async ({ body }) => {
    const tipoTramite = await tipoTramiteService.create(body);
    return tipoTramite;
  });

  server.addMethod("updateTipoTramite", async ({ body, _id } ) => {
    const tipoTramite = await tipoTramiteService.update(body,_id);
    return tipoTramite;
  });

  server.addMethod("deleteTipoTramite", async ({ body } ) => {
    const tipoTramite = await tipoTramiteService.delete(body);
    return tipoTramite;
  });

  app.use('/rpc/tramite', router);

  const tipoTramiteService = new TipoTramiteService();

  //GET JSONRPC
  //Servidor JSON RPC
  router.post("/tipoTramite", function (req, res) {
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
module.exports = tipoTramiteApi;