// Ruta de los tramites
const express = require('express');
const router = express.Router();
const { JSONRPCServer } = require("json-rpc-2.0");
// tambien service o controller
const RequisitoService = require('../../Aplicacion/controllers/requisitoControllers');

// Crear un tramite
// api/tramites

/*router.post('/', tramiteController.crearTramite);

module.exports = router;
*/

function requisitoApi(app) {
  const router = express.Router();
  // JSON RPC
  const server = new JSONRPCServer();

  //metodos
  server.addMethod("getRequisito", async ({ body }) => {
    const requisito = await requisitoService.getAll(body);
    return requisito;
  });

  server.addMethod("getRequisitobyID", async ({ body } ) => {
    const requisito = await requisitoService.getbyID(body);
    return requisito;
  });

  server.addMethod("createRequisito", async ({ body }) => {
    const requisito = await requisitoService.create(body);
    return requisito;
  });

  server.addMethod("updateRequisito", async ({ body, _id } ) => {
    const requisito = await requisitoService.update(body,_id);
    return requisito;
  });

  server.addMethod("deleteRequisito", async ({ body } ) => {
    const requisito = await requisitoService.delete(body);
    return requisito;
  });

  app.use('/rpc/tramite', router);

  const requisitoService = new RequisitoService();

  //GET JSONRPC
  //Servidor JSON RPC
  router.post("/requisito", function (req, res) {
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
module.exports = requisitoApi;