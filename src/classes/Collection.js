/**
 * Created by Justin on 2020-12-22.
 */

export default class Collection {
  constructor(props) {
    const {
      models = {},
      ids = [],
      idProp = 'id',
    } = props;

    this.models = models;
    this.ids = ids;
    this.idProp = idProp;
    this.length = ids.length;
  }

  getIndex(index) {
    const id = this.ids[index];
    return this.models[id];
  }

  static fromArray(array, idProp = 'id') {
    const models = {};
    const ids = [];
    for (let i = 0; i < array.length; i += 1) {
      const model = array[i];
      const id = model[idProp];
      models[id] = model;
      ids.push(id);
    }

    return new Collection({
      models,
      ids,
      idProp,
    });
  }
}
