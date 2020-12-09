// Ruta de los secuenciaRuta
const express = require('express');
const router = express.Router();
const { JSONRPCServer } = require("json-rpc-2.0");
// tambien service o controller
const secuenciaRutaService = require('../../Aplicacion/controllers/secuenciaRutaControllers');

// Crear un secuenciaRuta
// api/secuenciaRuta

/*router.post('/', tramiteController.crearTramite);

module.exports = router;
*/

function secuenciaRutaApi(app) {
  const router = express.Router();
  // JSON RPC
  const server = new JSONRPCServer();

  //metodos
  server.addMethod("getsecuenciaRuta", async ({ body }) => {
    const secuenciaruta = await secuenciarutaService.getAll(body);
    return secuenciaruta;
  });

  server.addMethod("getsecuenciaRutabyID", async ({ body } ) => {
    const secuenciaruta = await secuenciarutaService.getbyID(body);
    return secuenciaruta;
  });

  server.addMethod("createsecuenciaRuta", async ({ body }) => {
    const secuenciaruta = await secuenciarutaService.create(body);
    return secuenciaruta;
  });

  server.addMethod("updatesecuenciaRuta", async ({ body, _id } ) => {
    const secuenciaruta = await secuenciarutaService.update(body,_id);
    return secuenciaruta;
  });

  server.addMethod("deletesecuenciaRuta", async ({ body } ) => {
    const secuenciaruta = await secuenciarutaService.delete(body);
    return secuenciaruta;
  });

  app.use('/rpc/tramite', router);

  const secuenciarutaService = new secuenciaRutaService();

  //GET JSONRPC
  //Servidor JSON RPC
  router.post("/secuenciaRuta", function (req, res) {
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
module.exports = secuenciaRutaApi;