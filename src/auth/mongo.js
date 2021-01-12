'use strict';

class Model {

  constructor(schema) {
    this.schema = schema;
  }

  async get(name) {
    let queryObject = name ? name : {};
    return await this.schema.find(queryObject);
  }

 async create(record) {

    let newRecord = new this.schema(record);
    return await newRecord.save();
  }

  async update(_id, record) {
    return await this.schema.findByIdAndUpdate(_id, record, {new: true});
  }

  async delete(_id) {
    return await this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;