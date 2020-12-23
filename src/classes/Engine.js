/**
 * Created by Justin on 2020-12-22.
 */
import Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import * as Input from '../modules/Input';
import Collection from './Collection';

export default class Engine {
  constructor(props = {}) {
    this.physics = Matter.Engine.create();
    this.physics.world.gravity.y = 0;

    this.canvas = new PIXI.Application({
      // width: window.innerWidth,
      // height: window.innerHeight,
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
    });

    document.body.appendChild(this.canvas.view);
    this.gameObjects = new Collection();
    this.isRunning = false;
  }

  addGameObjects(gameObjects) {
    for (let i = 0; i < gameObjects.length; i += 1) {
      const gameObject = gameObjects[i];
      this.gameObjects.addModel(gameObject);
      this.canvas.stage.addChild(gameObject.container);
      gameObject.initialize(this);
      gameObject.start(this);
    }
  }

  updateAll(delta) {
    for (let i = 0; i < this.gameObjects.length; i += 1) {
      const gameObject = this.gameObjects.getIndex(i);
      gameObject.update(delta);
    }
  }

  resolveAll() {
    for (let i = 0; i < this.gameObjects.length; i += 1) {
      const gameObject = this.gameObjects.getIndex(i);
      gameObject.resolve();
    }
  }

  drawAll() {
    for (let i = 0; i < this.gameObjects.length; i += 1) {
      const gameObject = this.gameObjects.getIndex(i);
      gameObject.draw();
    }
  }

  run() {
    if (this.isRunning) {
      throw new Error('Engine already running.');
    }

    this.isRunning = true;
    this.canvas.ticker.add((delta) => {
      Input.cycleKeys();

      this.updateAll(delta);

      Matter.Engine.update(this.physics, delta);

      this.resolveAll();

      this.drawAll();
    });
  }
}
