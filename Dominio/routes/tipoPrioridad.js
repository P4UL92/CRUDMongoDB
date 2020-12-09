// Ruta de los tramites
const express = require('express');
const router = express.Router();
const { JSONRPCServer } = require("json-rpc-2.0");
// tambien service o controller
const TipoPrioridadService = require('../../Aplicacion/controllers/tipoPrioridadControllers');

// Crear un tramite
// api/tramites

/*router.post('/', tramiteController.crearTramite);

module.exports = router;
*/

function tipoPrioridadApi(app) {
  const router = express.Router();
  // JSON RPC
  const server = new JSONRPCServer();

  //metodos
  server.addMethod("getTipoPrioridad", async ({ body }) => {
    const tipoPrioridad = await tipoPrioridadService.getAll(body);
    return tipoPrioridad;
  });

  server.addMethod("getTipoPrioridadbyID", async ({ body } ) => {
    const tipoPrioridad = await tipoPrioridadService.getbyID(body);
    return tipoPrioridad;
  });

  server.addMethod("createTipoPrioridad", async ({ body }) => {
    const tipoPrioridad = await tipoPrioridadService.create(body);
    return tipoPrioridad;
  });

  server.addMethod("updateTipoPrioridad", async ({ body, _id } ) => {
    const tipoPrioridad = await tipoPrioridadService.update(body,_id);
    return tipoPrioridad;
  });

  server.addMethod("deleteTipoPrioridad", async ({ body } ) => {
    const tipoPrioridad = await tipoPrioridadService.delete(body);
    return tipoPrioridad;
  });

  app.use('/rpc/tramite', router);

  const tipoPrioridadService = new TipoPrioridadService();

  //GET JSONRPC
  //Servidor JSON RPC
  router.post("/tipoPrioridad", function (req, res) {
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
module.exports = tipoPrioridadApi;