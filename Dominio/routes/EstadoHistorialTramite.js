// Ruta de los EstadoHistorialTramite
const express = require('express');
const router = express.Router();
const { JSONRPCServer } = require("json-rpc-2.0");
// tambien service o controller
const EstadoHistorialTramiteService = require('../../Aplicacion/controllers/EstadoHistorialTramiteControllers');

// Crear un EstadoHistorialTramite
// api/EstadoHistorialTramite

/*router.post('/', tramiteController.crearTramite);

module.exports = router;
*/

function EstadoHistorialTramiteApi(app) {
  const router = express.Router();
  // JSON RPC
  const server = new JSONRPCServer();

  //metodos
  server.addMethod("getEstadoHistorialTramite", async ({ body }) => {
    const estadohistorialtramite = await estadohistorialtramiteService.getAll(body);
    return estadohistorialtramite;
  });

  server.addMethod("getEstadoHistorialTramitebyID", async ({ body } ) => {
    const estadohistorialtramite = await estadohistorialtramiteService.getbyID(body);
    return estadohistorialtramite;
  });

  server.addMethod("createEstadoHistorialTramite", async ({ body }) => {
    const estadohistorialtramite = await estadohistorialtramiteService.create(body);
    return estadohistorialtramite;
  });

  server.addMethod("updateEstadoHistorialTramite", async ({ body, _id } ) => {
    const estadohistorialtramite = await estadohistorialtramiteService.update(body,_id);
    return estadohistorialtramite;
  });

  server.addMethod("deleteEstadoHistorialTramite", async ({ body } ) => {
    const estadohistorialtramite = await estadohistorialtramiteService.delete(body);
    return estadohistorialtramite;
  });

  app.use('/rpc/tramite', router);

  const estadohistorialtramiteService = new EstadoHistorialTramiteService();

  //GET JSONRPC
  //Servidor JSON RPC
  router.post("/EstadoHistorialTramite", function (req, res) {
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
module.exports = EstadoHistorialTramiteApi;