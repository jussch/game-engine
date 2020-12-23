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
    Object.extend(this, values);
  }

  initialize() {

  }

  start() {

  }

  update() {

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
