const MongoLib = require('../../../Infraestructura/lib/mongo');

class tbHistorialTramite {
  constructor() {
    this.collection = 'tbHistorialTramite';
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
    console.log(body);
    const createId = await this.mongoDB.create(this.collection, body);
    return createId;
  }

  async update({ Id, body } = {}) {
    const updatedId = await this.mongoDB.update(
      this.collection,
      Id,
      body
    );
    return updatedId;
  }

  async delete({ Id }) {
    const deletedId = await this.mongoDB.delete(this.collection, Id);
    return deletedId;
  }
}
module.exports = tbHistorialTramite;