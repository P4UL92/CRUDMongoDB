
/*
estructura usando mongoose - inicial
*/
// exports.crearTramite =  (req,res) => {
//     console.log('desde crear tramite');
//     console.log(req.body);
// }

const tbRequisito = require('../../database/Mongo/functions/tbRequisito.js');

class RequisitoService {
  constructor(){
    this.servicio = new tbRequisito();
  }

  async getAll(args) {
    return await this.servicio.getAll(args);
  }

  async getbyID(args) {
    return await this.servicio.getbyID(args);
  }

  async create(args) {
    return await this.servicio.create(args);
  }

  async update(args,_id) {
    return await this.servicio.update(args,_id);
  }

  async delete(args) {
    return await this.servicio.delete(args);
  }

}

module.exports = RequisitoService;