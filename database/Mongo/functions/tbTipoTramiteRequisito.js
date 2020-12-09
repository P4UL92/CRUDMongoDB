const MongoLib = require('../../../Infraestructura/lib/mongo');

class tbTipoTramiteRequisito {
  constructor() {
    this.collection = 'tbTipoTramiteRequisito';
    this.mongoDB = new MongoLib();
  }

  async getAll(args) {
    const resultado = await this.mongoDB.getAll(this.collection, args);
    return resultado || [];
  }

  async getbyID(args) {
    const resultado = await this.mongoDB.get(this.collection,  args );
    return resultado || {};
  }

  async create(body) {
    const createId = await this.mongoDB.create(this.collection, body);
    return createId;
  }

  async update(body,_id) {
    const updatedId = await this.mongoDB.update(
      this.collection,
      body,
      _id
    );
    return updatedId;
  }

  async delete(args) {
    const deletedId = await this.mongoDB.delete(this.collection, args);
    return deletedId;
  }
}
module.exports = tbTipoTramiteRequisito;