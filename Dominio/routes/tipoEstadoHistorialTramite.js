// Ruta de los tramites
const express = require('express');
const router = express.Router();
const { JSONRPCServer } = require("json-rpc-2.0");
// tambien service o controller
const TipoEstadoHistorialTramiteService = require('../../Aplicacion/controllers/tipoEstadoHistorialTramiteControllers');

// Crear un tramite
// api/tramites

/*router.post('/', tramiteController.crearTramite);

module.exports = router;
*/

function tipoEstadoHistorialTramiteApi(app) {
  const router = express.Router();
  // JSON RPC
  const server = new JSONRPCServer();

  //metodos
  server.addMethod("getTipoEstadoHistorialTramite", async ({ body }) => {
    const tipoEstadoHistorialTramite = await tipoEstadoHistorialTramiteService.getAll(body);
    return tipoEstadoHistorialTramite;
  });

  server.addMethod("getTipoEstadoHistorialTramitebyID", async ({ body } ) => {
    const tipoEstadoHistorialTramite = await tipoEstadoHistorialTramiteService.getbyID(body);
    return tipoEstadoHistorialTramite;
  });

  server.addMethod("createTipoEstadoHistorialTramite", async ({ body }) => {
    const tipoEstadoHistorialTramite = await tipoEstadoHistorialTramiteService.create(body);
    return tipoEstadoHistorialTramite;
  });

  server.addMethod("updateTipoEstadoHistorialTramite", async ({ body, _id } ) => {
    const tipoEstadoHistorialTramite = await tipoEstadoHistorialTramiteService.update(body,_id);
    return tipoEstadoHistorialTramite;
  });

  server.addMethod("deleteTipoEstadoHistorialTramite", async ({ body } ) => {
    const tipoEstadoHistorialTramite = await tipoEstadoHistorialTramiteService.delete(body);
    return tipoEstadoHistorialTramite;
  });

  app.use('/rpc/tramite', router);

  const tipoEstadoHistorialTramiteService = new TipoEstadoHistorialTramiteService();

  //GET JSONRPC
  //Servidor JSON RPC
  router.post("/tipoEstadoHistorialTramite", function (req, res) {
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
module.exports = tipoEstadoHistorialTramiteApi;