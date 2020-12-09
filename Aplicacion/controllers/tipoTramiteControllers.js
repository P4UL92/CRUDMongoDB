
/*
estructura usando mongoose - inicial
*/
// exports.crearTramite =  (req,res) => {
//     console.log('desde crear tramite');
//     console.log(req.body);
// }

const tbTipoTramite= require('../../database/Mongo/functions/tbTipoTramite.js');

class TipoTramiteService {
  constructor(){
    this.servicio = new tbTipoTramite();
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

module.exports = TipoTramiteService;