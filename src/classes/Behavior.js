/**
 * Created by Justin on 2020-12-22.
 */

export default class Behavior {
  constructor(props = {}) {
    const {
      gameObject,
      key,
      values = {},
    } = props;

    this.gameObject = gameObject;
    this.key = key;
    Object.assign(this, values);
  }

  initialize() {

  }

  start() {

  }

  update() {

  }

  resolve() {

  }

  draw() {

  }

  static instance(values = {}) {
    return (props = {}) => (
      new this({
        ...props,
        key: this.name,
        values,
      })
    );
  }
}
