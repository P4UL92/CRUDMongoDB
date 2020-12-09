
/*
estructura usando mongoose - inicial
*/
// exports.crearTramite =  (req,res) => {
//     console.log('desde crear tramite');
//     console.log(req.body);
// }

const tbTipoPrioridad = require('../../database/Mongo/functions/tbTipoPrioridad.js');

class TipoPrioridadService {
  constructor(){
    this.servicio = new tbTipoPrioridad();
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

module.exports = TipoPrioridadService;