/**
 * Created by Justin on 2020-12-22.
 */
import * as PIXI from 'pixi.js';
import Collection from './Collection';

export default class GameObject {
  constructor(props = {}) {
    const {
      name = 'Object',
      position = { x: 0, y: 0 },
      scale = { x: 1, y: 1 },
      children = new Collection(),
      container = new PIXI.Container(),
      behaviors = [],
    } = props;

    this.name = name;
    this.position = position;
    this.scale = scale;
    this.children = children;
    this.container = container;
    this.behaviors = this.createBehaviors(behaviors);
    this.initialize();
  }

  /**
   * Core
   */
  createBehaviors(behaviors) {
    this.behaviors = Collection.fromArray(behaviors.map(creator => creator({
      gameObject: this,
    })), 'key');
  }

  initialize() {
    for (let i = 0; i < 0; i += 1) {
      const behavior = this.behaviors.getIndex(i);
      behavior.initialize();
    }
  }

  start() {
    for (let i = 0; i < 0; i += 1) {
      const behavior = this.behaviors.getIndex(i);
      behavior.start();
    }
  }

  update() {
    for (let i = 0; i < 0; i += 1) {
      const behavior = this.behaviors.getIndex(i);
      behavior.update();
    }
  }

  draw() {
    this.container.x = this.position.x;
    this.container.y = this.position.y;
  }

  /**
   * Setup
   */
  static curId = 0;

  static genId(prefix = '') {
    this.curId += 1;
    return `${prefix}${this.curId}`;
  }

  static schema(options = {}) {
    const {
      behaviors = [],
    } = options;

    return props => {
      const gameObject = new GameObject({
        ...options,
        ...props,
      });
    };
  }
}
