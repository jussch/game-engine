/**
 * Created by Justin on 2020-12-22.
 */
import * as PIXI from 'pixi.js';
import Collection from './Collection';

export default class GameObject {
  constructor(props = {}) {
    const {
      name = 'Object',
      engine = null,
      id = GameObject.genId(`${name}_`),
      position = { x: 0, y: 0 },
      scale = { x: 1, y: 1 },
      children = new Collection(),
      container = new PIXI.Container(),
      behaviors = [],
    } = props;

    this.engine = engine;
    this.id = id;
    this.name = name;
    this.position = position;
    this.scale = scale;
    this.children = children;
    this.container = container;
    this.createBehaviors(behaviors);
  }

  /**
   * Management
   */
  createBehaviors(behaviors) {
    this.behaviors = Collection.fromArray(behaviors.map(creator => creator({
      gameObject: this,
    })), 'key');
  }

  hasBehavior(key) {
    return this.behaviors.hasModel(key);
  }

  getBehavior(key) {
    return this.behaviors.getModel(key);
  }

  /**
   * Core
   */
  initialize(engine) {
    this.engine = engine;
    for (let i = 0; i < this.behaviors.length; i += 1) {
      const behavior = this.behaviors.getIndex(i);
      behavior.initialize(engine);
    }
  }

  start() {
    for (let i = 0; i < this.behaviors.length; i += 1) {
      const behavior = this.behaviors.getIndex(i);
      behavior.start();
    }
  }

  update(delta) {
    for (let i = 0; i < this.behaviors.length; i += 1) {
      const behavior = this.behaviors.getIndex(i);
      behavior.update(delta);
    }
  }

  resolve() {
    for (let i = 0; i < this.behaviors.length; i += 1) {
      const behavior = this.behaviors.getIndex(i);
      behavior.resolve();
    }
  }

  draw() {
    for (let i = 0; i < this.behaviors.length; i += 1) {
      const behavior = this.behaviors.getIndex(i);
      behavior.draw();
    }
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

      return gameObject;
    };
  }
}
