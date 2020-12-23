/**
 * Created by Justin on 2020-12-22.
 */

export default class Behavior {
  constructor(props = {}) {
    const {
      gameObject,
      key,
    } = props;

    this.gameObject = gameObject;
    this.key = key;
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
    return (props = {}) => {
      const behavior = new this({
        ...props,
        key: this.name,
      });

      Object.assign(behavior, values);
      return behavior;
    };
  }
}
